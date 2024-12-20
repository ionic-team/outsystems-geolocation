import OSGeolocationLib

extension OSGLOCPositionModel {
    func toResultDictionary() -> [String: Double] {
        [
            Constants.Position.altitude: self.altitude,
            Constants.Position.heading: self.course,
            Constants.Position.accuracy: self.horizontalAccuracy,
            Constants.Position.latitude: self.latitude,
            Constants.Position.longitude: self.longitude,
            Constants.Position.speed: self.speed,
            Constants.Position.timestamp: self.timestamp,
            Constants.Position.altitudeAccuracy: self.verticalAccuracy
        ]
    }
}
