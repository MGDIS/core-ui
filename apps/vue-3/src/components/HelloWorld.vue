<script lang="tsx">
import type { NotificationCenterWindowType } from '../app.conf';
import type { HelloWorldData } from './HelloWorld.conf';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    msg: {
      type: String as PropType<string>,
      default: undefined,
    },
  },
  data(): HelloWorldData {
    return {
      count: 0,
      modal: {
        modalTitle: 'Modal title',
        identifier: 'identifier',
        closeButton: true,
        hidden: true,
      },
    };
  },
  methods: {
    handleClick() {
      this.count++;
      this.modal.hidden = !this.modal.hidden;
      (window as unknown as NotificationCenterWindowType).NotificationCenter.postMessage({
        content: 'Counter value change',
        variant: 'info',
      });
    },
  },
  render() {
    return (
      <>
        <h1>{this.msg}</h1>
        <p>The purpose of this application is to ensure the integration of mg-components and styles into a Vue 3 app.</p>
        <mg-button type="button" onClick={this.handleClick} variant="secondary">
          count is {this.count}
        </mg-button>
        <mg-modal
          modal-title={this.modal.modalTitle}
          hidden={this.modal.hidden}
          close-button
          onComponentHide={() => {
            this.modal.hidden = true;
          }}
        >
          <p slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </mg-modal>
      </>
    );
  },
});
</script>
