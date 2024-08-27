import { defineCustomElements } from '@mgdis/mg-components/loader';
import { createApp } from 'vue';

import './style.scss';
import App from './App.vue';

defineCustomElements();

createApp(App).mount('#app');
