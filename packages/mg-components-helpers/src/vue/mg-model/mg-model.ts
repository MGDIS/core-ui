import set from 'lodash/set';
import { type Directive, type VNode } from 'vue';
import { type App } from './mg-model.conf';

const wm = new WeakMap();

/**
 * Custom `v-mg-model` directive
 *
 * @remarks
 * Packages requirements
 * - "\@mgdis/mg-components": \>=3
 * - "vue": \>=2
 * - "lodash"
 *
 * @example
 * ```js
 * // src/main.js
 * import Vue from 'vue';
 * import App from './App.vue';
 * import { mgModel } from '@mgdis/mg-components-helpers/vue';
 *
 * Vue.use(mgModel);
 *
 * new Vue({
 *   render: (h) => h(App),
 * }).$mount('#app');
 * ```
 */
export const mgModel = {
  install(Vue: App) {
    Vue.directive('mg-model', <Directive<HTMLInputElement, string>>{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      bind(el: HTMLInputElement, binding: any, vnode: VNode) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valueChangeHandler = (event: Event) => set(vnode.context as any, binding.expression, (event as unknown as { target: EventTarget & { value: unknown } }).target.value);
        wm.set(el, valueChangeHandler);
        el.value = binding.value ?? '';
        el.addEventListener('value-change', valueChangeHandler);
      },
      componentUpdated(el, binding) {
        el.value = binding.value ?? '';
      },
      unbind(el: HTMLElement) {
        const valueChangeHandler = wm.get(el);
        el.removeEventListener('value-change', valueChangeHandler);
      },
    });
  },
};
