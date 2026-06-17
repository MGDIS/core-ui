# @mgdis/core-ui-helpers

## 1.2.1

### Patch Changes

- b79dd93: Update dependencies

## 1.2.0

### Minor Changes

- 753dd96: [#598](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/work_items/598) mg-components: align all boolean `@Prop()`s with the HTML spec for boolean attributes — the attribute's presence now implies `true` regardless of its value (`readonly`, `readonly=""`, `readonly="true"`, `readonly="false"`). Adds `normalizeBooleanAttributes` to `@mgdis/core-ui-helpers/dist/stencil`. Aligns `renderAttributes` (in `@mgdis/core-ui-helpers/dist/playwright`) with the same semantics: `true` → `attr=""`, `false` → attribute omitted.

### Patch Changes

- a4e94bd: [#561](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/work_items/561) fix `webTypesGenerator` and `vsCodeGenerator` to distinguish attributes from properties (WebStorm / VS Code no longer mix them), and add a new `cemGenerator` producing a standard Custom Elements Manifest v2.
- e61e4c8: Update dependencies

## 1.1.2

### Patch Changes

- c143cee: update dependencies
- b6ec26f: upgrade dependencies

## 1.1.1

### Patch Changes

- de9a68a: Update dependencies

## 1.1.0

### Minor Changes

- 5464ea7: add `localeByte()` helper

## 1.0.7

### Patch Changes

- 76206e1: `renderAttributes` helper should render "false" attributes to avoid unassigned values.
- 143f9d0: update dependencies

## 1.0.6

### Patch Changes

- 1dbcf59: Update dependencies
- 004124f: Updated dependency `@types/node` to `v22.18.13`

## 1.0.5

### Patch Changes

- 745242e: Update dependencies

## 1.0.4

### Patch Changes

- 958dcd3: Update dependencies

## 1.0.3

### Patch Changes

- 97c96f2: production build optimization
- 8d3b778: Update dependencies
- 8ef4819: Update dependencies

## 1.0.2

### Patch Changes

- 4b9f78c: apply sonar recommandations
- ef9786d: update dependencies

## 1.0.1

### Patch Changes

- 2cda5b3: Update dependencies

## 1.0.0

### Major Changes

- 10c6605: Helper package release.

### Patch Changes

- 3c89e9d: replace @mgdis/mg-components-helpers @mgdis/playwright-helpers and @mgdis/stencil-helpers dependences by @mgdis/core-ui-helpers
- b816cca: Update dependencies
