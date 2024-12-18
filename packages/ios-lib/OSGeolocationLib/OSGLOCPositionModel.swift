import CoreLocation

public struct OSGLOCPositionModel: Equatable {
    private(set) public var altitude: Double
    private(set) public var course: Double
    private(set) public var horizontalAccuracy: Double
    private(set) public var latitude: Double
    private(set) public var longitude: Double
    private(set) public var speed: Double
    private(set) public var timestamp: Double
    private(set) public var verticalAccuracy: Double

    private init(altitude: Double, course: Double, horizontalAccuracy: Double, latitude: Double, longitude: Double, speed: Double, timestamp: Double, verticalAccuracy: Double) {
        self.altitude = altitude
        self.course = course
        self.horizontalAccuracy = horizontalAccuracy
        self.latitude = latitude
        self.longitude = longitude
        self.speed = speed
        self.timestamp = timestamp
        self.verticalAccuracy = verticalAccuracy
    }
}

public extension OSGLOCPositionModel {
    static func create(from location: CLLocation) -> OSGLOCPositionModel {
        .init(
            altitude: location.altitude,
            course: location.course,
            horizontalAccuracy: location.horizontalAccuracy,
            latitude: location.coordinate.latitude,
            longitude: location.coordinate.longitude,
            speed: location.speed,
            timestamp: location.timestamp.millisecondsSinceUnixEpoch,
            verticalAccuracy: location.verticalAccuracy
        )
    }
}

private extension Date {
    var millisecondsSinceUnixEpoch: Double {
        timeIntervalSince1970 * 1000
    }
}
