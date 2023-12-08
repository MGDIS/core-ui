import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'NotificationCenterModule',
      fileName: format => `notification-center.${format}.js`,
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
