/**
 * The following code should be used:
 *
 * const prettierConfig = require('@mgdis/prettier-config');
 * module.exports = { ...prettierConfig };
 *
 * But to prevent build errors on our public GitHub repository and with Renovate
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
