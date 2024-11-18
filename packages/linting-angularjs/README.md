# @mgdis/linting-angularjs

This project centralizes all the AngularJS linting rules/libraries at MGDIS.

You can add linting very easily to your project.

## Prepare your local project for linting

Install the module

```sh
npm add -D @mgdis/linting-angularjs
```

Then create local files to use shared config (eslint and prettier)

```sh
npx linting-angularjs-prepare
```

This command will create `.eslintrc.js` and `.prettierrc.js` in your local folder.

You can now integrate the linter into your project. Here is an example of scripts you can use:

```json
"lint": "eslint 'src/**/*.{html,js}'",
"format": "prettier --check '**/*.{scss,md,json}'",
```

Since HTML linting includes Prettier, it's not necessary to separately format HTML files with Prettier.

## Troubleshooting

You might need to upgrade eslint, scope like `@mgdis` are handled since the v5.0.0.

**If your project was already using `eslint`** you might need to import the `globals` key in the `.eslintrc.js`.

```js
module.exports = {
  ...eslintrc,
  globals: {
    angular: true,
    _: true,
    moment: true,
    // and many more
  },
};
```
