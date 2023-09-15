import { NotificationCenter } from '@mgdis/notification-center';
import { defineCustomElements } from '@mgdis/mg-components/loader';

import './style.scss';
import Vue from 'vue';
import App from './App.vue';

defineCustomElements().then(() => {
  Object.defineProperty(window, 'NotificationCenter', { value: new NotificationCenter() });
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
