import { NotificationCenter } from '@mgdis/notification-center';
import { defineCustomElements } from '@mgdis/mg-components/loader';
import { setMgAngularLogger } from '@mgdis/mg-components-helpers/angular';

import './styles.scss';
import './app.module';

setMgAngularLogger({ level: 'error' });
defineCustomElements();
Object.defineProperty(window, 'NotificationCenter', { value: new NotificationCenter() });
