import set from 'lodash/set';
import { type Directive, type VNode } from 'vue';
import { type App } from './mg-model.conf';

const wm = new WeakMap();

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
