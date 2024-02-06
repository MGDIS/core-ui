# Breaking Changes

This document provides an overview of the breaking changes introduced in major version releases of mg-components.

## Versions

- [mg-components 2.x](#mg-components-v200)
- [mg-components 3.x](#mg-components-v300)
- [mg-components 4.x](#mg-components-v400)
- [mg-components 5.x](#mg-components-v500)
- [mg-components 6.x](#mg-components-v600)

## mg-components v2.0.0

### mg-icon

- Icon names have been updated following the naming convention described in [PDA9-744](https://jira.mgdis.fr/browse/PDA9-744).
- Icon sizes are now `regular` (default), `large`, and `extra-large`.

### Custom Event Names

Custom event names are now in kebab-case: `valueChange` changed to `value-change`.

## mg-components v3.0.0

### Component Properties

Component properties are no longer reflected to prevent errors with boolean values.  
For example, to change the `disabled` property of a component in Vue.js, use `disabled.prop="maVarDisabled"`.

## mg-components v4.0.0

**Drop IE Support 🍾**

### Default Language and Currency

Library default language is now `en`, with matching currency `USD`.

### mg-input

Rename `width` property to `mg-width` to prevent a11y audit feedback.

### mg-character-left

Removed `template` attribute, as the new design (e.g., 400/400) does not require it anymore.

Matching attributes `character-left-template` in `<mg-input-text>` and `<mg-input-textarea>` are also removed.

### mg-icon

Icon `arrows-rotate` renamed to `arrows-rotate-backward`.

## mg-components v5.0.0

### Shadow DOM

`mg-button`, `mg-tooltip`, and `mg-popover` components now use [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). This may introduce a11y issues but resolves AngularJS issues.

Following this change the [mg-text-content AngularJS directive](http://core.pages.mgdis.fr/core-documentation/docs/core-ui/packages/mg-components-helpers/) is no longer necessary.

### mg-button

Accessibility properties (expanded, controls, haspopup) have been removed. Set them directly on the component (aria-expanded, aria-controls, aria-haspopup) as you would on a regular button.

### Mandatory Props

Components with missing mandatory props won't render and will throw an error.

### variables.scss

No more `variables.scss` export, only `variables.css`.

## mg-components v6.0.0

- [Changes in `mg-icon`](#changes-in-mg-icon)
- [Changes in `mg-button`](#changes-in-mg-button)
- [Hide Components](#hide-components)

### Changes in `mg-icon`

- Removed `question-circle` icon. Use the existing `interrogation-circle` icon instead.

  ```html
  <!-- in v5 -->
  <mg-icon icon="question-circle"></mg-icon>
  <!-- in v6 -->
  <mg-icon icon="interrogation-circle"></mg-icon>
  ```

### Changes in `mg-button`

- Removed `identifier` prop. Use `id` directly if needed.

  ```html
  <!-- in v5 -->
  <mg-button identifier="blu">Non</mg-button>
  <!-- in v6 -->
  <mg-button id="blu">Non</mg-button>
  ```

### Hide components

- `mg-message` and `mg-modal` no longer use the `hide` prop for visibility. Use the native `hidden` attribute.

  ```html
  <!-- in v5 -->
  <mg-message hide>Non</mg-message>
  <mg-modal modal-title="Modal title" hide><p slot="content">non</p></mg-modal>
  <!-- in v6 -->
  <mg-message hidden>Non</mg-message>
  <mg-modal modal-title="Modal title" hidden><p slot="content">non</p></mg-modal>
  ```

### Internal components

- `mg-input-title` and `mg-character-left` components are now considered internal and should not be used outside of `mg-components`. Dedicated stories for these components have been removed.

### Changes in `mg-input-text` and `mg-input-textarea`

- Renammed `display-character-left` prop to `character-left-hide`.  
  The `display-character-left` prop was inconsistent with standard boolean attributes as it requires setting a "false" value explicitly. It should align with standard boolean attributes, which are considered false when the attribute is missing.

  ```html
  <!-- in v5 -->
  <mg-input-text identifier="blu" label="non" display-character-left="false"></mg-input-text>
  <!-- in v6 -->
  <mg-input-text identifier="blu" label="non" character-left-hide></mg-input-text>
  ```
