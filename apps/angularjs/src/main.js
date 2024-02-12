import { NotificationCenter } from '@mgdis/notification-center';
import { defineCustomElements } from '@mgdis/mg-components/loader';
import { mgAngularLogger } from '@mgdis/mg-components-helpers/angular';

import './style.scss';
import './app.module';

mgAngularLogger();
defineCustomElements();
Object.defineProperty(window, 'NotificationCenter', { value: new NotificationCenter() });
