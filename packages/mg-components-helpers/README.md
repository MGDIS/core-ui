# MG Components helpers

The goal of mg-components-helpers is to deliver a package which solve the commons compatibilities issues with mg-components web-components.

It can be used in vueJS and angularJS projects.

## Requirements

**NodeJS v14.x or higher.**
**Webpack@5 or higher or viteJS bundler or UMD support.**

## Installation

1. Package Manager

```shell
npm add @mgdis/mg-components-helpers
```

2. Select JS format

**Recommendation**

For ESM and CJS imports, it is highly recommended to target the import from the desired helper documentation to benefit from the bundler's tree-shaking optimization.

**ES Module**

Mostly used with ViteJS and Webpack Bundler.

```js
// Use un in angular project
import MgComponentHelpers from '@mgdis/mg-components-helpers/angular';
// Use un in VUE project
import MgComponentHelpers from '@mgdis/mg-components-helpers/vue';
```

**CommonJS**

Mostly used with bundler wich doesn't support ES Module.

```js
// Use un in angular project
const MgComponentHelpers = require('@mgdis/mg-components-helpers/angular');
// Use un in VUE project
const MgComponentHelpers = require('@mgdis/mg-components-helpers/vue');
```

**UMD**

Mostly used when your project doesn't have a bundler but uses scripts to compile project sources (e.g., gulp).

```html
<!-- Use un in angular project -->
<script src="/node_modules/@mgdis/mg-components-helpers/dist/angular/index.umd.js"></script>
<script>
  // Disable some console error
  MgComponentsHelpers.angular.setMgAngularLogger({ level: 'log' });
</script>
<!-- Use un in VUE project -->
<script src="/node_modules/@mgdis/mg-components-helpers/dist/vue/index.umd.js"></script>
```

##

## Documentation

Read the full [documentation](./doc/README.md)
