import OSGeolocationLib

private enum OSGeolocationCallbackType {
    case location
    case watch

    var shouldKeepCallback: Bool {
        self == .watch
    }

    var shouldClearAfterSending: Bool {
        self == .location
    }
}

private struct OSGeolocationCallbackGroup {
    let ids: [String]
    let type: OSGeolocationCallbackType
}

final class OSGeolocationCallbackManager {
    private(set) var locationCallbacks: [String]
    private(set) var watchCallbacks: [String: String]
    private let commandDelegate: CDVCommandDelegate

    private var allCallbackGroups: [OSGeolocationCallbackGroup] {
        [
            .init(ids: locationCallbacks, type: .location),
            .init(ids: Array(watchCallbacks.values), type: .watch)
        ]
    }

    init(commandDelegate: CDVCommandDelegate) {
        self.commandDelegate = commandDelegate
        self.locationCallbacks = []
        self.watchCallbacks = [:]

    }

    func addLocationCallback(_ callbackId: String) {
        locationCallbacks.append(callbackId)
    }

    func addWatchCallback(_ watchId: String, _ callbackId: String) {
        watchCallbacks[watchId] = callbackId
    }

    func clearWatchCallbackIfExists(_ watchId: String) {
        if watchCallbacks.keys.contains(watchId) {
            watchCallbacks.removeValue(forKey: watchId)
        }
    }

    func sendSuccess(_ position: OSGLOCPositionModel) {
        let result = CDVPluginResult(status: .ok, messageAs: position.toResultDictionary())
        sendResult(result)
    }

    func sendError(_ error: OSGeolocationError) {
        let result = CDVPluginResult(status: .error, messageAs: error.toDictionary())
        sendResult(result)
    }
}

private extension OSGeolocationCallbackManager {
    func sendResult(_ result: CDVPluginResult?) {
        allCallbackGroups.forEach { group in
            let resultToSend = result.map { configureResult($0, for: group.type) }
            send(resultToSend, to: group)
        }
    }

    func configureResult(_ result: CDVPluginResult, for type: OSGeolocationCallbackType) -> CDVPluginResult {
        result.keepCallback = NSNumber(booleanLiteral: type.shouldKeepCallback)
        return result
    }

    func send(_ result: CDVPluginResult?, to group: OSGeolocationCallbackGroup) {
        group.ids.forEach { callbackId in
            commandDelegate.send(result, callbackId: callbackId)
        }

        if group.type.shouldClearAfterSending {
            clearCallbacks(for: group.type)
        }
    }

    func clearCallbacks(for type: OSGeolocationCallbackType) {
        if case .location = type {
            locationCallbacks.removeAll()
        }
    }
}
