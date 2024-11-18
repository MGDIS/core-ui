const { eslintrc } = require('@mgdis/linting-angularjs');

module.exports = {
  ...eslintrc,
  root: true,
  globals: {
    angular: true,
  },
};
