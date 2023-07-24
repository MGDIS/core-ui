# MGDIS AngularJS Linting

This project centralizes all the AngularJS linting rules/libraries at mgdis.

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

You can now use the linter, here an example script you can use for you project:

```json
"lint": "eslint --ext js,html app/",
```

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
