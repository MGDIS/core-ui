import { setupEslint } from 'eslint-config-stencil';
import { defaultConfig } from 'prettier-config';

export { setupEslint } from 'eslint-config-stencil';
export const prettierrc = { ...defaultConfig };
export const eslintrc = { ...setupEslint() };
