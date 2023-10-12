# Getting started

You'll first need to clone the repo

```sh
git clone gitlab@gitlab.mgdis.fr:core/core-ui/core-ui.git
```

## pnpm

To get started, make sure you have [pnpm](https://pnpm.io/) installed and activated using [corepack](https://nodejs.org/api/corepack.html):

```sh
corepack enable
```

After that, you can install the required packages by running:

```sh
# install packages
pnpm i
```

## Project Structure

All packages should be organized within the `packages/` folder and written in [Typescript](https://www.typescriptlang.org/). Embracing TypeScript enhances the maintainability and stability of the codebase.

Packages must be initialized with version `0.0.0` and follow the `changeset` workflow. This helps to ensure proper versioning and smooth release management.

## Running Tests

Testing is crucial to maintaining code quality. You can run tests for all packages with the following command:

```sh
pnpm test
```

To generate test coverage reports, use:

```sh
pnpm coverage
```

### Generating Screenshots Across Different Environments

Since we are working on different machines (Windows, WSL, Mac, Linux, etc.), to ensure consistency with Gitlab CI, we recommend using the following Docker script to generate screenshots:

```sh
pnpm test:e2e:playwright:docker
```

If you want to generate screenshots for a specific package, you can use the following command with a filter:

```sh
pnpm test:e2e:playwright:docker --filter=@mgdis/styles
```

## Changesets and Releases

We follow a structured approach for managing changes and releases using changesets. For every new feature added, a corresponding [changeset](https://github.com/changesets/changesets) must be written.

To create a new changeset, use the following command:

```sh
pnpm change
```

There's no limit to the number of changesets for a release, as they will be merged when the release is generated.

You can preview what will be released using:

```sh
pnpm release:status
```

To check the files the release script will commit (remember to discard changes after), use:

```sh
pnpm release:preview
```

Finally, to initiate a release for all relevant packages, use:

```sh
pnpm release
```

**`BE CAREFUL`. The above command will bump versions, create changelogs, make a commit, and push changes.**
