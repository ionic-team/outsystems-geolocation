# Wrapper for Outsystems Geolocation Plugin

This a simple wrapper of the Geolocation Plugin, either cordova or capacitor, that adds extra time out logic to the `getCurrentPosition` feature. Currently, it is being used by the OutSystems Wrapper.


## Outsystems' Usage
1. Run npm build
```console
npm run build
```
2. Copy the resulting `./dist/outsystems.js` file to the plugin's scripts folder
3. Call the `RequireScript` client action, with the script's url
4. Call `OSGeolocationWrapper.OSGeolocationInstance.<method>`