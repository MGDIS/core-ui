/**
 * @type {import('@jest/types').Config.GlobalConfig}
 */
module.exports = {
	roots: ["<rootDir>", "<rootDir>/src"],
	testEnvironment: "node",
	coverageReporters: ["text", "json"],
	reporters: [
		"default",
		["jest-junit", { outputDirectory: "coverage", outputName: "junit.xml" }],
	],
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"/build/",
		"/dist/",
		"/coverage/",
	],
	coverageDirectory: "<rootDir>/coverage/",
	testPathIgnorePatterns: ["node_modules", "dist"],
	clearMocks: true,
};
