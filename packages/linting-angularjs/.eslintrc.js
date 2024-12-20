module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    commonjs: true,
  },
  plugins: ['@html-eslint', '@mgdis/html'],
  extends: ['eslint:recommended', 'plugin:angular/johnpapa', 'plugin:jsdoc/recommended', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    // Best Practices
    'angular/controller-as-route': 'off',
    'angular/controller-as-vm': 'off',
    'angular/controller-as': 'off',
    'angular/no-run-logic': 'off',
    // Naming
    'angular/controller-name': 'off',
    'angular/file-name': 'off',
    // Conventions
    'angular/function-type': 'off',
    'angular/no-service-method': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      rules: {
        'angular/module-getter': 'off',
      },
    },
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended', 'plugin:@mgdis/html/recommended'],
      rules: {
        // Best Practices
        '@html-eslint/require-doctype': 'off', // Component templates do not require a doctype.
        '@html-eslint/require-closing-tags': 'off', // This rule is in conflict with Prettier.
        // Style - Disabling rules in favor of Prettier
        '@html-eslint/attrs-newline': 'off',
        '@html-eslint/element-newline': 'off',
        '@html-eslint/indent': 'off',
        '@html-eslint/no-extra-spacing-attrs': 'off',
        '@html-eslint/quotes': 'off',
      },
    },
  ],
};
