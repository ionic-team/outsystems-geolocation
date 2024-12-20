enum OSGeolocationMethod: String {
    case getCurrentPosition
    case watchPosition
    case clearWatch
}

enum OSGeolocationError: Error {
    case locationServicesDisabled
    case permissionDenied
    case permissionRestricted
    case missingUsageDescription
    case positionUnavailable
    case inputArgumentsIssue(target: OSGeolocationMethod)
    case other(_ error: Error)

    func toDictionary() -> [String: String] {
        [
            "code": "OS-PLUG-GLOC-\(String(format: "%04d", code))",
            "description": description
        ]
    }
}

private extension OSGeolocationError {
    var code: Int {
        switch self {
        case .locationServicesDisabled: 1
        case .permissionDenied: 2
        case .permissionRestricted: 3
        case .missingUsageDescription: 4
        case .positionUnavailable: 5
        case .inputArgumentsIssue(let target):
            switch target {
            case .getCurrentPosition: 6
            case .watchPosition: 7
            case .clearWatch: 8
            }
        case .other: 9
        }
    }

    var description: String {
        switch self {
        case .locationServicesDisabled: "Location services are not enabled."
        case .permissionDenied: "Application's use of location services is denied."
        case .permissionRestricted: "Application's use of location services is restricted."
        case .missingUsageDescription: "No NSLocationAlwaysUsageDescription nor NSLocationWhenInUseUsageDescription key is defined in the Info.plist file."
        case .positionUnavailable: "Unable to retrieve a location value."
        case .inputArgumentsIssue(let target): "The '\(target.rawValue)' input parameters aren't valid."
        case .other(let error): "\(error.localizedDescription)"
        }
    }
}
