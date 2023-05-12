module.exports = {
  root: true,
  extends: ['stencil', 'plugin:storybook/recommended'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
