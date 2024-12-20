import CoreLocation

public enum OSGLOCAuthorisationRequestType {
    case whenInUse
    case always

    func requestAuthorization(using locationManager: CLLocationManager) {
        let requestAuthorisation = switch self {
        case .whenInUse:
            locationManager.requestWhenInUseAuthorization
        case .always:
            locationManager.requestAlwaysAuthorization
        }
        requestAuthorisation()
    }
}
