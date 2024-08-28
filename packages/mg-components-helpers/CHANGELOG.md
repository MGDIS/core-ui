# Changelog

## 4.1.9

### Patch Changes

- 2a72803: Use typedoc-config package

## 4.1.8

### Patch Changes

- 2fad542: update dependencies

## 4.1.7

### Patch Changes

- 9c9620c: update dependencies

## 4.1.6

### Patch Changes

- 4ee49fe: Update dependencies

## 4.1.5

### Patch Changes

- c567b43: update dependencies
- 1583a06: [#497](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/497) fix mg-components-helpers export typos

## 4.1.4

### Patch Changes

- 43f1421: update dependancies

## 4.1.3

### Patch Changes

- 38ba699: Use vitest-config package
- 253c7a6: Update dependencies

## 4.1.2

### Patch Changes

- d674c81: Update dependencies

## 4.1.1

### Patch Changes

- 140a4ab: Update dependencies

## 4.1.0

### Minor Changes

- 15bb138: [#475](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/475) [mg-components-helper] add UMD export in dist

### Patch Changes

- a8d2eea: Update dependencies

## 4.0.2

### Patch Changes

- fbdf99a: Update dependencies

## 4.0.1

### Patch Changes

- 7a7e0ec: Update dependencies

## 4.0.0

### Major Changes

- 71e8db4: [#446](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/446) create mg-angular-logger

### Patch Changes

- 80eecca: [#444](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/444) mg-form: aria-role isn't permit by axe-core

## 3.11.5

### Patch Changes

- c25283d: [#298](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/298) chore: create apps to test lib integration

## 3.11.4

### Patch Changes

- b9dd4e81: add full target path to exports in package.json

## 3.11.3

### Patch Changes

- 5e175a62: version bump to publish failed release

## 3.11.2

### Patch Changes

- 02eba958: publish into npm-local instead of npm-repo

## 3.11.1

### Patch Changes

- 1fca016e: Fix release problems in publish stage

## 3.11.0

### Minor Changes

- 6607a979: Now `core` is using `pnpm workspaces` instead of `lerna`

  This allow us to have a better managament of dependencies, cleaner changelogs, and modern utils.

  The modules included in core are not affected by this change. We are just changing the internals of core.

  In any case, if you have problems, don't hesitate to create an issue

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 3.10.0

### Bug Fixes

- **mgComponentsHelpers:** add mgTextContent directive , closes [#123](http://gitlab@gitlab.mgdis.fr:core/core-back/core/issues/123)

### Features

- **mgtranslate:** delete directive , closes [#123](http://gitlab@gitlab.mgdis.fr:core/core-back/core/issues/123)

## 3.9.3

**Note:** Version bump only for package @mgdis/mg-components-helpers

## 3.9.2

**Note:** Version bump only for package @mgdis/mg-components-helpers

## 3.9.1

**Note:** Version bump only for package @mgdis/mg-components-helpers

## 3.9.0

**Note:** Version bump only for package @mgdis/mg-components-helpers

## 3.8.0

**Note:** Version bump only for package @mgdis/mg-components-helpers

## 3.7.0

**Note:** Version bump only for package @mgdis/mg-components-helpers

## 3.6.1

### Bug Fixes

- **mgComponentHelpers:** prevent conflicts between angular and vue with a simple "main" exports
- **mgComponentsHelpers:** update exports to manage import un gulp projects , closes [#114](http://gitlab@gitlab.mgdis.fr:core/core-back/core/issues/114)
- **mgComponentsHelpers:** update exports to split vue and angular , closes [#114](http://gitlab@gitlab.mgdis.fr:core/core-back/core/issues/114)

## 3.6.0

### Features

- **mgTranslate:** @drouian-m MR feedback
- **mgTranslate:** @duhem-s MR feedback
- **mgTranslate:** add mg-translate directive helper
