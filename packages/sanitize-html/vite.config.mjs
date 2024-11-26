import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SanitizeHtmlModule',
      fileName: format => `sanitize-html.${format}.js`,
    },
    outDir: 'dist',
    sourcemap: {
      exports: 'named',
      sourcemap: true,
    },
  },
  plugins: [dts()],
});
