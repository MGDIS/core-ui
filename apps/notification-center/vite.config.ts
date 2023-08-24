import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(['index', 'iframe', 'inception'].map(entrie => [entrie, resolve(__dirname, `${entrie}.html`)])),
    },
  },
});
