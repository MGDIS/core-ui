const { eslintrc } = require('@mgdis/linting-vue2');

module.exports = {
  root: true,
  ...eslintrc,
  rules: {
    ...eslintrc.rules,
    'vuejs-accessibility/no-redundant-roles': [
      'error',
      {
        main: ['main'],
      },
    ],
  },
};
