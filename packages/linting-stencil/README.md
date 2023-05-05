# MGDIS Linting Stencil

This project centralizes all the linting rules/libraries at mgdis.

You can add linting very easily to your project.

## Prepare your local project for linting

Install the module

```sh
npm install -D @mgdis/linting-stencil
```

Then create local files to use shared config (eslint and prettier)

```sh
npx linting-stencil-prepare
```

This command will create `.eslintrc.js` and `.prettierrc.js` in your local folder.

The last thing is to add a lint script in your `package.json`

```json
{
  "scripts": {
    "lint": "run-s lint:es lint:prettier",
    "lint:fix": "run-s lint:es:fix lint:prettier:fix",
    "lint:es": "eslint src/**/*.{ts,tsx}",
    "lint:es:fix": "eslint src/**/*.{ts,tsx} --fix",
    "lint:prettier": "prettier --check **/*.{ts,tsx,scss,html,mdx,json}",
    "lint:prettier:fix": "prettier --write **/*.{ts,tsx,scss,html,mdx,json}"
  }
}
```

## Troubleshooting

### NPM

The way in which `npm@8` manages path and symlinks of dependencies is different to `npm@6`. Because of this, with `npm@6`, we need to explicity install `eslint` as a direct dependency of our project.

```sh
npm add @mgdis/linting-stencil eslint --save-dev
```

In some cases, the needed libraries (like eslint or prettier) are not automatically added, if this is your case, add these lines to your `devDependencies`.

```json
{
  "devDependencies": {
    "@stencil-community/eslint-plugin": "^0.x",
    "@typescript-eslint/eslint-plugin": "^5.x",
    "@typescript-eslint/parser": "^5.x",
    "eslint": "^8.x",
    "eslint-config-prettier": "^8.x",
    "eslint-config-turbo": "^1.x",
    "eslint-plugin-jsx-a11y": "^6.x",
    "eslint-plugin-tsdoc": "^0.x",
    "eslint-plugin-jsdoc": "^43.x",
    "prettier": "^2.x",
    "npm-run-all": "^4.x"
  }
}
```

### Monorepo

When you use @mgdis/linting-stencil in a monorepo package instead of globaly, you need to add some config in the generated file.

```js
...

module.exports = {
  // packages/package-name/.eslintrc.js
  ...
  root: true,
}
`;
```

### Customize default configuration

To set custom configuration to the default one, you can pass a valide ESLint config object in the `setupEslint` function. This will merge the default eslint config with your custom config. The standard case is the `parserOptions` setting as shown in the following exemple:

```js
...
module.exports = {
  ...setupEslint({
    parserOptions: {
      project: "./tsconfig.json"
    },
  }),
}
```
