/**
 * Shoulbe be the following code
 *
 * const prettierConfig = require('@mgdis/prettier-config');
 * module.exports = { ...prettierConfig };
 *
 * But to prevent error build on our public GitHub repository on in renovate
 * we will use the following code which is the same as what we import
 */
module.exports = {
  useTabs: false,
  tabWidth: 2,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'always',
};
