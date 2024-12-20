import Combine
import CoreLocation

public typealias OSGLOCService = OSGLOCServicesChecker & OSGLOCAuthorisationHandler & OSGLOCSingleLocationHandler & OSGLOCMonitorLocationHandler

public struct OSGLOCServicesValidator: OSGLOCServicesChecker {
    public init() {}

    public func areLocationServicesEnabled() -> Bool {
        CLLocationManager.locationServicesEnabled()
    }
}

public class OSGLOCManagerWrapper: NSObject, OSGLOCService {
    @Published public var authorisationStatus: OSGLOCAuthorisation
    public var authorisationStatusPublisher: Published<OSGLOCAuthorisation>.Publisher { $authorisationStatus }

    @Published public var currentLocation: OSGLOCPositionModel?
    public var currentLocationPublisher: Published<OSGLOCPositionModel?>.Publisher { $currentLocation }

    private let locationManager: CLLocationManager
    private let servicesChecker: OSGLOCServicesChecker

    public init(locationManager: CLLocationManager = .init(), servicesChecker: OSGLOCServicesChecker = OSGLOCServicesValidator()) {
        self.locationManager = locationManager
        self.servicesChecker = servicesChecker
        self.authorisationStatus = locationManager.currentAuthorisationValue

        super.init()
        locationManager.delegate = self
    }

    public func requestAuthorisation(withType authorisationType: OSGLOCAuthorisationRequestType) {
        authorisationType.requestAuthorization(using: locationManager)
    }

    public func startMonitoringLocation() {
        locationManager.startUpdatingLocation()
    }

    public func stopMonitoringLocation() {
        locationManager.stopUpdatingLocation()
    }

    public func requestSingleLocation() {
        locationManager.requestLocation()
    }

    public func updateConfiguration(_ configuration: OSGLOCConfigurationModel) {
        locationManager.desiredAccuracy = configuration.enableHighAccuracy ? kCLLocationAccuracyBest : kCLLocationAccuracyThreeKilometers
        configuration.minimumUpdateDistanceInMeters.map {
            locationManager.distanceFilter = $0
        }
    }

    public func areLocationServicesEnabled() -> Bool {
        servicesChecker.areLocationServicesEnabled()
    }
}

extension OSGLOCManagerWrapper: CLLocationManagerDelegate {
    public func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        authorisationStatus = manager.currentAuthorisationValue
    }

    public func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let latestLocation = locations.last else {
            currentLocation = nil
            return
        }
        currentLocation = OSGLOCPositionModel.create(from: latestLocation)
    }

    public func locationManager(_ manager: CLLocationManager, didFailWithError error: any Error) {
        currentLocation = nil
    }
}
