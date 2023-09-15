import templateUrl from './hello-world.template.html';
import './hello-world.scss';

export default {
  templateUrl,
  controller: class HelloWorldCtrl {
    /* @ngInject */
    constructor($window) {
      this.$window = $window;
    }

    $onInit() {
      this.counter = 0;
    }
    handleClick() {
      this.counter++;

      this.$window.NotificationCenter.postMessage({
        content: 'Counter value change',
        variant: 'info',
      });
    }
  },
};
