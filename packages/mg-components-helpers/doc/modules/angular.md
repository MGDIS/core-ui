[@mgdis/mg-components-helpers](../README.md) / angular

# Module: angular

## Table of contents

### Functions

- [setMgAngularLogger](angular.md#setmgangularlogger)

## Functions

### setMgAngularLogger

▸ **setMgAngularLogger**(`config?`): `void`

Set window logger custom rules for angular and mg-components

#### Parameters

| Name     | Type         | Description                 |
| :------- | :----------- | :-------------------------- |
| `config` | `ConfigType` | logger configuration object |

#### Returns

`void`

**`Example`**

```js
// main.js
import { defineCustomElements } from '@mgdis/mg-components/loader';
import { setMgAngularLogger } from '@mgdis/mg-components-helpers/angular';

// need to be set before `defineCustomElements` call
setMgAngularLogger({ level: 'error' });
defineCustomElements();
```

#### Defined in

angular/mg-angular-logger/mg-angular-logger.ts:17
