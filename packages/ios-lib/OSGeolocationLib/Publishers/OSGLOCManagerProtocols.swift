import Combine

public protocol OSGLOCServicesChecker {
    func areLocationServicesEnabled() -> Bool
}

public protocol OSGLOCAuthorisationHandler {
    var authorisationStatus: OSGLOCAuthorisation { get }
    var authorisationStatusPublisher: Published<OSGLOCAuthorisation>.Publisher { get }

    func requestAuthorisation(withType authorisationType: OSGLOCAuthorisationRequestType)
}

public protocol OSGLOCLocationHandler {
    var currentLocation: OSGLOCPositionModel? { get }
    var currentLocationPublisher: Published<OSGLOCPositionModel?>.Publisher { get }

    func updateConfiguration(_ configuration: OSGLOCConfigurationModel)
}

public protocol OSGLOCSingleLocationHandler: OSGLOCLocationHandler {
    func requestSingleLocation()
}

public protocol OSGLOCMonitorLocationHandler: OSGLOCLocationHandler {
    func startMonitoringLocation()
    func stopMonitoringLocation()
}

public struct OSGLOCConfigurationModel {
    private(set) var enableHighAccuracy: Bool
    private(set) var minimumUpdateDistanceInMeters: Double?

    public init(enableHighAccuracy: Bool, minimumUpdateDistanceInMeters: Double? = nil) {
        self.enableHighAccuracy = enableHighAccuracy
        self.minimumUpdateDistanceInMeters = minimumUpdateDistanceInMeters
    }
}
