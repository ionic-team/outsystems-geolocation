import CoreLocation

class MockCLLocationManager: CLLocationManager {
    private(set) var didCallRequestAlwaysAuthorization = false
    private(set) var didCallRequestLocation = false
    private(set) var didCallRequestWhenInUseAuthorization = false
    private(set) var didStartUpdatingLocation = false
    private(set) var mockAuthorizationStatus: CLAuthorizationStatus = .notDetermined

    override var authorizationStatus: CLAuthorizationStatus {
        mockAuthorizationStatus
    }

    override func startUpdatingLocation() {
        didStartUpdatingLocation = true
    }

    override func stopUpdatingLocation() {
        didStartUpdatingLocation = false
    }

    override func requestLocation() {
        didCallRequestLocation = true
    }

    override func requestAlwaysAuthorization() {
        didCallRequestAlwaysAuthorization = true
    }

    override func requestWhenInUseAuthorization() {
        didCallRequestWhenInUseAuthorization = true
    }

    func changeAuthorisation(to status: CLAuthorizationStatus) {
        self.mockAuthorizationStatus = status
        delegate?.locationManagerDidChangeAuthorization?(self)
    }

    func updateLocation(to locations: [CLLocation]) {
        delegate?.locationManager?(self, didUpdateLocations: locations)
    }

    func failWhileUpdatingLocation(_ error: Error) {
        delegate?.locationManager?(self, didFailWithError: error)
    }
}
