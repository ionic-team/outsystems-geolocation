enum OSGeolocationError: Error {
    case locationServicesDisabled
    case permissionDenied
    case permissionRestricted
    case missingUsageDescription
    case positionUnavailable

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
        case .locationServicesDisabled: 0
        case .permissionDenied: 0
        case .permissionRestricted: 0
        case .missingUsageDescription: 0
        case .positionUnavailable: 0
        case .other: 0
        }
    }

    var description: String {
        switch self {
        case .locationServicesDisabled: "Location services are not enabled."
        case .permissionDenied: ""
        case .permissionRestricted: "Application's use of location services is restricted."
        case .missingUsageDescription: ""
        case .positionUnavailable: ""
        case .other: ""
        }
    }
}
