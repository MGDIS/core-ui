# @mgdis/styles

## 2.7.0

### Minor Changes

- 03ddc32: [**`<mg-table>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-table--docs) new style
- 3a3a131: [**`<mg-tag>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-tag--docs) update style: remove center alignement

### Patch Changes

- 3c89e9d: replace @mgdis/mg-components-helpers @mgdis/playwright-helpers and @mgdis/stencil-helpers dependences by @mgdis/core-ui-helpers
- b816cca: Update dependencies

## 2.6.0

### Minor Changes

- a3201f0: [**`<mg-details>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-details--docs) manage empty summary on responsive
- 5055b10: [**`<mg-input-combobox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-combobox--docs) update buttons visibility ux

## 2.5.1

### Patch Changes

- dc041e9: [#549](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/549) Lag caused by mg-tooltip since version 6.5.0
- de8f8bc: Update dependencies

## 2.5.0

### Minor Changes

- 09d02e3: [**`<mg-input-combobox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-combobox--docs) new component

### Patch Changes

- e1d2b09: [#542](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/542) mg-details: restrict click area on `<summary>` element
- bf3215f: [#549](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/549) Lag caused by mg-tooltip since version 6.5.0

## 2.4.1

### Patch Changes

- 0d14289: Update dependencies

## 2.4.0

### Minor Changes

- 7846cf7: Add mg-table component

### Patch Changes

- 8e9e1b3: Update dependencies

## 2.3.1

### Patch Changes

- 2b349d8: mg-modal text color should inherit from parent
- d04ddfa: Update dependencies

## 2.3.0

### Minor Changes

- 0c556bb: [**`<mg-input-rich-text-editor>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-rich-text-editor--docs) new component
- 0964f29: [**`<mg-illustrated-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-illustrated-message--docs) Update sizes ans spacings

### Patch Changes

- 5e91701: [#537](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/537] fix height definition for mg-input-checkbox values in the multi type variant
- a513c99: Update dependencies

## 2.2.2

### Patch Changes

- 48ed887: [#531](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/531) mg-menu: responsive issues on Chrome
- 7aca391: [#2](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/2) mg-message : additional padding when mg-message is a direct child of a mg-panel

## 2.2.1

### Patch Changes

- 975aee1: [#528](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/528) mg-illustrated-message: svg illustration has bad size when direction="horizontal" is set
- 06412ab: [#526](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/526) mg-menu: sub-menu responsive not working
- e1fa2cd: [#59](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/59) Add offset classes to mg-l-grid

## 2.2.0

### Minor Changes

- 8fd9456: [**`<mg-button>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs) added `size` prop.

### Patch Changes

- 24f51d8: Init `@mgdis/linting-styles` package
- e4dc545: [#524](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/524) mg-input-text: prevent input to shrink or expand with characters left count and provide enought place for the counter
- 5851a2c: update dependencies

## 2.1.0

### Minor Changes

- 462e909: [**`<mg-progress>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-progress--docs) add mg-progress component

### Patch Changes

- 459444d: Replace import by use function in Sass to avoid using deprecated ones
- f73a81d: Updated dependencies

## 2.0.1

### Patch Changes

- 539d514: Update color functions use in Sass to avoid using deprecated ones
- b4c8f16: [#511](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/511) mg-details: margin on toggle without summary
- a2875ae: [#513](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/513) Hide reveal button of Microsoft Edge browser for password field to avoid duplicate
- 5920894: [#509](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/509) mg-input: The width increases on focus when characters left are displayed
- 6bcee28: Updated dependencies

## 2.0.0

### Major Changes

- a8270ce: Separate styles
- 3cd9204: Prefix all custom properties

### Minor Changes

- a84fb50: [**`<mg-modal>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-modal--docs) rename hide property to hidden
- 631a96f: [**`<mg-messsage>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs) rename hide property to hidden
- 69bce84: move [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs) alerts features to a new component: [**`<mg-alert>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-alert--docs)
- 88b5d3b: `<mg-input-**>` add tooltip in readonly state

### Patch Changes

- 0ff869e: move [**`<mg-card>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-card--docs) variants to [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs)

## 1.3.6

### Patch Changes

- 4ee49fe: Update dependencies

## 1.3.5

### Patch Changes

- 2218c8b: [#496](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/496) mg-input-password: Prevent mg-icon style to be overridden

## 1.3.4

### Patch Changes

- 43f1421: update dependancies

## 1.3.3

### Patch Changes

- 5b5de24: [#486](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/486) mg-menu: error with itemmore config

## 1.3.2

### Patch Changes

- d674c81: Update dependencies

## 1.3.1

### Patch Changes

- 140a4ab: Update dependencies

## 1.3.0

### Minor Changes

- 227f361: [**`<mg-input-password>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-password--docs) add display password feature
- 9bc3223: [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) add mg-input component
- 215c537: [**`<mg-action-more>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-action-more--docs) [**`<mg-menu-item>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-menus-mg-menu-item--docs) auto add "open in new tab" icon for links that open in a new tab

### Patch Changes

- a8d2eea: Update dependencies
- fd7f36c: [#473](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/473) mg-modal - overflow-y crop shadow

## 1.2.2

### Patch Changes

- 92be1fc: [**`<mg-input-textarea>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-textarea--docs) render line-break in readonly

## 1.2.1

### Patch Changes

- 7a7e0ec: Update dependencies

## 1.2.0

### Minor Changes

- b022637: [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) Add possibility to display tooltip next to label
- c663987: [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) Add possibility to use Bootstrap behavior
- 0f8510e: [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) Add responsive behavior
- 99e1b92: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) use mg-input-\*\* readonly style
- 331ed0c: [**`<mg-form>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-form--docs) Add `label-on-top` prop.
- d72667f: [**`<mg-loader>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-loader--docs) add mg-loader component
- d360050: [**`<mg-input-toggle>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-toggle--docs) use mg-input-\*\* readonly style

### Patch Changes

- e4aea6b: [#368](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/368) mg-tooltip: content style should not inherit from parent
- b1d026a: Add prettier

## 1.1.1

### Patch Changes

- eb3b1ab: Update dependencies

## 1.1.0

### Minor Changes

- bb1cca4: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) update "select all" action to only apply select/unselect on filtered results

### Patch Changes

- 4cdca06: [#445](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/445) popover should not move when update values

## 1.0.2

### Patch Changes

- 223455f: [#442](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/442) mg-input-checkbox: after close of the popover should go back to first page

## 1.0.1

### Patch Changes

- 71d4e98: [#434](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/434) mg-item-more: console errors

## 1.0.0

### Major Changes

- b376c2e: Use @mgdis/styles package

### Minor Changes

- b376c2e: Set CSS pattern to our SCSS files to enforce a convention.

### Patch Changes

- b376c2e: [#399](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/399) mg-tag: review content vertical alignement
