const requireIndex = require('requireindex');
const recommended = require('./configs/recommended');

module.exports.rules = requireIndex(__dirname + '/rules');
module.exports.configs = {
  recommended,
};
