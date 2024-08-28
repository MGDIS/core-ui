# @mgdis/eslint-plugin-html

MGDIS HTML Eslint plugin

## Installation

You'll first need to install [ESLint](https://eslint.org/) and [@html-eslint/parser](https://yeonjuan.github.io/html-eslint/docs/getting-started.html):

```sh
npm i -D eslint @html-eslint/parser
```

Next, install `@mgdis/eslint-plugin-html`:

```sh
npm i -D @mgdis/eslint-plugin-html
```

## Usage

Add `@mgdis/html` to the plugins section of your `.eslintrc` configuration file and add the recommended configuration rules to the extends section.

We can apply these plugin rules to only HTML files(\*.html) by using overrides.

```js
module.exports = {
  //...
  plugins: ['@mgdis/html'],
  overrides: [
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@mgdis/html/recommended'],
    },
  ],
};
```
