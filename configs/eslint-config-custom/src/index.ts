import type { Linter } from 'eslint';

export const defaultConfig = {
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'turbo'],
  parser: '@typescript-eslint/parser',
};

export const setupEslint = (config: Linter.BaseConfig = {}): Linter.BaseConfig => ({
  ...config,
  plugins: [...defaultConfig.plugins, ...(config.plugins || [])],
  extends: [...defaultConfig.extends, ...(config.extends || [])],
  parser: config.parser || defaultConfig.parser,
});

export default setupEslint();
