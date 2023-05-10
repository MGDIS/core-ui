module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc', 'jsdoc'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'turbo'],
  parser: '@typescript-eslint/parser',
  rules: {
    'jsdoc/require-description': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/require-returns-check': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/valid-types': 'warn',
    'tsdoc/syntax': 'warn',
  },
};
