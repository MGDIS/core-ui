import angular from 'angular';

import { APP_NAME } from '../app.constant';
import helloWorld from './hello-world/hello-world.component';

export default angular.module(`${APP_NAME}.components`, []).component('helloWorld', helloWorld).name;
