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
    };
  },
  methods: {
    handleClick() {
      this.count++;
      window.NotificationCenter.postMessage({
        content: 'Counter value change',
        variant: 'info',
      });
    },
  },
};
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="card">
      <mg-button id="button-counter" type="button" variant="secondary" @click="handleClick"
        >count is {{ count }}</mg-button
      >
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
