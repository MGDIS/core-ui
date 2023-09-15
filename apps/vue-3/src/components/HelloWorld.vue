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
    };
  },
  methods: {
    handleClick() {
      this.count++;
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
        <div class="card">
          <mg-button type="button" onClick={this.handleClick} variant="secondary">
            count is {this.count}
          </mg-button>
          <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
          </p>
        </div>

        <p>
          Check out
          <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
            create-vue
          </a>
          , the official Vue + Vite starter
        </p>
        <p>
          Install
          <a href="https://github.com/vuejs/language-tools" target="_blank">
            Volar
          </a>
          in your IDE for a better DX
        </p>
        <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
      </>
    );
  },
});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
