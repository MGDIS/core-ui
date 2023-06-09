![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# MG Components

This project centralize MGDIS standalone Web Components using [Stencil](https://stenciljs.com/).

## Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

To run MG Components, clone this repository, go to your new directory and run:

```bash
# This repository uses pnpm as package manager
corepack enable
pnpm i
pnpm start
```

To build for production, run:

```bash
pnpm build
```

To run tests for the components, run:

```bash
pnpm test

# only unit tests
pnpm test:unit

# only e2e tests
pnpm test:e2e

# filter on filename
pnpm test -- mg-icon
pnpm test:unit -- mg-icon
```

<!-- Not working for now: To regenerate snapshot you must add the `-u` parameter. -->

To regenerate snapshot you must add the `--updateSnapshot` parameter.

For E2E tests you **must** use [WSL](https://docs.microsoft.com/fr-fr/windows/wsl/install) or a Linux OS to get the same screenshots as the GitLab CI.

To add a component, run:

```bash
pnpm generate component-path

# example for an atom
pnpm generate atoms/mg-icon

# example for a molecule
pnpm generate molecules/mg-message
```

## Naming Components

All of the MGDIS generated web components must use the prefix `mg`.

## Using this library

You will find how to use the library instructions in the [Getting Started section](src/stories/1-getting-started.stories.mdx).

## Style

### Naming methodology

MG Components is using [BEM](https://en.bem.info/) (Block, Element, Modifier) methodology with the [two dashes style](https://en.bem.info/methodology/naming-convention/#two-dashes-style) naming scheme.

### Declaration organisation

When a selector contains too many declaration it is recommended to organize them by theme : Display, Decoration, Font, Others.

```CSS
.mg-button {
  // Display
  display: inline-block;
  vertical-align: middle;
  min-height: 3.5rem;
  padding: 0.6rem 1.2rem;
  // Decoration
  background-image: none;
  border-radius: 0.3rem;
  border: 0.1rem solid transparent;
  cursor: pointer;
  // Font
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  // Others
  touch-action: manipulation;
}
```

## Storybook

The plugin [storybook-addon-docs-stencil
](https://github.com/pixtron/storybook-addon-docs-stencil) is used to generate the doc. **To be up to date on local it needs a fresh build**.

### run

```bash
pnpm storybook
```

### Notes

To display components in our `stories`, we use the `filterArgs` method to only show the necessary arguments in the code example. It takes in the first parameter an object containing the arguments to be used, and in the second parameter, an object containing the component default values.

```JS
const Template = (args: any): HTMLElement => (
  <mg-tooltip {...filterArgs(args, { placement: 'bottom' })}>
    <mg-icon icon="info-circle"></mg-icon>
  </mg-tooltip>
);
```
