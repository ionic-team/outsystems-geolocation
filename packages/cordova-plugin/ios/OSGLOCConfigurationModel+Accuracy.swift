import OSGeolocationLib

extension OSGLOCConfigurationModel {
    static func createWithAccuracy(_ isHighAccuracyEnabled: Bool) -> OSGLOCConfigurationModel {
        let minimumDistance = isHighAccuracyEnabled ?
            Constants.MinimumDistance.highAccuracy :
            Constants.MinimumDistance.lowAccuracy

        return .init(
            enableHighAccuracy: isHighAccuracyEnabled,
            minimumUpdateDistanceInMeters: minimumDistance
        )
    }
}

enum Constants {
    enum MinimumDistance {
        static let highAccuracy: Double = 5
        static let lowAccuracy: Double = 10
    }

    enum Position {
        static let altitude: String = "altitude"
        static let heading: String = "heading"
        static let accuracy: String = "accuracy"
        static let latitude: String = "latitude"
        static let longitude: String = "longitude"
        static let speed: String = "speed"
        static let timestamp: String = "timestamp"
        static let altitudeAccuracy: String = "altitudeAccuracy"
    }

    enum LocationUsageDescription {
        static let always = "NSLocationAlwaysUsageDescription"
        static let whenInUse = "NSLocationWhenInUseUsageDescription"
    }
}
