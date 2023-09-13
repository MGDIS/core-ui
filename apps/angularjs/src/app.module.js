import angular from 'angular';
import componentsModule from './components/components.module';

import { APP_NAME } from './app.constant';

export default angular.module(APP_NAME, [componentsModule]).name;
