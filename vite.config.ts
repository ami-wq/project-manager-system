import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        postcssPresetEnv({
          stage: 1,
          features: { 'nesting-rules': true },
        }),
      ],
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
});
