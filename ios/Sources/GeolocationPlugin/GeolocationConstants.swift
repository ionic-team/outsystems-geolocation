enum Constants {
    enum Arguments {
        static let enableHighAccuracy = "enableHighAccuracy"
        static let id = "id"
        static let maximumAge = "maximumAge"
        static let timeout = "timeout"
    }

    enum SingleLocationRequest {
        /// A position younger than this is treated as a live fix rather than a cached one,
        /// regardless of `maximumAge`. CLLocation timestamps lag delivery by the acquisition
        /// time, so `maximumAge: 0` (the default, meaning "no cached positions") must still
        /// accept freshly acquired fixes.
        static let freshnessThresholdInMilliseconds: Double = 5000
    }

    enum AuthorisationStatus {
        enum ResultKey {
            static let location = "location"
            static let coarseLocation = "coarseLocation"
        }

        enum Status {
            static let denied: String = "denied"
            static let granted: String = "granted"
            static let prompt: String = "prompt"
        }
    }

    enum LocationUsageDescription {
        static let always: String = "NSLocationAlwaysAndWhenInUseUsageDescription"
        static let whenInUse: String = "NSLocationWhenInUseUsageDescription"
    }

    enum Position {
        static let altitude: String = "altitude"
        static let coords: String = "coords"
        static let heading: String = "heading"
        static let accuracy: String = "accuracy"
        static let latitude: String = "latitude"
        static let longitude: String = "longitude"
        static let speed: String = "speed"
        static let timestamp: String = "timestamp"
        static let altitudeAccuracy: String = "altitudeAccuracy"
        static let magneticHeading: String = "magneticHeading"
        static let trueHeading: String = "trueHeading"
        static let headingAccuracy: String = "headingAccuracy"
        static let course: String = "course"
    }
}
