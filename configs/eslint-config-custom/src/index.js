module.exports = {
	plugins: ["@typescript-eslint/eslint-plugin", "eslint-plugin-tsdoc"],
	extends: ["plugin:@typescript-eslint/recommended", "prettier", "turbo"],
	parser: "@typescript-eslint/parser"
}