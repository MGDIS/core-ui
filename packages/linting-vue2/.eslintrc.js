module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  plugins: ['@mgdis/vue'],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@mgdis/vue/recommended',
    'plugin:jsdoc/recommended',
    'plugin:vuejs-accessibility/recommended',
    '@vue/eslint-config-prettier', // Must be last https://github.com/vuejs/eslint-config-prettier#usage
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vuejs-accessibility/no-redundant-roles': 'off',
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        required: {
          every: ['id'], // Removing nestested label input rule
        },
      },
    ],
  },
};
