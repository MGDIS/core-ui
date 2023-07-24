require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@mgdis/vue', 'vue3-jsx', 'eslint-plugin-tsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@mgdis/vue/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:vuejs-accessibility/recommended',
    '@vue/eslint-config-prettier', // Must be last https://github.com/vuejs/eslint-config-prettier#usage
  ],
  rules: {
    'tsdoc/syntax': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'vuejs-accessibility/label-has-for': [
      'error',
      {
        required: {
          every: ['id'], // Removing nestested label input rule
        },
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
