const eslintconfig = require('eslint-config-stencil')
const prettierconfig = require('prettier-config');

module.exports = {
  prettierrc: { ...prettierconfig },
  eslintrc: { ...eslintconfig },
};
