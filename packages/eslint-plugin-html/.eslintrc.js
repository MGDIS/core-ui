module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:eslint-plugin/recommended', 'plugin:node/recommended'],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 13,
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
