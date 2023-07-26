const prettierconfig = require('./.prettierrc');
const eslintconfig = require('./.eslintrc');

module.exports = {
  prettierrc: { ...prettierconfig },
  eslintrc: { ...eslintconfig },
};
