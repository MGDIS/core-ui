import templateUrl from './hello-world.template.html';
import './hello-world.scss';

export default {
  templateUrl,
  controller: class HelloWorldCtrl {
    /* @ngInject */
    constructor() {}

    $onInit() {
      this.counter = 0;
    }
    handleClick() {
      this.counter++;
    }
  },
};
