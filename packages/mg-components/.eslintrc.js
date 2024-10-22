module.exports = {
  root: true,
  extends: ['@core-ui/eslint-config-stencil', 'plugin:storybook/recommended'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
