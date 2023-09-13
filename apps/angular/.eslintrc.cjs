const { eslintrc } = require('@mgdis/linting-angularjs');

module.exports = {
  ...eslintrc,
  root: true,
  globals: {
    angular: true,
  },
  parserOptions: {
    ...eslintrc.parserOptions,
    ecmaVersion: 6,
    sourceType: "module"
  },
  // TODO remove overrides config. need to resolve error: `ESLint couldn't find the config "plugin:@html-eslint/recommended" to extend from.`
  overrides: [
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@mgdis/html/recommended'],
      rules: {
        'prettier/prettier': 'off', // Do not report prettier errors on html files
      },
    },
  ],
};
