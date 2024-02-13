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
        'prettier/prettier': 'off', // Do not report prettier errors on html files
        '@html-eslint/require-doctype': 'off', // Component templates do not require a doctype.
      },
    },
  ],
};
