[@mgdis/mg-components-helpers](../README.md) / vue

# Module: vue

## Table of contents

### Variables

- [mgModel](vue.md#mgmodel)

## Variables

### mgModel

• `Const` **mgModel**: `Object`

Custom `v-mg-model` directive

**`Remarks`**

Packages requirements

- "@mgdis/mg-components": \>=3
- "vue": \>=2
- "lodash"

**`Example`**

```js
// src/main.js
import Vue from 'vue';
import App from './App.vue';
import { mgModel } from '@mgdis/mg-components-helpers/vue';

Vue.use(mgModel);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

#### Type declaration

| Name      | Type                     |
| :-------- | :----------------------- |
| `install` | (`Vue`: `App`) => `void` |

#### Defined in

vue/mg-model/mg-model.ts:30
