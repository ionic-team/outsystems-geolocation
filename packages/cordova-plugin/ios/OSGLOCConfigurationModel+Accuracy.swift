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
