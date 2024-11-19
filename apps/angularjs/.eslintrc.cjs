const { eslintrc } = require('@mgdis/linting-angularjs');

module.exports = {
  ...eslintrc,
  globals: {
    angular: true,
  },
};
