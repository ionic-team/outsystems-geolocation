export type PluginError = {
  code: string,
  message: string
}


const SpeedProp = {
  speed: null,
  velocity: null

}

export type OSGLOCPosition = {
  timestamp: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  heading: number | null;
  altitudeAccuracy: number | null;
} & {
  [Prop in keyof typeof SpeedProp]: number | null;
}

export type PositionOptions = {
  /**
   * High accuracy mode (such as GPS, if available)
   *
   * On Android 12+ devices it will be ignored if users didn't grant
   * ACCESS_FINE_LOCATION permissions (can be checked with location alias).
   *
   * @default false
   * @since 1.0.0
   */
  enableHighAccuracy?: boolean;

  /**
   * The maximum wait time in milliseconds for location updates.
   *
   * In Android, since version 4.0.0 of the plugin, timeout gets ignored for getCurrentPosition.
   *
   * @default 10000
   * @since 1.0.0
   */
  timeout?: number;

  /**
   * The maximum age in milliseconds of a possible cached position that is acceptable to return
   *
   * @default 0
   * @since 1.0.0
   */
  maximumAge?: number;

  /**
   * The minumum update interval for location updates.
   *
   * If location updates are available faster than this interval then an update
   * will only occur if the minimum update interval has expired since the last location update.
   *
   * This parameter is only available for Android. It has no effect on iOS or Web platforms.
   *
   * @default 5000
   * @since 6.1.0
   */
  minimumUpdateInterval?: number;

}
export type ClearWatchOptions = {
  id: string;
}

export type Position = {
  /**
   * Creation timestamp for coords
   *
   * @since 1.0.0
   */
  timestamp: number;

  /**
   * The GPS coordinates along with the accuracy of the data
   *
   * @since 1.0.0
   */
  coords: {
    /**
     * Latitude in decimal degrees
     *
     * @since 1.0.0
     */
    latitude: number;

    /**
     * longitude in decimal degrees
     *
     * @since 1.0.0
     */
    longitude: number;

    /**
     * Accuracy level of the latitude and longitude coordinates in meters
     *
     * @since 1.0.0
     */
    accuracy: number;

    /**
     * Accuracy level of the altitude coordinate in meters, if available.
     *
     * Available on all iOS versions and on Android 8.0+.
     *
     * @since 1.0.0
     */
    altitudeAccuracy: number | null | undefined;

    /**
     * The altitude the user is at (if available)
     *
     * @since 1.0.0
     */
    altitude: number | null;

    /**
     * The speed the user is traveling (if available)
     *
     * @since 1.0.0
     */
    speed: number | null;

    /**
     * The heading the user is facing (if available)
     *
     * @since 1.0.0
     */
    heading: number | null;
  };
}