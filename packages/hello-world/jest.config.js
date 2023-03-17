const base = require('jest-config/base');
const packageJson = require('./package.json');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	...base,
	preset: 'ts-jest',
	displayName: packageJson.name,
	testMatch: [`${__dirname}/src/**/*.spec.ts`],
};
