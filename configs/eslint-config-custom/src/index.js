module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'tsdoc', 'jsdoc'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:turbo/recommended', 'prettier'], // Prettier MUST be the last one
  parser: '@typescript-eslint/parser',
  rules: {
    'jsdoc/require-jsdoc': ['warn', { publicOnly: true, require: { FunctionExpression: true, ArrowFunctionExpression: true } }],
    'jsdoc/require-jsdoc': [
      'warn',
      {
        publicOnly: false,
        checkConstructors: false,
        contexts: [
          'PropertyDefinition[key.type=Identifier]:matches(PropertyDefinition[accessibility!=private])',
          'PropertyDefinition[accessibility=private] > ArrowFunctionExpression',
          'MethodDefinition[accessibility=private]',
        ],
        require: {
          ArrowFunctionExpression: false,
          ClassDeclaration: false,
          ClassExpression: false,
          FunctionExpression: false,
          FunctionDeclaration: false,
          MethodDefinition: false,
          MethodDefinition: false,
        },
      },
    ],
    'jsdoc/require-description': 'warn',
    'jsdoc/require-param-name': 'warn',
    'jsdoc/require-returns': 'warn',
    'jsdoc/require-returns-check': 'warn',
    'jsdoc/require-returns-description': 'warn',
    'jsdoc/valid-types': 'warn',
    'tsdoc/syntax': 'warn',
  },
};
