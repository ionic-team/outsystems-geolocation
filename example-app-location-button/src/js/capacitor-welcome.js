import { SplashScreen } from '@capacitor/splash-screen';
import { Geolocation } from '@capacitor/geolocation';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 16px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 1.1em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
      main li {
        white-space: pre-wrap;
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }
      main details {
        margin: 10px 0 20px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px 15px 15px;
      }
      main summary {
        cursor: pointer;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.95em;
        padding: 10px 0;
      }
      main .field {
        margin: 12px 0;
      }
      main .field label {
        display: block;
        margin-bottom: 4px;
        font-size: 0.85em;
        color: #333;
        text-transform: none;
      }
      main .field input[type='range'] {
        width: 100%;
        vertical-align: middle;
      }
      main .field-inline {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      main .field-inline label {
        margin-bottom: 0;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>os-location-button Sample</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          Renders the system LocationButton on Android 17+ (compileSdk 37), falling back to an
          AppCompat replica below that. Tapping requests precise location directly — no
          separate permission step. On grant, <code>fetchPosition()</code> delegates to the same
          <code>IONGLOCController.getCurrentPosition()</code> used by the regular API below.
        </p>

        <h2>os-location-button</h2>
        <os-location-button text-type="use-precise-location" style="display: block; margin: 10px 0;"></os-location-button>

        <details id="location-button-customize">
          <summary>Customize Location Button</summary>

          <h4>Style (plugin properties)</h4>
          <div class="field">
            <label for="lb-text-type">Text type</label>
            <select id="lb-text-type">
              <option value="precise-location">precise-location</option>
              <option value="use-precise-location" selected>use-precise-location</option>
              <option value="share-precise-location">share-precise-location</option>
              <option value="near-my-precise-location">near-my-precise-location</option>
              <option value="near-your-precise-location">near-your-precise-location</option>
              <option value="none">none</option>
            </select>
          </div>
          <div class="field">
            <label for="lb-corner-radius">Corner radius: <span id="lb-corner-radius-value">22</span>px</label>
            <input type="range" id="lb-corner-radius" min="0" max="68" value="22">
          </div>
          <div class="field">
            <label for="lb-pressed-corner-radius">Pressed corner radius: <span id="lb-pressed-corner-radius-value">12</span>px</label>
            <input type="range" id="lb-pressed-corner-radius" min="0" max="68" value="12">
          </div>
          <div class="field">
            <label for="lb-stroke-width">Stroke width: <span id="lb-stroke-width-value">0</span>px (library max is 3)</label>
            <input type="range" id="lb-stroke-width" min="0" max="3" value="0">
          </div>
          <div class="field">
            <label for="lb-clickable-padding">Clickable padding: <span id="lb-clickable-padding-value">6</span>px</label>
            <input type="range" id="lb-clickable-padding" min="4" max="8" value="6">
          </div>
          <div class="field field-inline">
            <label for="lb-background-color">Background color</label>
            <input type="color" id="lb-background-color" value="#0b57d0">
          </div>
          <div class="field field-inline">
            <label for="lb-text-color">Text color</label>
            <input type="color" id="lb-text-color" value="#ffffff">
          </div>
          <div class="field field-inline">
            <label for="lb-icon-tint">Icon tint</label>
            <input type="color" id="lb-icon-tint" value="#ffffff">
          </div>
          <div class="field field-inline">
            <label for="lb-stroke-color">Stroke color</label>
            <input type="color" id="lb-stroke-color" value="#000000">
          </div>

          <hr>

          <h4>Layout (app-level CSS — not a plugin feature)</h4>
          <div class="field field-inline">
            <input type="checkbox" id="lb-width-auto" checked>
            <label for="lb-width-auto">Auto width (plugin default: min(100%, 22rem))</label>
          </div>
          <div class="field">
            <label for="lb-width">Width: <span id="lb-width-value">-</span>px</label>
            <input type="range" id="lb-width" min="48" max="400" value="200" disabled>
          </div>
          <div class="field field-inline">
            <input type="checkbox" id="lb-height-auto" checked>
            <label for="lb-height-auto">Auto height (plugin default: 3.25rem)</label>
          </div>
          <div class="field">
            <label for="lb-height">Height: <span id="lb-height-value">-</span>px (above 136 shows the dead-zone gap on native api37 only — the LocationButton widget caps at 136dp inside a taller host; the web fallback has no such cap and just grows)</label>
            <input type="range" id="lb-height" min="40" max="200" value="52" disabled>
          </div>
          <div class="field">
            <label for="lb-position">Position (viewport-fixed skips scroll-hide; in-flow is subject to it)</label>
            <select id="lb-position">
              <option value="static" selected>In-flow (static)</option>
              <option value="fixed-bottom-right">Fixed — bottom right</option>
              <option value="fixed-top-right">Fixed — top right</option>
              <option value="fixed-bottom-left">Fixed — bottom left</option>
              <option value="fixed-top-left">Fixed — top left</option>
            </select>
          </div>
        </details>

        <div id="location-button-events-container">
          <h3>Location button events:</h3>
          <button id="clear-location-button-events" class="button">Clear list</button>
          <ul id="location-button-events-list"></ul>
        </div>

        <hr>

        <h2>Regular API (for comparison)</h2>
        <p>Same underlying <code>IONGLOCController.getCurrentPosition()</code> call, via the plugin's normal JS API instead of the button.</p>
        <button id="current-location" class="button">Get Current Position</button>

        <div id="current-location-result-container">
          <h3>Result:</h3>
          <pre id="current-location-result"></pre>
        </div>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      const locationButton = self.shadowRoot.querySelector('os-location-button');
      const locationButtonEventsList = self.shadowRoot.querySelector('#location-button-events-list');

      function logLocationButtonEvent(text) {
        const newListItem = document.createElement('li');
        newListItem.textContent = `[${new Date().toISOString()}] ${text}`;
        if (locationButtonEventsList.firstChild) {
          locationButtonEventsList.insertBefore(newListItem, locationButtonEventsList.firstChild);
        } else {
          locationButtonEventsList.appendChild(newListItem);
        }
        console.log(text);
      }

      locationButton.addEventListener('location-grant', (event) => {
        logLocationButtonEvent(`location-grant: granted=${event.detail.granted}`);
      });
      locationButton.addEventListener('location-position', (event) => {
        const { latitude, longitude, accuracy, timestamp } = event.detail;
        logLocationButtonEvent(
          `location-position:\n- Latitude: ${latitude}\n- Longitude: ${longitude}\n- Accuracy: ${accuracy}\n- Time: ${new Date(timestamp).toISOString()}`,
        );
      });
      locationButton.addEventListener('location-error', (event) => {
        logLocationButtonEvent(`location-error: ${event.detail.reason}`);
      });
      locationButton.addEventListener('nativeislanderror', (event) => {
        logLocationButtonEvent(`nativeislanderror (permanent fallback): ${event.detail.reason}`);
      });

      self.shadowRoot.querySelector('#clear-location-button-events').addEventListener('click', () => {
        locationButtonEventsList.innerHTML = '';
      });

      const customizePanel = self.shadowRoot.querySelector('#location-button-customize');

      function bindRange(id, valueId, apply) {
        const input = customizePanel.querySelector(`#${id}`);
        const valueLabel = customizePanel.querySelector(`#${valueId}`);
        input.addEventListener('input', () => {
          valueLabel.textContent = input.value;
          apply(input.value);
        });
      }

      // Style controls — each maps to a real plugin-supported CSS property.
      bindRange('lb-corner-radius', 'lb-corner-radius-value', (value) => {
        locationButton.style.borderTopLeftRadius = `${value}px`;
      });
      bindRange('lb-pressed-corner-radius', 'lb-pressed-corner-radius-value', (value) => {
        locationButton.style.setProperty('--os-location-button-pressed-corner-radius', `${value}px`);
      });
      bindRange('lb-stroke-width', 'lb-stroke-width-value', (value) => {
        locationButton.style.borderTopWidth = `${value}px`;
      });
      bindRange('lb-clickable-padding', 'lb-clickable-padding-value', (value) => {
        locationButton.style.setProperty('--os-location-button-clickable-padding', `${value}px`);
      });

      customizePanel.querySelector('#lb-text-type').addEventListener('change', (event) => {
        locationButton.setAttribute('text-type', event.target.value);
      });
      customizePanel.querySelector('#lb-background-color').addEventListener('input', (event) => {
        locationButton.style.backgroundColor = event.target.value;
      });
      customizePanel.querySelector('#lb-text-color').addEventListener('input', (event) => {
        locationButton.style.color = event.target.value;
      });
      customizePanel.querySelector('#lb-icon-tint').addEventListener('input', (event) => {
        locationButton.style.setProperty('--os-location-button-icon-color', event.target.value);
      });
      customizePanel.querySelector('#lb-stroke-color').addEventListener('input', (event) => {
        locationButton.style.borderTopColor = event.target.value;
      });

      // Layout controls — plain app-level CSS on the element, not a plugin API.
      function bindAutoSize(autoId, sliderId, valueId, styleProp) {
        const autoCheckbox = customizePanel.querySelector(`#${autoId}`);
        const slider = customizePanel.querySelector(`#${sliderId}`);
        const valueLabel = customizePanel.querySelector(`#${valueId}`);

        function apply() {
          if (autoCheckbox.checked) {
            locationButton.style[styleProp] = '';
            valueLabel.textContent = '-';
          } else {
            locationButton.style[styleProp] = `${slider.value}px`;
            valueLabel.textContent = slider.value;
          }
        }

        autoCheckbox.addEventListener('change', () => {
          slider.disabled = autoCheckbox.checked;
          apply();
        });
        slider.addEventListener('input', apply);
      }

      bindAutoSize('lb-width-auto', 'lb-width', 'lb-width-value', 'width');
      bindAutoSize('lb-height-auto', 'lb-height', 'lb-height-value', 'height');

      const POSITION_PRESETS = {
        static: {},
        'fixed-bottom-right': { position: 'fixed', bottom: '20px', right: '20px' },
        'fixed-top-right': { position: 'fixed', top: '80px', right: '20px' },
        'fixed-bottom-left': { position: 'fixed', bottom: '20px', left: '20px' },
        'fixed-top-left': { position: 'fixed', top: '80px', left: '20px' },
      };
      customizePanel.querySelector('#lb-position').addEventListener('change', (event) => {
        for (const prop of ['position', 'top', 'left', 'right', 'bottom']) {
          locationButton.style[prop] = '';
        }
        const preset = POSITION_PRESETS[event.target.value] || {};
        for (const [prop, value] of Object.entries(preset)) {
          locationButton.style[prop] = value;
        }
      });

      self.shadowRoot.querySelector('#current-location').addEventListener('click', async () => {
        const resultElement = self.shadowRoot.querySelector('#current-location-result');
        try {
          const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
          resultElement.textContent = JSON.stringify(position, null, 2);
        } catch (exception) {
          resultElement.textContent = `Error: code=${exception.code} message="${exception.message}"`;
        }
      });
    }
  },
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 60px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  },
);
