module.exports = {
  root: true,
  extends: ['@core-ui/eslint-config-stencil'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
};
