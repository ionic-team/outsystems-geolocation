import { require } from "cordova";
import { ClearWatchOptions, OSGLOCPosition, PluginError, Position, PositionOptions } from "./definitions";
import { ClearWatchOptionsDefault, PositionOptionsDefault } from "./defaults";

var exec = require('cordova/exec');

function getCurrentPosition(options: PositionOptions, success: (output: Position) => void, error: (error: PluginError) => void): void {
  options = { ...PositionOptionsDefault, ...options };

  let convertOnSuccess = (position: OSGLOCPosition) => {
    let convertedPosition: Position = {
      coords: {
        latitude: position.latitude,
        longitude: position.longitude,
        altitude: position.altitude,
        accuracy: position.accuracy,
        heading: position.heading,
        speed: position.speed,
        altitudeAccuracy: position.accuracy
      },
      timestamp: position.timestamp,
    }
    success(convertedPosition)
  }
  exec(convertOnSuccess, error, 'OSGeolocation', 'getCurrentPosition', [options]);
}

function watchPosition(options: PositionOptions, success: (output: string) => void, error: (error: PluginError) => void): void {
  options = options || PositionOptionsDefault;

  exec(success, error, 'OSGeolocation', 'watchPosition', [options]);
}

function clearWatch(options: ClearWatchOptions, success: (output: string) => void, error: (error: PluginError) => void): void {
  options = options || ClearWatchOptionsDefault;

  exec(success, error, 'OSGeolocation', 'clearWatch', [options]);
}

module.exports = {
  getCurrentPosition,
  watchPosition,
  clearWatch
};