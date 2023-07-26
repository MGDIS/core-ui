# Eslint config Vue3

This plugin ensures our vue3 MGDIS rules.

Made for our vue3 projects.

## Installation

```sh
npm install -D @mgdis/eslint-config-vue3 @mgdis/prettier-config
```

Create a local .eslintrc.js file

```js
module.exports = {
  extends: ['@mgdis/eslint-config-vue3'],
};
```

and a .prettierrc.js file

```js
const prettierConfig = require('@mgdis/prettier-config');
module.exports = { ...prettierConfig };
```

If your Vue project is not using the SFC Syntax Specification, here is the recommended lint scripts to use in your `package.json`

```json
"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts && && prettier src/**/*.{html,scss}",
"lint:fix": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix && prettier --write src/**/*.{html,scss}",
```
