# @mgdis/core-ui-helpers

This package centralizes helper functions to solve the commons needs to build, test and use MGDIS design system components.

It can be used in [Stencil](https://stenciljs.com/), [vueJS@2|3](https://vuejs.org/) and [angularJS](https://angularjs.org/) projects with javascript/NodeJS standards (CJS,UMD,MJS) moderne bundlers: [ViteJS](https://vitejs.fr/), [Webpack](https://webpack.js.org/).

It is divided into six thematic sections:

- **Angular**: Centralizes all angular utilities.
- **Playwright**: Centralizes all playwright utilities to simplify e2e testing.
- **Stencil**: Centralizes all stencil utilities to simplify components creation.
- **Storybook**: Centralizes all Storybook helpers useful for building your own Storybook.
- **Utils**: Centralizes all utilities.
- **Vue**: Centralizes all vue utilities to simplify components creation.

## Requirements

**NodeJS v14.x or higher.**
**Webpack@5 or higher or viteJS bundler or UMD support.**

## Installation

1. Package Manager

```shell
pnpm add @mgdis/core-ui-helpers
```

2. Select JS format

**Recommendation**

For ESM and CJS imports, it is highly recommended to target the import from the desired helper documentation to benefit from the bundler's tree-shaking optimization.

**ES Module**

Mostly used with ViteJS and Webpack Bundler.

```js
// Use in angular project
import CoreUiHelpers from '@mgdis/core-ui-helpers/angular';
// Use in playwright project
import CoreUiHelpers from '@mgdis/core-ui-helpers/playwright';
// Use in Stencil project
import CoreUiHelpers from '@mgdis/core-ui-helpers/stencil';
// Use in storybook project
import CoreUiHelpers from '@mgdis/core-ui-helpers/storybook';
// Use in javascript project
import CoreUiHelpers from '@mgdis/core-ui-helpers/utils';
// Use in VUE project
import CoreUiHelpers from '@mgdis/core-ui-helpers/vue';
```

**CommonJS**

Mostly used with bundler wich doesn't support ES Module.

```js
// Use in angular project
const CoreUiHelpers = require('@mgdis/core-ui-helpers/angular');
// Use in playwright project
const CoreUiHelpers = require('@mgdis/core-ui-helpers/playwright');
// Use in Stencil project
const CoreUiHelpers = require('@mgdis/core-ui-helpers/stencil');
// Use in storybook project
const CoreUiHelpers = require('@mgdis/core-ui-helpers/storybook');
// Use in Javascript project
const CoreUiHelpers = require('@mgdis/core-ui-helpers/utils');
// Use in VUE project
const CoreUiHelpers = require('@mgdis/core-ui-helpers/vue');
...
```

**UMD**

Mostly used when your project doesn't have a bundler but uses scripts to compile project sources (e.g., gulp).

```html
<!-- Use in angular project -->
<script src="/node_modules/@mgdis/core-ui-helpers/dist/angular/index.umd.js"></script>
<script>
  // Disable some console error
  CoreUiHelpers.angular.setMgAngularLogger({ level: 'log' });
</script>
<!-- Use in VUE project -->
<script src="/node_modules/@mgdis/core-ui-helpers/dist/vue/index.umd.js"></script>
```
