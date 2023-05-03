const { eslintrc } = require('linting-stencil');

module.exports = {
  ...eslintrc,
  root: true,
  parserOptions: {
    project: "./tsconfig.json"
  },
  extends: [...eslintrc.extends, "plugin:storybook/recommended"]
}
