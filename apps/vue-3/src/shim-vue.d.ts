export * from 'vue';
declare module 'vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
  export interface HTMLAttributes {
    slot?: string;
  }
}
