# mg-model vueJS directive

## Requirements

### Packages

@mgdis/mg-components: >=3
vue:>=2
lodash

## Usage

Registre directive into your app:

```js
// src/main.js
import Vue from 'vue';
import App from './App.vue';
import { mgModel } from '@mgdis/mg-components-helpers/vue';

Vue.config.productionTip = false;

// Tells VueJS to ignore Elements from the design system
Vue.config.ignoredElements = [/mg-\w*/];

Vue.use(mgModel);

new Vue({
  render: h => h(App),
}).$mount('#app');

// src/my-component/my-components.js
import '@mgdis/mg-components/dist/components/mg-input-text';
```

## Documentation

The complete module documentation is available here: <http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-model-vue>
