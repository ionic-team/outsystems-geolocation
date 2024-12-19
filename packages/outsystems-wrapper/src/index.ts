import { ClearWatchOptions, LegacyOSPosition, PluginError, Position, PositionOptions } from "../../cordova-plugin/src/definitions";
import { ClearWatchOptionsDefault, PositionOptionsDefault } from "../../cordova-plugin/src/defaults";

class OSGeolocation {
    #lastPosition: Position | null = null

    getCurrentPosition(success: (position: Position) => void, error: (err: PluginError | GeolocationPositionError) => void, options: PositionOptions): void {
        options = options || PositionOptionsDefault
        // @ts-ignore
        if (typeof (cordova) === 'undefined' && typeof (CapacitorUtils) === 'undefined') {
            // if we're not in cordova / capacitor land, we call the good old Web API
            navigator.geolocation.getCurrentPosition(success, error, options);
            return
        }

        let timeoutID: ReturnType<typeof setTimeout> | undefined;
        const successCallback = (position: Position | LegacyOSPosition) => {
            if (typeof (timeoutID) == 'undefined') {
                // Timeout already happened, or native fired error callback for
                // this geo request.
                // Don't continue with success callback.
                return;
            }
            if (this.#isLegacyPosition(position)) {
                position = this.#convertFromLegacy(position)
            }
            clearTimeout(timeoutID)

            this.#lastPosition = position
            success(position)
        }

        const errorCallback = (e: PluginError) => {
            if (typeof (timeoutID) !== 'undefined') {
                clearTimeout(timeoutID)
            }
            error(e)
        }

        // Check our cached position, if its timestamp difference with current time is less than the maximumAge, then just
        // fire the success callback with the cached position.
        if (this.#lastPosition && options.maximumAge && (((new Date()).getTime() - this.#lastPosition.timestamp) <= options.maximumAge)) {
            success(this.#lastPosition);
            // If the cached position check failed and the timeout was set to 0, error out with a TIMEOUT error object.
        } else if (options.timeout === 0) {
            error({
                code: 'OS-GLOC-0002',
                message: "timeout value in PositionOptions set to 0 and no cached Position object available, or cached Position object's age exceeds provided PositionOptions' maximumAge parameter."
            });
            // Otherwise we have to call into native to retrieve a position.
        } else {
            if (options.timeout !== Infinity) {
                // If the timeout value was not set to Infinity (default), then
                // set up a timeout function that will fire the error callback
                // if no successful position was retrieved before timeout expired.
                timeoutID = this.#createTimeout(errorCallback, options.timeout, false, null);
            }
            options.id = timeoutID

            // @ts-ignore
            if (typeof (CapacitorUtils) !== 'undefined' && typeof (CapacitorUtils.Synapse) !== 'undefined') {
                // This means we are able to use capacitor
                // @ts-ignore
                CapacitorUtils.Synapse.OSGeolocation.getCurrentPosition(options, successCallback, errorCallback)
            } else {
                // this means we may be dealing with an updated outsystems plugin but now a new build
                // @ts-ignore
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
            }

        }

    }

    // Returns a timeout failure, closed over a specified timeout value and error callback.
    #createTimeout(onError: (error: PluginError) => void, timeout: number | undefined, isWatch: boolean, id: number | null): ReturnType<typeof setTimeout> {
        let t = setTimeout(() => {
            if (isWatch === true) {
                //this.#clearWatch(id);
            }
            onError({
                code: 'OS-GLOC-0001',
                message: 'Position retrieval timed out.'
            });
        }, timeout);
        return t;
    }

    #convertFromLegacy(lPosition: LegacyOSPosition): Position {
        return {
            coords: {
                latitude: lPosition.latitude,
                longitude: lPosition.longitude,
                altitude: lPosition.altitude,
                accuracy: lPosition.accuracy,
                heading: lPosition.heading,
                speed: lPosition.velocity,
                altitudeAccuracy: lPosition.altitudeAccuracy
            },
            timestamp: lPosition.timestamp,
        }
    }

    #isLegacyPosition(position: Position | LegacyOSPosition): position is LegacyOSPosition {
        return (position as LegacyOSPosition).velocity !== undefined;
    }
}

export const OSGeolocationInstance = new OSGeolocation();