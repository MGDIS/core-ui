const { setupEslint } = require('linting-stencil');

module.exports = {
  ...setupEslint({extends: ["plugin:storybook/recommended"]}),
  root: true,
  parserOptions: {
    project: "./tsconfig.json"
  },
}
