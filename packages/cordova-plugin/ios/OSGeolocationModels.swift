struct OSGeolocationCurrentPositionModel: Decodable {
    let enableHighAccuracy: Bool
}

struct OSGeolocationWatchPositionModel: Decodable {
    let id: String
    let enableHighAccuracy: Bool
}

struct OSGeolocationClearWatchModel: Decodable {
    let id: String
}
