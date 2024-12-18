import OSGeolocationLib

class MockServicesChecker: OSGLOCServicesChecker {
    private var didEnableLocationServices = false

    func areLocationServicesEnabled() -> Bool {
        didEnableLocationServices
    }

    func enableLocationServices() {
        didEnableLocationServices = true
    }

    func disableLocationServices() {
        didEnableLocationServices = false
    }
}
