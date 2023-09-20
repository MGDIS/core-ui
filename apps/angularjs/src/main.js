import { NotificationCenter } from '@mgdis/notification-center';
import { defineCustomElements } from '@mgdis/mg-components/loader';

import './style.scss';
import './app.module';

defineCustomElements().then(() => {
  Object.defineProperty(window, 'NotificationCenter', { value: new NotificationCenter() });
});
