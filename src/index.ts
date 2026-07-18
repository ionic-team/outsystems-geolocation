import { registerPlugin } from '@capacitor/core';
import { exposeSynapse } from '@capacitor/synapse';

import type { GeolocationPlugin } from './definitions';
import { registerLocationButtonElement } from './location-button.js';

const Geolocation = registerPlugin<GeolocationPlugin>('Geolocation', {
  web: () => import('./web').then((m) => new m.GeolocationWeb()),
});

registerLocationButtonElement(Geolocation);
exposeSynapse();

export * from './definitions';
export { Geolocation };
