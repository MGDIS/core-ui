// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslintrc = require('@core-ui/eslint-config-custom');

// use destructuring from 'eslint-config-custom' to benefit from a standalone package after build (ex: with linting-stencil)
module.exports = {
  ...eslintrc,
  extends: [...eslintrc.extends, 'plugin:@stencil-community/recommended', 'plugin:jsx-a11y/recommended'],
  rules: {
    ...eslintrc.rules,
    '@stencil-community/strict-boolean-conditions': 'error',
    'jsx-a11y/no-redundant-roles': 'off',
  },
};
