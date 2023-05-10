# CORE-UI

CORE-UI monorepo based on [pnpm monorepo template](https://gitlab.mgdis.fr/core/core-back/monorepo-template).

## How to use it

This is based in [pnpm](pnpm.io/), to activate it (via [corepack](https://nodejs.org/api/corepack.html)):

```sh
corepack enable
```

then:

```sh
# install packages
pnpm i
```

## Structure

All packages must be placed in [packages/](./packages/) folder.

They must be written in [Typescript](https://www.typescriptlang.org/).

Packages must be initialized in version: `0.0.0` and follow the `changeset` workflow.

## Tests

To launch tests:

```sh
pnpm test
```

With coverage:

```sh
pnpm coverage
```

## Changesets and releases

For every feature added, a [changeset](https://github.com/changesets/changesets) must be written too.

To write a new changeset:

```sh
pnpm change
```

There is no limit of changesets for a release, they will be merged when the release will be generated.

To check what will be released:

```sh
pnpm release:status
```

To make a release (of all concerned packages):

```sh
pnpm release
```

**`BE CAREFUL`. The above command will: bump versions, create changelogs, make a commit, push changes.**
