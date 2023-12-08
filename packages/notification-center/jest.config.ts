import base from 'jest-config/base';
import { name } from './package.json';
import type { Config } from 'jest';

const config: Config = {
  ...base,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  snapshotSerializers: ['jest-serializer-html'],
  displayName: name,
};

export default config;
