import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'StencilHelpersModule',
      fileName: format => `index.${format}.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        exports: 'named',
        sourcemap: true,
      },
    },
  },
  plugins: [dts()],
});
