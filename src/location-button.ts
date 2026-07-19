import { Capacitor } from '@capacitor/core';
import {
  createCapacitorTransport,
  defineNativeIsland,
  initializeNativeIslands,
  NATIVE_ISLANDS_TRANSPORT_PRIORITY,
} from '@capacitor/native-islands/internal';

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
  backgroundColor: '--os-location-button-background-color',
  textColor: '--os-location-button-text-color',
  iconTint: '--os-location-button-icon-color',
  strokeColor: '--os-location-button-border-color',
  strokeWidth: '--os-location-button-border-width',
} as const;
const OBSERVED_ATTRIBUTES = ['text-type'];
const OBSERVED_STYLES = [...Object.values(STYLE_PROPERTIES), 'border-radius'];

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

function textType(element: HTMLElement): string {
  const value = element.getAttribute('text-type') ?? 'precise-location';
  return value in TEXT_LABELS ? value : 'precise-location';
}

function colorStyle(style: CSSStyleDeclaration, name: string, fallback: string): string {
  const value = style.getPropertyValue(name).trim();
  return HEX_COLOR.test(value) ? value : fallback;
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

function browserFallback(element: HTMLElement): void {
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
      const platform = Capacitor.getPlatform();
      dispatch<LocationButtonErrorDetail>(element, 'location-error', {
        reason: `Location Button is unavailable on ${platform}`,
      });
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
        dispatch<LocationButtonPositionDetail>(element, 'location-position', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
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
      border-radius: 22px;
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
      border: var(--os-location-button-border-width, 0px) solid var(--os-location-button-border-color, #000000);
      border-radius: inherit;
      background: var(--os-location-button-background-color, #0b57d0);
      color: var(--os-location-button-text-color, #ffffff);
      font: 600 1rem/1 system-ui, sans-serif;
    }

    .os-location-button-fallback__icon {
      color: var(--os-location-button-icon-color, var(--os-location-button-text-color, #ffffff));
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
  document.head.append(style);
}

function registerLocationButton(): void {
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
        browserFallback(this);
      }

      attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
        if (this.connected && oldValue !== newValue) browserFallback(this);
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
    renderFallback: browserFallback,
    events: {
      grant: 'location-grant',
      position: 'location-position',
      buttonError: 'location-error',
    },
  });
}

export function registerLocationButtonElement(geolocationPlugin: object): void {
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

  registerLocationButton();
}
