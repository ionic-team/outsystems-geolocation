"use strict";
const cordova = require("cordova");
function s(t) {
  t.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, o) {
        return new Proxy({}, {
          get(w, r) {
            return (c, p, n) => {
              const i = t.Capacitor.Plugins[o];
              if (i === void 0) {
                n(new Error(`Capacitor plugin ${o} not found`));
                return;
              }
              if (typeof i[r] != "function") {
                n(new Error(`Method ${r} not found in Capacitor plugin ${o}`));
                return;
              }
              (async () => {
                try {
                  const a = await i[r](c);
                  p(a);
                } catch (a) {
                  n(a);
                }
              })();
            };
          }
        });
      }
    }
  );
}
function u(t) {
  t.CapacitorUtils.Synapse = new Proxy(
    {},
    {
      get(e, o) {
        return t.cordova.plugins[o];
      }
    }
  );
}
function y() {
  window.CapacitorUtils = window.CapacitorUtils || {}, window.Capacitor !== void 0 ? s(window) : window.cordova !== void 0 && u(window);
}
const PositionOptionsDefault = {
  enableHighAccuracy: false,
  timeout: 1e3,
  maximumAge: 0,
  minimumUpdateInterval: 5e3
};
const ClearWatchOptionsDefault = {
  id: "-1"
};
var exec = cordova.require("cordova/exec");
function getCurrentPosition(options, success, error) {
  options = { ...PositionOptionsDefault, ...options };
  let convertOnSuccess = (position) => {
    let convertedPosition = {
      coords: {
        latitude: position.latitude,
        longitude: position.longitude,
        altitude: position.altitude,
        accuracy: position.accuracy,
        heading: position.heading,
        speed: position.speed,
        altitudeAccuracy: position.accuracy
      },
      timestamp: position.timestamp
    };
    success(convertedPosition);
  };
  exec(convertOnSuccess, error, "OSGeolocation", "getCurrentPosition", [options]);
}
function watchPosition(options, success, error) {
  options = options || PositionOptionsDefault;
  exec(success, error, "OSGeolocation", "watchPosition", [options]);
}
function clearWatch(options, success, error) {
  options = options || ClearWatchOptionsDefault;
  exec(success, error, "OSGeolocation", "clearWatch", [options]);
}
module.exports = {
  getCurrentPosition,
  watchPosition,
  clearWatch
};
y();
