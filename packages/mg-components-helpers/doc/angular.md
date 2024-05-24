[**@mgdis/mg-components-helpers**](README.md) • **Docs**

***

[@mgdis/mg-components-helpers](README.md) / angular

# angular

## Functions

### setMgAngularLogger()

> **setMgAngularLogger**(`config`): `void`

Set window logger custom rules for angular and mg-components

#### Parameters

• **config**: `ConfigType`= `undefined`

logger configuration object

#### Returns

`void`

#### Example

```js
// main.js
import { defineCustomElements } from '@mgdis/mg-components/loader';
import { setMgAngularLogger } from '@mgdis/mg-components-helpers/angular';

// need to be set before `defineCustomElements` call
setMgAngularLogger({level: 'error'});
defineCustomElements();
```

#### Source

angular/mg-angular-logger/mg-angular-logger.ts:17
