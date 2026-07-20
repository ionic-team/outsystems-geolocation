import { Capacitor } from '@capacitor/core';
import {
  createCapacitorTransport,
  defineNativeIsland,
  initializeNativeIslands,
  NATIVE_ISLANDS_TRANSPORT_PRIORITY,
} from '@capacitor/native-islands/internal';

import type { GeolocationPlugin } from './definitions.js';

export interface LocationButtonGrantDetail {
  granted: boolean;
}

export interface LocationButtonPositionDetail {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface LocationButtonErrorDetail {
  reason: string;
}

declare global {
  interface HTMLElementEventMap {
    'location-grant': CustomEvent<LocationButtonGrantDetail>;
    'location-position': CustomEvent<LocationButtonPositionDetail>;
    'location-error': CustomEvent<LocationButtonErrorDetail>;
  }
}

const TEXT_LABELS: Record<string, string> = {
  'use-precise-location': 'Use precise location',
  'share-precise-location': 'Share precise location',
  'near-my-precise-location': 'Near my precise location',
  'near-your-precise-location': 'Near your precise location',
  'precise-location': 'Precise location',
  none: 'Share location',
};

const STYLE_PROPERTIES = {
  backgroundColor: 'background-color',
  textColor: 'color',
  iconTint: '--os-location-button-icon-color',
  strokeColor: 'border-top-color',
  strokeWidth: 'border-top-width',
} as const;
const OBSERVED_ATTRIBUTES = ['text-type'];
const OBSERVED_STYLES = [
  STYLE_PROPERTIES.backgroundColor,
  STYLE_PROPERTIES.textColor,
  STYLE_PROPERTIES.iconTint,
  STYLE_PROPERTIES.strokeColor,
  STYLE_PROPERTIES.strokeWidth,
  'border-top-left-radius',
];

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;
const RGB_COLOR = /^rgba?\((.+)\)$/;

function textType(element: HTMLElement): string {
  const value = element.getAttribute('text-type') ?? 'precise-location';
  return value in TEXT_LABELS ? value : 'precise-location';
}

function colorStyle(style: CSSStyleDeclaration, name: string, fallback: string): string {
  const value = style.getPropertyValue(name).trim();
  if (HEX_COLOR.test(value)) return value.toUpperCase();
  const match = value.match(RGB_COLOR);
  if (!match) return fallback;
  const channels = match[1].match(/\d+(?:\.\d+)?/g)?.map(Number);
  if (!channels || channels.length < 3 || channels.slice(0, 3).some((channel) => channel < 0 || channel > 255)) {
    return fallback;
  }
  if (channels.length > 3 && channels[3] < 1) return fallback;
  return `#${channels
    .slice(0, 3)
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
}

function pixelStyle(
  style: CSSStyleDeclaration,
  name: string,
  minimum: number,
  maximum: number,
  fallback: number,
): number {
  const value = style.getPropertyValue(name).trim();
  if (!value.endsWith('px')) return fallback;
  const number = Number.parseFloat(value);
  return Number.isFinite(number) && number >= minimum && number <= maximum ? number : fallback;
}

function dispatch<T>(element: HTMLElement, type: string, detail: T): void {
  element.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));
}

interface LocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  timestamp: number;
}

function dispatchPosition(element: HTMLElement, position: LocationPosition): void {
  dispatch<LocationButtonPositionDetail>(element, 'location-position', {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
    timestamp: position.timestamp,
  });
}

async function requestNativeFallback(element: HTMLElement, geolocationPlugin: GeolocationPlugin): Promise<void> {
  try {
    const status = await geolocationPlugin.requestPermissions({
      permissions: ['location'],
    });
    const granted = status.location === 'granted';
    dispatch<LocationButtonGrantDetail>(element, 'location-grant', { granted });
    if (!granted) {
      dispatch<LocationButtonErrorDetail>(element, 'location-error', {
        reason: 'Location permission request was denied',
      });
      return;
    }
    dispatchPosition(
      element,
      await geolocationPlugin.getCurrentPosition({
        enableHighAccuracy: true,
      }),
    );
  } catch (error) {
    dispatch<LocationButtonErrorDetail>(element, 'location-error', {
      reason: error instanceof Error && error.message ? error.message : 'Location request failed',
    });
  }
}

function browserFallback(element: HTMLElement, geolocationPlugin: GeolocationPlugin): void {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'os-location-button-fallback';
  const normalizedTextType = textType(element);
  const label = TEXT_LABELS[normalizedTextType];
  const icon = document.createElement('span');
  icon.className = 'os-location-button-fallback__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '⌖';
  const text = document.createElement('span');
  text.className = normalizedTextType === 'none' ? 'os-location-button-fallback__visually-hidden' : '';
  text.textContent = label;
  button.append(icon, text);
  button.setAttribute('aria-label', label);
  button.addEventListener('click', () => {
    if (Capacitor.getPlatform() !== 'web') {
      void requestNativeFallback(element, geolocationPlugin);
      return;
    }
    if (!navigator.geolocation) {
      dispatch<LocationButtonErrorDetail>(element, 'location-error', {
        reason: 'Browser geolocation is unavailable',
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch<LocationButtonGrantDetail>(element, 'location-grant', {
          granted: true,
        });
        dispatchPosition(element, position);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          dispatch<LocationButtonGrantDetail>(element, 'location-grant', {
            granted: false,
          });
        }
        dispatch<LocationButtonErrorDetail>(element, 'location-error', {
          reason: error.message || 'Browser location request failed',
        });
      },
      { enableHighAccuracy: true },
    );
  });
  element.replaceChildren(button);
}

function installFallbackStyles(): void {
  if (document.querySelector('style[data-os-location-button]')) return;

  const style = document.createElement('style');
  style.dataset.osLocationButton = '';
  style.textContent = `
    :where(os-location-button) {
      display: inline-block;
      inline-size: min(100%, 22rem);
      min-inline-size: 3rem;
      block-size: 3.25rem;
      min-block-size: 3rem;
      max-block-size: 136px;
      box-sizing: border-box;
      overflow: hidden;
      border: 0 solid #000000;
      border-radius: 22px;
      background-color: #0b57d0;
      color: #ffffff;
    }

    .os-location-button-fallback {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      inline-size: 100%;
      block-size: 100%;
      min-inline-size: 3rem;
      min-block-size: 3rem;
      padding-inline: 1rem;
      border: 0;
      border-radius: inherit;
      background: transparent;
      color: inherit;
      font: 600 1rem/1 system-ui, sans-serif;
    }

    .os-location-button-fallback__icon {
      color: var(--os-location-button-icon-color, currentColor);
      font-size: 1.25rem;
      line-height: 1;
    }

    .os-location-button-fallback__visually-hidden {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    }
  `;
  if (document.head) {
    document.head.append(style);
    return;
  }

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      if (!document.querySelector('style[data-os-location-button]')) {
        document.head?.append(style);
      }
    },
    { once: true },
  );
}

function registerLocationButton(geolocationPlugin: GeolocationPlugin): void {
  if (
    typeof document === 'undefined' ||
    typeof HTMLElement === 'undefined' ||
    typeof customElements === 'undefined' ||
    customElements.get('os-location-button')
  ) {
    return;
  }

  installFallbackStyles();

  if (Capacitor.isNativePlatform() && Capacitor.getPlatform() !== 'android') {
    class OsLocationButtonFallback extends HTMLElement {
      private connected = false;

      static get observedAttributes(): string[] {
        return OBSERVED_ATTRIBUTES;
      }

      connectedCallback(): void {
        if (this.connected) return;
        this.connected = true;
        browserFallback(this, geolocationPlugin);
      }

      attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
        if (this.connected && oldValue !== newValue) browserFallback(this, geolocationPlugin);
      }
    }

    customElements.define('os-location-button', OsLocationButtonFallback);
    return;
  }

  defineNativeIsland({
    tagName: 'os-location-button',
    nativeComponent: 'os.locationButton',
    isInteractive: true,
    accessibility: 'native',
    requiresUnobscuredSurface: true,
    observedAttributes: OBSERVED_ATTRIBUTES,
    observedStyles: OBSERVED_STYLES,
    getProperties: (element) => {
      const style = getComputedStyle(element);
      const cornerRadius = pixelStyle(style, 'border-top-left-radius', 0, 68, 22);
      const textColor = colorStyle(style, STYLE_PROPERTIES.textColor, '#FFFFFF');
      return {
        textType: textType(element),
        backgroundColor: colorStyle(style, STYLE_PROPERTIES.backgroundColor, '#0B57D0'),
        textColor,
        iconTint: colorStyle(style, STYLE_PROPERTIES.iconTint, textColor),
        strokeColor: colorStyle(style, STYLE_PROPERTIES.strokeColor, '#000000'),
        cornerRadius,
        pressedCornerRadius: Math.min(cornerRadius, 12),
        strokeWidth: pixelStyle(style, STYLE_PROPERTIES.strokeWidth, 0, 3, 0),
      };
    },
    renderFallback: (element) => browserFallback(element, geolocationPlugin),
    events: {
      grant: 'location-grant',
      position: 'location-position',
      buttonError: 'location-error',
    },
  });
}

export function registerLocationButtonElement(geolocationPlugin: GeolocationPlugin): void {
  if (Capacitor.getPlatform() === 'android') {
    const dedicatedNativeIslands = Capacitor.isPluginAvailable('NativeIslands');

    initializeNativeIslands(
      createCapacitorTransport(
        dedicatedNativeIslands
          ? {
              pluginName: 'NativeIslands',
              platforms: ['android'],
            }
          : {
              pluginName: 'Geolocation',
              plugin: geolocationPlugin,
              methods: {
                applyLayout: 'nativeIslandsApplyLayout',
                applyScrollOffsets: 'nativeIslandsApplyScrollOffsets',
                command: 'nativeIslandsCommand',
                reset: 'nativeIslandsReset',
              },
              eventPrefix: 'nativeIslands:',
              platforms: ['android'],
            },
      ),
      {
        identity: dedicatedNativeIslands ? '@capacitor/native-islands' : '@capacitor/geolocation/location-button',
        priority: dedicatedNativeIslands
          ? NATIVE_ISLANDS_TRANSPORT_PRIORITY.dedicated
          : NATIVE_ISLANDS_TRANSPORT_PRIORITY.carrier,
      },
    );
  }

  registerLocationButton(geolocationPlugin);
}
