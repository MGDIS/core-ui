import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>', '<rootDir>/src'],
  testEnvironment: 'node',
  coverageReporters: ['text', 'html', 'cobertura', 'lcov'],
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage', outputName: 'junit.xml' }]],
  coveragePathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/coverage/'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  coverageDirectory: '<rootDir>/coverage/',
  testPathIgnorePatterns: ['node_modules', 'dist'],
  clearMocks: true,
  coverageThreshold: {
    global: {
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
};

export default config;
