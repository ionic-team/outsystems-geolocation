package com.outsystems.capacitor.plugins.geolocation

/**
 * Object with plugin errors
 */
object OSGeolocationErrors {

    private fun formatErrorCode(number: Int): String {
        return "OS-PLUG-GEO-" + number.toString().padStart(4, '0')
    }

    data class ErrorInfo(
        val code: String,
        val message: String
    )

    val GOOGLE_SERVICES_RESOLVABLE = ErrorInfo(
        code = formatErrorCode(1),
        message = "Google Play Services error user resolvable."
    )

    val GOOGLE_SERVICES_ERROR = ErrorInfo(
        code = formatErrorCode(2),
        message = "Google Play Services error."
    )

    val INVALID_INPUT = ErrorInfo(
        code = formatErrorCode(3),
        message = "The input parameters aren't valid."
    )

    val GET_LOCATION_TIMEOUT = ErrorInfo(
        code = formatErrorCode(4),
        message = "Could not obtain location in time. Try with a higher timeout."
    )

    val GET_LOCATION_GENERAL = ErrorInfo(
        code = formatErrorCode(5),
        message = "There was en error trying to obtain the location."
    )

    val LOCATION_PERMISSIONS_DENIED = ErrorInfo(
        code = formatErrorCode(6),
        message = "Location permission request was denied."
    )

    val LOCATION_ENABLE_REQUEST_DENIED = ErrorInfo(
        code = formatErrorCode(7),
        message = "Request to enable location denied."
    )

    val LOCATION_SETTINGS_ERROR = ErrorInfo(
        code = formatErrorCode(8),
        message = "Location settings error."
    )

    val LOCATION_DISABLED = ErrorInfo(
        code = formatErrorCode(9),
        message = "Location services are not enabled."
    )

    val WATCH_ID_NOT_FOUND = ErrorInfo(
        code = formatErrorCode(10),
        message = "Watch id not found"
    )

    val WATCH_ID_NOT_PROVIDED = ErrorInfo(
        code = formatErrorCode(10),
        message = "WatchID needs to be provided."
    )

}