const { setupEslint } = require('eslint-config-custom');

module.exports = {
  root: true,
  ...setupEslint(),
};
