import OSGeolocationLib
import XCTest

import Combine
import CoreLocation

final class OSGLOCManagerWrapperTests: XCTestCase {
    private var sut: OSGLOCManagerWrapper!

    private var locationManager: MockCLLocationManager!
    private var servicesChecker: MockServicesChecker!
    private var cancellables = Set<AnyCancellable>()

    override func setUp() {
        super.setUp()
        locationManager = MockCLLocationManager()
        servicesChecker = MockServicesChecker()
        sut = .init(locationManager: locationManager, servicesChecker: servicesChecker)
    }

    override func tearDown() {
        sut = nil
        servicesChecker = nil
        locationManager = nil
        super.tearDown()
    }

    // MARK: - 'requestAuthorisation'  tests

    func test_requestWhenInUseAuthorisation_triggersALocationManagerWhenInUseAuthorizationRequest() {
        // Given
        XCTAssertFalse(locationManager.didCallRequestWhenInUseAuthorization)

        // When
        sut.requestAuthorisation(withType: .whenInUse)

        // Then
        XCTAssertTrue(locationManager.didCallRequestWhenInUseAuthorization)
    }

    func test_requestAlwaysAuthorisation_triggersALocationManagerAlwaysAuthorizationRequest() {
        // Given
        XCTAssertFalse(locationManager.didCallRequestAlwaysAuthorization)

        // When
        sut.requestAuthorisation(withType: .always)

        // Then
        XCTAssertTrue(locationManager.didCallRequestAlwaysAuthorization)
    }

    func test_locationManagerAuthorisationChangesToWhenInUse_authorisationStatusUpdatesToGranted() {
        // Given
        let expectedStatus = OSGLOCAuthorisation.granted
        let expectation = expectation(description: "Authorisation status updated to 'granted'.")

        sut.authorisationStatusPublisher
            .dropFirst()    // ignore the first value as it's the one set on the constructor.
            .sink { status in
                XCTAssertEqual(status, expectedStatus)
                expectation.fulfill()
            }
            .store(in: &cancellables)

        // When
        locationManager.changeAuthorisation(to: .authorizedWhenInUse)

        // Then
        waitForExpectations(timeout: 1.0)
    }

    // MARK: - 'startMonitoringLocation' tests

    func test_startMonitoringLocation_setsUpLocationManager() {
        // Given
        XCTAssertFalse(locationManager.didStartUpdatingLocation)

        // When
        sut.startMonitoringLocation()

        // Then
        XCTAssertTrue(locationManager.didStartUpdatingLocation)
    }

    // MARK: - 'stopMonitoringLocation' tests

    func test_startMonitoringLocation_thenStop_locationManagerStopsMonitoring() {
        // Given
        XCTAssertFalse(locationManager.didStartUpdatingLocation)

        // When
        sut.startMonitoringLocation()

        XCTAssertTrue(locationManager.didStartUpdatingLocation)

        sut.stopMonitoringLocation()

        // Then
        XCTAssertFalse(locationManager.didStartUpdatingLocation)
    }

    // MARK: - 'requestSingleLocation' tests

    func test_requestSingleLocation_returnsIt() {
        // Given
        XCTAssertFalse(locationManager.didCallRequestLocation)

        // When
        sut.requestSingleLocation()

        // Then
        XCTAssertTrue(locationManager.didCallRequestLocation)
    }

    // MARK: - 'updateConfiguration' tests

    func test_enableHighAccuracy_thenLocationManagerUpdatesIt() {
        // Given
        XCTAssertEqual(locationManager.desiredAccuracy, CLLocationManager.defaultDesiredAccuracy)
        XCTAssertEqual(locationManager.distanceFilter, CLLocationManager.defaultDistanceFilter)

        // When
        let configuration = OSGLOCConfigurationModel(enableHighAccuracy: true)
        sut.updateConfiguration(configuration)

        // Then
        XCTAssertEqual(locationManager.desiredAccuracy, kCLLocationAccuracyBest)
        XCTAssertEqual(locationManager.distanceFilter, CLLocationManager.defaultDistanceFilter)
    }

    func test_disableHighAccuracy_thenLocationManagerUpdatesIt() {
        // Given
        XCTAssertEqual(locationManager.desiredAccuracy, CLLocationManager.defaultDesiredAccuracy)
        XCTAssertEqual(locationManager.distanceFilter, CLLocationManager.defaultDistanceFilter)

        // When
        let configuration = OSGLOCConfigurationModel(enableHighAccuracy: false)
        sut.updateConfiguration(configuration)

        // Then
        XCTAssertEqual(locationManager.desiredAccuracy, kCLLocationAccuracyThreeKilometers)
        XCTAssertEqual(locationManager.distanceFilter, CLLocationManager.defaultDistanceFilter)
    }

    func test_setMinimumUpdateDistanceInMeters_thenLocationManagerUpdatesIt() {
        // Given
        XCTAssertEqual(locationManager.desiredAccuracy, CLLocationManager.defaultDesiredAccuracy)
        XCTAssertEqual(locationManager.distanceFilter, CLLocationManager.defaultDistanceFilter)

        // When
        let configuration = OSGLOCConfigurationModel(enableHighAccuracy: true, minimumUpdateDistanceInMeters: 10)
        sut.updateConfiguration(configuration)

        // Then
        XCTAssertEqual(locationManager.desiredAccuracy, kCLLocationAccuracyBest)
        XCTAssertEqual(locationManager.distanceFilter, 10)
    }

    // MARK: - 'areLocationServicesEnabled' tests

    func test_enableLocationServices_updatesLocationManager() {
        // Given
        XCTAssertFalse(sut.areLocationServicesEnabled())

        // When
        servicesChecker.enableLocationServices()

        // Then
        XCTAssertTrue(sut.areLocationServicesEnabled())
    }

    func test_disableLocationServices_updatesLocationManager() {
        // Given
        XCTAssertFalse(sut.areLocationServicesEnabled())

        // When
        servicesChecker.enableLocationServices()

        XCTAssertTrue(sut.areLocationServicesEnabled())

        servicesChecker.disableLocationServices()

        // Then
        XCTAssertFalse(sut.areLocationServicesEnabled())
    }

    // MARK: - Location Monitoring Tests

    func test_locationIsUpdated_locationManagerTriggersNewPosition() {
        // Given
        let expectedLocation = CLLocation(latitude: 37.7749, longitude: -122.4194)
        let expectedPosition = OSGLOCPositionModel.create(from: expectedLocation)
        let expectation = expectation(description: "Location updated.")

        validateCurrentLocationPublisher(expectation, expectedPosition)

        // When
        locationManager.updateLocation(to: [expectedLocation])

        // Then
        waitForExpectations(timeout: 1.0)
    }

    func test_locationIsUpdatedTwice_locationManagerTriggersLatestPosition() {
        // Given
        let firstLocation = CLLocation(latitude: 37.7749, longitude: -122.4194)
        let expectedLocation = CLLocation(latitude: 48.8859, longitude: -111.3083)
        let expectedPosition = OSGLOCPositionModel.create(from: expectedLocation)
        let expectation = expectation(description: "Location updated.")

        validateCurrentLocationPublisher(expectation, expectedPosition)

        // When
        locationManager.updateLocation(to: [firstLocation, expectedLocation])

        // Then
        waitForExpectations(timeout: 1.0)
    }

    func test_locationIsMissing_locationManagerTriggersError() {
        // Given
        let noLocationData = [CLLocation]()
        let expectation = expectation(description: "Location missing data.")

        validateCurrentLocationPublisher(expectation)

        // When
        locationManager.updateLocation(to: noLocationData)

        // Then
        waitForExpectations(timeout: 1.0)
    }

    func test_locationUpdateFailes_locationManagerTriggersError() {
        // Given
        let mockError = MockLocationUpdateError.locationUpdateFailed
        let expectation = expectation(description: "Location update failed.")

        validateCurrentLocationPublisher(expectation)

        // When
        locationManager.failWhileUpdatingLocation(mockError)

        // Then
        waitForExpectations(timeout: 1.0)
    }
}

private extension OSGLOCManagerWrapperTests {
    func validateCurrentLocationPublisher(_ expectation: XCTestExpectation, _ expectedPosition: OSGLOCPositionModel? = nil) {
        sut.currentLocationPublisher
            .dropFirst()    // ignore the first value as it's the one set on the constructor.
            .sink { newPosition in
                XCTAssertEqual(newPosition, expectedPosition)
                expectation.fulfill()
            }
            .store(in: &cancellables)
    }
}

private extension CLLocationManager {
    static var defaultDesiredAccuracy = kCLLocationAccuracyBest
    static var defaultDistanceFilter = kCLDistanceFilterNone
}

private enum MockLocationUpdateError: Error {
    case locationUpdateFailed
}
