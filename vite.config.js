import { defineConfig } from 'vite';
import { peerDependencies, dependencies } from './package.json';
import plugin from '@vitejs/plugin-react';

// vite.config.js
const path = require('path');

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'useAtlas',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [
    plugin({
      jsxRuntime: 'classic'
    })
  ],
  target: 'esnext',
  sourcemap: true
});
