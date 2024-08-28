# Style Sheets

**This package is, for now, reserved to mg-components.**

👋 Hello `@mgdis/element`! Meet our newest addition: 'styles' We're gearing up for a smoother, more modern styling experience, and 'styles' will be leading the way. While we appreciate your service, we're gradually transitioning to the new package to harness its power and simplicity. Don't worry; we'll ensure a seamless migration for your styles. Exciting times ahead! 🌟

## SCSS

The package is built using SCSS (Sass), a CSS preprocessor that allows for a more organized and maintainable styling workflow. SCSS extends CSS with features like variables, nesting, mixins, and more, making it easier to create and manage complex styles.

### Folder Structure

The SCSS files are structured following a modular approach to ensure better organization and reusability. The folder structure looks like this:

```bash
scss/
  ├── base/
  │   ├── _index.scss
  │   ├── _typography.scss
  │   └── ...
  ├── components/
  │   ├── _index.scss
  │   ├── _button.scss
  │   ├── _card.scss
  │   └── ...
  ├── layout/
  │   ├── _index.scss
  │   ├── _grid.scss
  │   ├── _header.scss
  │   └── ...
  ├── utilities/
  │   ├── _index.scss
  │   ├── _a11y.scss
  │   ├── _spacing.scss
  │   ├── _colors.scss
  │   └── ...
  └── styles.scss
```

- The `base/` folder contains styles that establish the base styles of the project, such as global typography, etc.
- The `components/` folder holds styles specific to UI components, each in its own partial file.
- The `layout/` folder contains styles related to the overall layout structure of the project.
- The `utilities/` folder contains various utility classes and mixins to apply common styles throughout the project.
- The `styles.scss` file acts as the entry point, where all other partial files are imported and compiled into a single CSS file.

Each folder contains an `_index.scss` in charge of importing all the folder files.

## B.E.M.

This project is using the [B.E.M. methodology](https://getbem.com/introduction/).

Going further, this project is using Brad Frost's [css architecture for design systems](https://bradfrost.com/blog/post/css-architecture-for-design-systems/) recommandations.

### Global namespace

All classes **MUST** start with `.mg-`.

### Class prefixes

In addition to a global namespace, we added prefixes to each class to make it more apparent what job that class is doing. Here’s the class prefixes:

- `c-` for UI components, such as `.mg-c-card` or `.mg-c-button`
- `l-` for layout-related styles, such as `.mg-l-grid` or `.mg-l-group-elements`
- `u-` for utilities, such as `.mg-u-visually-hidden` or `.mg-u-h1`

## Custom Properties

Custom properties, a.k.a. CSS variables, are a powerful mechanism for storing reusable values in CSS stylesheets. They are defined using the syntax `--variable-name: value;`.

### Global namespace

All custom properties **MUST** start with `--mg-`.

### Prefixes

In addition to a global namespace, we have added prefixes to each custom property to indicate its purpose more clearly. Here are the prefixes:

- `b-` for base custom properties, such as `font-size`, which will be `--mg-b-font-size`.
- `c-` for component-specific custom properties, such as the `min-width` variable of the `mg-card` component, which will be `--mg-c-card-min-width`.
- `l-` for layout-related custom properties, such as grid spacing, which will be `--mg-l-grid-spacing`.

## Lint

To avoid errors and enforce conventions we are using [Stylelint](https://stylelint.io/) with a [custom config](.stylelintrc.json) and Prettier.
