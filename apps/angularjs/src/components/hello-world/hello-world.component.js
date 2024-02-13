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
        hidden: true,
      };
    }
    handleClick = () => {
      this.counter++;

      this.modal.hidden = !this.modal.hidden;

      this.$window.NotificationCenter.postMessage({
        content: 'Counter value change',
        variant: 'info',
      });
    };

    handleModalHide = (newValue) => {
      this.modal.hidden = newValue;
    };
  },
};
