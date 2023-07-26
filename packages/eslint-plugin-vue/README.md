# Eslint plugin Vue

MGDIS Eslint vue plugin.

## Installation

Install `@mgdis/eslint-plugin-vue` in your vue project :

```sh
npm install -D @mgdis/eslint-plugin-vue
```

## Usage

Add `@mgdis/vue` to the plugins section of your `.eslintrc` configuration file and add the recommended configuration rules to the extends section.

```js
module.exports = {
  //...
  plugins: ['@mgdis/vue'],
  extends: ['plugin:@mgdis/vue/recommended'],
};
```
