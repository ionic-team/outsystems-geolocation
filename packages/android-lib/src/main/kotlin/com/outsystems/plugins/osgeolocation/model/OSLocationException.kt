package com.outsystems.plugins.osgeolocation.model

sealed class OSLocationException(message: String, cause: Throwable?) : Exception(message, cause) {
    class OSLocationSettingsException(
        message: String, cause: Throwable? = null
    ) : OSLocationException(message, cause)
    class OSLocationRequestDeniedException(
        message: String, cause: Throwable? = null
    ) : OSLocationException(message, cause)
    class OSLocationGoogleServicesException(
        val resolvable: Boolean,
        message: String, cause: Throwable? = null
    ) : OSLocationException(message, cause)
    class OSLocationInvalidTimeoutException(
        message: String, cause: Throwable? = null
    ) : OSLocationException(message, cause)
}