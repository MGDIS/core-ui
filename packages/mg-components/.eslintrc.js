const { setupEslint } = require('@mgdis/linting-stencil');

module.exports = {
  ...setupEslint({
    extends: ["plugin:storybook/recommended"],
    parserOptions: {
      project: "./tsconfig.json"
    },
  }),
  root: true,
}
