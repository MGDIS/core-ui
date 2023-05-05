import type { Linter } from 'eslint';

export const defaultConfig = {
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc', 'jsdoc'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'turbo'],
  parser: '@typescript-eslint/parser',
};

/**
 * setup eslint function
 * @param config - config object to merge with default config
 * @returns generated config object
 */
export const setupEslint = (config: Linter.BaseConfig = {}): Linter.BaseConfig => ({
  ...config,
  plugins: [...defaultConfig.plugins, ...(config.plugins || [])],
  extends: [...defaultConfig.extends, ...(config.extends || [])],
  parser: config.parser || defaultConfig.parser,
  rules: {
    'jsdoc/require-description': 2,
    'jsdoc/require-param-name': 2,
    'jsdoc/require-returns': 2,
    'jsdoc/require-returns-check': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/valid-types': 2,
    'tsdoc/syntax': 'warn',
    ...config.rules,
  },
});

export default setupEslint();
