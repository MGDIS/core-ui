import { NotificationCenter } from '@mgdis/notification-center';
import { defineCustomElements } from '@mgdis/mg-components/loader';
import { createApp } from 'vue';

import './styles.scss';
import App from './App.vue';

defineCustomElements();
Object.defineProperty(window, 'NotificationCenter', { value: new NotificationCenter() });

createApp(App).mount('#app');
