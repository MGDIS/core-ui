import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

/**
 * Do not return errors for mg-components
 *
 * @param tag - tagname
 * @returns true if the tag is from mg-components
 */
const isCustomElement = (tag: string): boolean => tag.startsWith('mg-');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement,
        },
      },
    }),
    vueJsx({ isCustomElement }),
  ],
});
