[**@mgdis/mg-components-helpers**](../../README.md) • **Docs**

***

[@mgdis/mg-components-helpers](../../README.md) / [vue](../README.md) / mgModel

# Variable: mgModel

> `const` **mgModel**: `object`

Custom `v-mg-model` directive

## Remarks

Packages requirements
- "@mgdis/mg-components": \>=3
- "vue": \>=2
- "lodash"

## Example

```js
// src/main.js
import Vue from 'vue';
import App from './App.vue';
import { mgModel } from '@mgdis/mg-components-helpers/vue';

Vue.use(mgModel);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

## Type declaration

### install()

#### Parameters

• **Vue**: `App`

#### Returns

`void`

## Source

vue/mg-model/mg-model.ts:30
