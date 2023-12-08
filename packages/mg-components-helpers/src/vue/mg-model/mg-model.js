const set = require('lodash/set');

const wm = new WeakMap();

module.exports = {
  install(Vue) {
    Vue.directive('mg-model', {
      bind(el, binding, vnode) {
        const valueChangeHandler = (event) => {
          return set(vnode.context, binding.expression, event.target.value);
        };
        wm.set(el, valueChangeHandler);
        el.value = binding.value ?? '';
        el.addEventListener('value-change', valueChangeHandler);
      },
      componentUpdated(el, binding) {
        el.value = binding.value ?? '';
      },
      unbind(el) {
        const valueChangeHandler = wm.get(el);
        el.removeEventListener('value-change', valueChangeHandler);
      },
    });
  },
};
