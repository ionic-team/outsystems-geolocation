import OSGeolocationLib
import Combine

@objc(OSGeolocation)
final class OSGeolocation: CDVPlugin {
    private var plugin: (any OSGLOCService)?
    private var cancellables = Set<AnyCancellable>()
    private var callbackManager: OSGeolocationCallbackManager?

    override func pluginInitialize() {
        self.plugin = OSGLOCManagerWrapper()
        self.callbackManager = .init(commandDelegate: commandDelegate)
        setupBindings()
    }

    @objc(getCurrentPosition:)
    func getLocation(command: CDVInvokedUrlCommand) {
        guard let config: OSGeolocationCurrentPositionModel = createModel(for: command.argument(at: 0))
        else {
            callbackManager?.sendError(.inputArgumentsIssue(target: .getCurrentPosition))
            return
        }
        handleLocationRequest(config.enableHighAccuracy, command.callbackId)
    }

    @objc(watchPosition:)
    func addWatch(command: CDVInvokedUrlCommand) {
        guard let config: OSGeolocationWatchPositionModel = createModel(for: command.argument(at: 0))
        else {
            callbackManager?.sendError(.inputArgumentsIssue(target: .watchPosition))
            return
        }
        handleLocationRequest(config.enableHighAccuracy, watchUUID: config.id, command.callbackId)
    }

    @objc
    func clearWatch(command: CDVInvokedUrlCommand) {
        guard let config: OSGeolocationClearWatchModel = createModel(for: command.argument(at: 0))
        else {
            callbackManager?.sendError(.inputArgumentsIssue(target: .clearWatch))
            return
        }
        callbackManager?.clearWatchCallbackIfExists(config.id)

        if (callbackManager?.watchCallbacks.isEmpty) ?? false {
            plugin?.stopMonitoringLocation()
        }
    }
}

private extension OSGeolocation {
    func setupBindings() {
        self.plugin?.authorisationStatusPublisher
            .sink(receiveValue: { [weak self] status in
                guard let self else { return }

                do {
                    switch status {
                    case .denied: throw OSGeolocationError.permissionDenied
                    case .notDetermined: self.requestLocationAuthorisation()
                    case .restricted: throw OSGeolocationError.permissionRestricted
                    case .granted: self.requestLocation()
                    @unknown default: break
                    }
                } catch let error as OSGeolocationError {
                    self.callbackManager?.sendError(error)
                } catch {
                    self.callbackManager?.sendError(.other(error))
                }
            })
            .store(in: &cancellables)

        self.plugin?.currentLocationPublisher
            .sink { [weak self] position in
                guard let self else { return }

                if let position {
                    self.sendCurrentPosition(position)
                } else {
                    self.handlePositionUnavailability()
                }
            }
            .store(in: &cancellables)
    }

    func requestLocationAuthorisation() {
        commandDelegate.run { [weak self] in
            guard let self else { return }

            guard plugin?.areLocationServicesEnabled() ?? false else {
                self.callbackManager?.sendError(.locationServicesDisabled)
                return
            }

            var requestType: OSGLOCAuthorisationRequestType?
            if Bundle.main.object(forInfoDictionaryKey: Constants.LocationUsageDescription.whenInUse) != nil {
                requestType = .whenInUse
            } else if Bundle.main.object(forInfoDictionaryKey: Constants.LocationUsageDescription.always) != nil {
                requestType = .always
            }

            guard let requestType else {
                self.callbackManager?.sendError(.missingUsageDescription)
                return
            }
            self.plugin?.requestAuthorisation(withType: requestType)
        }
    }

    func requestLocation() {
        // should request if callbacks exist and are not empty
        let shouldRequestCurrentPosition = callbackManager?.locationCallbacks.isEmpty == false
        let shouldRequestLocationMonitoring = callbackManager?.watchCallbacks.isEmpty == false

        if shouldRequestCurrentPosition {
            plugin?.requestSingleLocation()
        }
        if shouldRequestLocationMonitoring {
            plugin?.startMonitoringLocation()
        }
    }

    func sendCurrentPosition(_ position: OSGLOCPositionModel) {
        callbackManager?.sendSuccess(position)
    }

    func createModel<T: Decodable>(for inputArgument: Any?) -> T? {
        guard let argumentsDictionary = inputArgument as? [String: Any],
              let argumentsData = try? JSONSerialization.data(withJSONObject: argumentsDictionary),
              let argumentsModel = try? JSONDecoder().decode(T.self, from: argumentsData)
        else { return nil }
        return argumentsModel
    }

    func handleLocationRequest(_ enableHighAccuracy: Bool, watchUUID: String? = nil, _ callbackId: String) {
        let configurationModel = OSGLOCConfigurationModel.createWithAccuracy(enableHighAccuracy)
        plugin?.updateConfiguration(configurationModel)

        if let watchUUID {
            callbackManager?.addWatchCallback(watchUUID, callbackId)
        } else {
            callbackManager?.addLocationCallback(callbackId)
        }

        if plugin?.authorisationStatus == .granted {
            requestLocation()
        }
    }

    func handlePositionUnavailability() {
        self.callbackManager?.sendError(.positionUnavailable)
        callbackManager?.clearAllCallbacks()
        plugin?.stopMonitoringLocation()
    }
}
