# mg-text-content angularJS directive

## Requirements

### Packages

@mgdis/mg-components: >=3
angular:>=1.8

## Usage

Registre directive into your app:

```js
// src/app/common/common.module.js
import angular from 'angular';

import { appName } from '../app.constant.js';
import '@mgdis/mg-components-helpers/angular';

export default angular.module(`${appName}.common`, ['mg-components-helpers.mg-text-content-angular']).name;

// src/components/component.component.js
class Controller {
  $onInit() {
    this.movie = 'my movie';
  }
  getBatman() {
    return 'I am batman';
  }
}
```

```html
<!-- src/component/myComponent.html -->
<mg-button>
  <span mg-text-content="{{$ctrl.movie}}"></span>
</mg-button>
<mg-button>
  <span mg-text-content="{{$ctrl.getBatman()}}"></span>
</mg-button>
```

## Documentation

The complete module documentation is available here: <http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-text-content-angular>
