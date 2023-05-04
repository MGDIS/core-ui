import type { Linter } from 'eslint';
import { setupEslint as setup } from 'eslint-config-custom';

const baseConfig = setup({
  extends: ['plugin:@stencil-community/recommended', 'plugin:jsx-a11y/recommended'],
});

export const setupEslint = (config: Linter.BaseConfig = {}): Linter.BaseConfig => ({
  ...config,
  plugins: [...(baseConfig.plugins as string[]), ...(config.plugins || [])],
  extends: [...(baseConfig.extends as string[]), ...(config.extends || [])],
  parser: config.parser || baseConfig.parser,
});
