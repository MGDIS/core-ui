<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: undefined,
    },
  },
  data() {
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
      window.NotificationCenter.postMessage({
        content: 'Counter value change',
        variant: 'info',
      });
    },
    handleComponentHide(newValue) {
      this.modal.hidden = newValue;
    },
  },
};
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>The purpose of this application is to ensure the integration of mg-components and styles into a Vue 2 app.</p>
    <mg-button type="button" variant="secondary" @click="handleClick"> count is {{ count }} </mg-button>
    <mg-modal
      :modal-title="modal.modalTitle"
      :hidden="modal.hidden"
      close-button
      @component-hide="handleComponentHide(true)"
      @component-show="handleComponentHide(false)"
    >
      <p slot="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    </mg-modal>
  </div>
</template>
