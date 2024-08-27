<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
  data() {
    return {
      dataExample: 'Example',
    };
  },
  computed: {
    computedExample() {
      return null;
    },
  },
  methods: {
    methodExample() {},
  },
  render() {
    return (
      <>
        <h1>{this.title}</h1>
        <p>{this.dataExample}</p>
      </>
    );
  },
});
</script>

<!-- <template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ dataExample }}</p>
  </div>
</template> -->

<style scoped>
h1 {
  color: var(--color-primary);
}
</style>
