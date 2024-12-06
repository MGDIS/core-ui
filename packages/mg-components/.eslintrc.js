// eslint-disable-next-line @typescript-eslint/no-var-requires
const { eslintrc } = require('@mgdis/linting-stencil');

module.exports = {
  ...eslintrc,
  root: true,
  extends: [...eslintrc.extends, 'plugin:storybook/recommended'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
