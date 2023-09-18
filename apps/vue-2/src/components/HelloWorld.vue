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
        hide: true,
      },
    };
  },
  methods: {
    handleClick() {
      this.count++;
      this.modal.hide = !this.modal.hide;
      window.NotificationCenter.postMessage({
        content: 'Counter value change',
        variant: 'info',
      });
    },
    handleComponentHide(newValue) {
      this.modal.hide = newValue;
    },
  },
};
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="card">
      <mg-button type="button" variant="secondary" @click="handleClick"> count is {{ count }} </mg-button>
      <mg-modal
        :modal-title="modal.modalTitle"
        :hide.prop="modal.hide"
        close-button
        @component-hide="handleComponentHide(true)"
        @component-show="handleComponentHide(false)"
      >
        <div slot="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </mg-modal>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a id="quick-start-link" href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
      official Vue + Vite starter
    </p>
    <p>
      Install
      <a id="tools-link" href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
