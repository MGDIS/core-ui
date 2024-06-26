import angular from 'angular';

import { APP_NAME } from '../app.constant';
import technicalTest from './technical-test/technical-test.component';

export default angular.module(`${APP_NAME}.components`, []).component('technicalTest', technicalTest).name;
