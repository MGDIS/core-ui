# Changelog

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