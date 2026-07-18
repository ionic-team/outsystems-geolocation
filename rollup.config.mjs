import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const external = ['@capacitor/core'];
const locationButtonEntry = '\0location-button-entry';
const locationButtonSource = fileURLToPath(new URL('./dist/esm/location-button.js', import.meta.url));
const nativeIslandsInternal = fileURLToPath(import.meta.resolve('@capacitor/native-islands/internal'));

function bundleNativeIslandsRuntime({ virtualEntry = false } = {}) {
  return {
    name: 'bundle-native-islands-runtime',
    resolveId(source) {
      if (virtualEntry && source === locationButtonEntry) return locationButtonEntry;
      if (source === '@capacitor/native-islands/internal') return nativeIslandsInternal;
      return null;
    },
    load(id) {
      if (!virtualEntry || id !== locationButtonEntry) return null;
      return readFileSync(locationButtonSource, 'utf8').replace(/\n?\/\/# sourceMappingURL=.*$/u, '');
    },
  };
}

const geolocation = {
  input: 'dist/esm/index.js',
  output: [
    {
      file: 'dist/plugin.js',
      format: 'iife',
      name: 'capacitorGeolocationPluginCapacitor',
      globals: {
        '@capacitor/core': 'capacitorExports',
      },
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/plugin.cjs.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  external,
  plugins: [bundleNativeIslandsRuntime()],
};

export default [
  geolocation,
  {
    input: locationButtonEntry,
    output: {
      file: 'dist/esm/location-button.js',
      format: 'esm',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    external,
    plugins: [bundleNativeIslandsRuntime({ virtualEntry: true })],
  },
];
