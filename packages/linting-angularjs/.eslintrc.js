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
    // These rules will be gradually activated in the next releases
    'no-unused-vars': 'warn',
    'no-redeclare': 'warn',
    'no-inner-declarations': 'warn',
    'no-prototype-builtins': 'off',
    'angular/controller-as-route': 'off',
    'angular/controller-as': 'off',
    'angular/controller-as-vm': 'off',
    'angular/controller-name': 'off',
    'angular/file-name': 'off',
    'angular/function-type': 'off',
    'angular/no-service-method': 'off',
    'angular/no-run-logic': 'off',
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
        'prettier/prettier': 'off', // Do not report prettier errors on html files
        '@html-eslint/indent': 'off',
        '@html-eslint/require-doctype': 'off',
        '@html-eslint/element-newline': 'off',
        '@html-eslint/require-closing-tags': 'off',
        '@html-eslint/no-duplicate-id': 'off',
        '@html-eslint/require-li-container': 'off',
        '@html-eslint/no-extra-spacing-attrs': 'off',
      },
    },
  ],
};
