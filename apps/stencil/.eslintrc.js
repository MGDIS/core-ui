/* eslint-disable @typescript-eslint/no-var-requires */
const { eslintrc } = require('@mgdis/linting-stencil');

module.exports = {
  ...eslintrc,
  root: true,
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
