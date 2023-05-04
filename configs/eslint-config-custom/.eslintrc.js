const { setupEslint } = require('./dist');

module.exports = {
  root: true,
  ...setupEslint(),
};
