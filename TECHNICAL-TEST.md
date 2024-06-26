# Technical Test

The idea of the test is to migrate an AngularJS UI to a VueJS app.

It is a simple todo list screen with an input to add elements and a list with a button on each item to remove it.

During this test, we expect some improvements regarding semantics, accessibility (a11y), CSS, etc.

## Set Up Environment

### Clone Repository

Clone this repository: [https://github.com/MGDIS/core-ui](https://github.com/MGDIS/core-ui)

The branch to use is `chore/technical-test`.

### Install Dependencies

This monorepo project uses `pnpm`. To activate it, run:

```sh
corepack enable
```

And then:

```sh
pnpm i
```

### Build packages

Our apps will need our built packages. To do so, run:

```sh
pnpm build
```

### AngularJS app

The AngularJS app can be found in `apps/angularjs`.

#### Run the app

To run the app, you can do:

```sh
cd apps/angularjs
pnpm dev
# or
pnpm -C apps/angularjs dev
```

#### Screen to Migrate

The view to migrate is located in `apps/angularjs/src/components/technical-test`.

### VueJS@3 app

The VueJS app can be found in `apps/vue-3`.

#### Run the app

To run the app, you can do:

```sh
cd apps/vue-3
pnpm dev
# or
pnpm -C apps/vue-3 dev
```

## Test

We expect you to migrate this legacy screen.

During the migration, we also expect, **if needed**, some fixes regarding HTML semantics, accessibility, and BEM CSS methodology.
