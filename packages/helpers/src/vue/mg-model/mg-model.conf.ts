import { type Directive } from 'vue';

export interface App {
  directive(name: string): Directive | undefined;
  directive(name: string, directive: Directive): this;
}
