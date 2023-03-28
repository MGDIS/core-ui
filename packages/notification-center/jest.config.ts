import base from 'jest-config/base';
import packageJson from './package.json';
import type { Config } from 'jest';

const config: Config = {
	...base,
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	snapshotSerializers: ['jest-serializer-html'],
	displayName: packageJson.name,
};

export default config;
