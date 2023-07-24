const base = require('jest-config/base');
const packageJson = require('./package.json');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...base,
  testEnvironment: 'jsdom',
  displayName: packageJson.name,

  testMatch: [`${__dirname}/src/**/*.spec.js`],
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  moduleFileExtensions: ['js', 'vue'],
};
