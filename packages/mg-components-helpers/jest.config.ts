import base from 'jest-config/base';
import { name } from './package.json';
import type { Config } from 'jest';

const config: Config = {
  ...base,
  testEnvironment: 'jsdom',
  displayName: name,
  testMatch: [`${__dirname}/src/**/*.spec.js`],
  setupFiles: ['./jest.setup.ts'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  moduleFileExtensions: ['js', 'vue'],
};

export default config;
