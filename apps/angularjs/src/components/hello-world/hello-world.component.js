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
      this.modal = {
        modalTitle: 'Modal title',
        identifier: 'identifier',
        closeButton: true,
        hide: true,
      };
    }
    handleClick() {
      this.counter++;

      this.modal.hide = !this.modal.hide;

      this.$window.NotificationCenter.postMessage({
        content: 'Counter value change',
        variant: 'info',
      });
    }

    handleModalHide = (newValue) => {
      this.modal.hide = newValue;
    };
  },
};
