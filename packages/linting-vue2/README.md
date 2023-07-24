# MGDIS VueJS 2 Linting

This project centralizes all the VueJS 2 linting rules/libraries at MGDIS.

You can add linting very easily to your project.

## Prepare your local project for linting

**If your project is already using `eslint`** you must remove it and all related dependencies before installing our module.

```sh
npm un eslint eslint-plugin-jest eslint-plugin-prettier eslint-plugin-vue
// maybe more
```

Make sure you are using version 5.0.0 or greater of `@vue/cli-plugin-babel` and `@vue/cli-plugin-eslint` dependencies.

```sh
npm i -D @vue/cli-plugin-babel@5 @vue/cli-plugin-eslint@5
```

Install the module

```sh
npm add -D @mgdis/linting-vue2
```

Then create local files to use shared config (eslint and prettier)

```sh
npx linting-vue2-prepare
```

This command will create `.eslintrc.js` and `.prettierrc.js` in your local folder.

If your Vue project is not using the SFC Syntax Specification, here is the recommended lint scripts to use in your `package.json`

```json
"lint": "vue-cli-service lint --no-fix && prettier src/**/*.{html,scss}",
"lint:fix": "vue-cli-service lint && prettier --write src/**/*.{html,scss}"
```
