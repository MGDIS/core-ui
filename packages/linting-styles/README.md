# @mgdis/linting-styles

This project uses [Stylelint](https://stylelint.io/) to centralize all style linting rules at MGDIS.

## Prepare your local project for linting

Install the required dependencies:

```sh
pnpm i -D stylelint prettier @mgdis/linting-styles
```

Create a `.stylelintrc.json` file in your local folder with the following content:

```JSON
{
  "extends": "@mgdis/linting-styles"
}
```

Add a linting script to the `scripts` section of your `package.json`:

```json
{
  "scripts": {
    "lint": "pnpm lint:es && pnpm lint:prettier && pnpm lint:styles",
    "lint:es": "eslint src/**/*.{ts,tsx}",
    "lint:prettier": "prettier --check **/*.{ts,tsx,html,mdx,json}",
    "lint:styles": "stylelint '**/*.{css,scss,sass,less}' --ignore-path .gitignore"
  }
}
```

### Customize the default configuration

If you need to override the default configuration, you can use the [`overrides`](https://stylelint.io/user-guide/configure#overrides) property to apply specific rules to a subset of files:

```JSON
{
  "extends": "@mgdis/linting-styles",
  "overrides": [
    {
      "files": ["packages/styles/**/*.scss"],
      "rules": {
        "selector-class-pattern": [
          "^mg-(c|u|l)-((?!mg-)[a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}",
          {
            "resolveNestedSelectors": true
          }
        ],
      }
    }
  ]
}

```
