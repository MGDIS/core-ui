import { NotificationCenter } from '@mgdis/notification-center';
import { defineCustomElements } from '@mgdis/mg-components/loader';
import { createApp } from 'vue';

import './style.scss';
import App from './App.vue';

defineCustomElements().then(() => {
  Object.defineProperty(window, 'NotificationCenter', { value: new NotificationCenter() });
});

createApp(App).mount('#app');
