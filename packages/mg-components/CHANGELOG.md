# @mgdis/mg-components

## 6.12.0

### Minor Changes

- 03ddc32: [**`<mg-table>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-table--docs) new style
- 3a3a131: [**`<mg-tag>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-tag--docs) update style: remove center alignement
- eba5178: [**`<mg-pagination>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-pagination--docs) add `messages` prop

### Patch Changes

- 3c89e9d: replace @mgdis/mg-components-helpers @mgdis/playwright-helpers and @mgdis/stencil-helpers dependences by @mgdis/core-ui-helpers
- 10c6605: Helper package release.
- b816cca: Update dependencies
- 6057c9e: update stencil lint config
- 17fb44b: [**`<mg-input-date>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-date--docs) & [**`<mg-input-numeric>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-numeric--docs) update min and max messages
- Updated dependencies [03ddc32]
- Updated dependencies [3c89e9d]
- Updated dependencies [3a3a131]
- Updated dependencies [10c6605]
- Updated dependencies [b816cca]
  - @mgdis/styles@2.7.0
  - @mgdis/core-ui-helpers@1.0.0
  - @mgdis/img@2.4.3

## 6.11.0

### Minor Changes

- a3201f0: [**`<mg-details>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-details--docs) manage empty summary on responsive
- 5055b10: [**`<mg-input-combobox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-combobox--docs) update buttons visibility ux

### Patch Changes

- 0436bf4: [#553](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/553) mg-input-combobox: fetch optimizations - url, errors, debounce, datas
- 3eed511: [#554](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/554) mg-input-select: check Validity with the new value (and not the old one)
- 8c91c21: create `formatID` utils
- 264048d: Update dependencies
- Updated dependencies [8c91c21]
- Updated dependencies [a3201f0]
- Updated dependencies [264048d]
- Updated dependencies [5055b10]
  - @mgdis/stencil-helpers@3.2.0
  - @mgdis/styles@2.6.0
  - @mgdis/img@2.4.2

## 6.10.1

### Patch Changes

- dc041e9: [#549](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/549) Lag caused by mg-tooltip since version 6.5.0
- de8f8bc: Update dependencies
- Updated dependencies [dc041e9]
- Updated dependencies [de8f8bc]
  - @mgdis/styles@2.5.1
  - @mgdis/stencil-helpers@3.1.1

## 6.10.0

### Minor Changes

- 09d02e3: [**`<mg-input-combobox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-combobox--docs) new component

### Patch Changes

- ef89eb4: Update dependencies
- f750498: Improve doc and remove lint warnings
- e1d2b09: [#542](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/542) mg-details: restrict click area on `<summary>` element
- 05aa7b6: [#550](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/550) mg-input-rich-text-editor: Error on build
- a010412: [#551](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/551) mg-input-numeric: Allow invalid value without triggering form error state
- bf3215f: [#549](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/549) Lag caused by mg-tooltip since version 6.5.0
- 1ff1809: [**`<mg-action-more>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-action-more--docs) set fullwidth on `<mg-divider>`
- Updated dependencies [ef89eb4]
- Updated dependencies [f750498]
- Updated dependencies [e1d2b09]
- Updated dependencies [09d02e3]
- Updated dependencies [bf3215f]
  - @mgdis/img@2.4.1
  - @mgdis/stencil-helpers@3.1.0
  - @mgdis/styles@2.5.0

## 6.9.0

### Minor Changes

- c412c78: Update stories and define default values
- 90f7959: Better consistency in mg-input-... that requires a specific format.

### Patch Changes

- b38953a: Storybook colors set right neutral indexes
- 0d14289: Update dependencies
- Updated dependencies [c412c78]
- Updated dependencies [0d14289]
- Updated dependencies [c412c78]
  - @mgdis/img@2.4.0
  - @mgdis/stencil-helpers@3.0.0
  - @mgdis/styles@2.4.1

## 6.8.0

### Minor Changes

- d674c7d: `mg-input-date|numeric`: add more informations in help text with min/max attributes
- 7846cf7: Add mg-table component
- 4697869: mg-input-text: add types
- 90afca8: mg-input-date: Add example in error message

### Patch Changes

- 96f9cf2: [#547](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/547) - mg-input-numeric: "-0" transformed into "0"
- 8e9e1b3: Update dependencies
- Updated dependencies [96f9cf2]
- Updated dependencies [7846cf7]
- Updated dependencies [8e9e1b3]
  - @mgdis/stencil-helpers@2.2.6
  - @mgdis/styles@2.4.0

## 6.7.0

### Minor Changes

- bb4982f: New icons

### Patch Changes

- 6c1a18c: [#532](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/532) mg-input-date: invalid date displays required error
- b0b26d5: [#469](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/469): mg-popover ajusted fallback placements and aria-expanded attribute
- Updated dependencies [bb4982f]
  - @mgdis/img@2.3.0
  - @mgdis/styles@2.3.1

## 6.6.1

### Patch Changes

- 2b349d8: mg-modal text color should inherit from parent
- d04ddfa: Update dependencies
- Updated dependencies [2b349d8]
- Updated dependencies [d04ddfa]
  - @mgdis/styles@2.3.1
  - @mgdis/stencil-helpers@2.2.5

## 6.6.0

### Minor Changes

- 0c556bb: [**`<mg-input-rich-text-editor>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-rich-text-editor--docs) new component
- 0b9a45e: Add icons and illustrations
- 0964f29: [**`<mg-illustrated-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-illustrated-message--docs) Update sizes ans spacings

### Patch Changes

- 7089d79: [#538](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/538) disable browser autocomplete
- a513c99: Update dependencies
- Updated dependencies [5e91701]
- Updated dependencies [0c556bb]
- Updated dependencies [0b9a45e]
- Updated dependencies [a513c99]
- Updated dependencies [0964f29]
  - @mgdis/styles@2.3.0
  - @mgdis/img@2.2.0
  - @mgdis/stencil-helpers@2.2.4

## 6.5.0

### Minor Changes

- 68ea6da: [chore] replace popper.js by floating-ui

### Patch Changes

- 48ed887: [#531](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/531) mg-menu: responsive issues on Chrome
- eb52aa3: [#390](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/390) mg-detail: summary and mg-button click event conflict
- b4d7191: [#536](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/536) mg-menu-item: safari crash
- 7aca391: [#2](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/2) mg-message : additional padding when mg-message is a direct child of a mg-panel
- 3fa417e: Update dependencies
- Updated dependencies [48ed887]
- Updated dependencies [7aca391]
- Updated dependencies [3fa417e]
  - @mgdis/styles@2.2.2
  - @mgdis/stencil-helpers@2.2.3

## 6.4.0

### Minor Changes

- b06743b: [**`<mg-popover>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-popover--docs) can be closed from element with "popovertargetaction" attribute

### Patch Changes

- 975aee1: [#528](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/528) mg-illustrated-message: svg illustration has bad size when direction="horizontal" is set
- 06412ab: [#526](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/526) mg-menu: sub-menu responsive not working
- c9cf4c6: [#532](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/532) Should display a badInput message on a required field with a non-existing date
- d5d6cdd: [#510](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/510) update validity when subtree is update
- 2d90802: Update dependencies
- 1d1cad4: [#529](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/529) mg-input-\*\*: field validity computation on programmatic change
- da655c4: [#533](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/533) notification-center : role alert on success messages
- 033533d: [#512](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/512) mg-input-date: clearing value with keyboard is not working on Chrome
- b9b31b4: [**`<mg-input-numeric>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-numeric--docs) display decimal places in error messages only when min/max values contain decimals
- Updated dependencies [975aee1]
- Updated dependencies [06412ab]
- Updated dependencies [2d90802]
- Updated dependencies [1d1cad4]
- Updated dependencies [e1fa2cd]
  - @mgdis/styles@2.2.1
  - @mgdis/stencil-helpers@2.2.2

## 6.3.0

### Minor Changes

- 8fd9456: [**`<mg-button>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs) added `size` prop.
- 398e781: [**`<mg-modal>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-modal--docs), [**`<mg-popover>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-popover--docs) and [**`<mg-alert>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-alert--docs) added `component-close` event.

### Patch Changes

- caffa47: Check dependencies
- e4dc545: [#524](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/524) mg-input-text: prevent input to shrink or expand with characters left count and provide enought place for the counter
- 5851a2c: update dependencies
- Updated dependencies [24f51d8]
- Updated dependencies [caffa47]
- Updated dependencies [8fd9456]
- Updated dependencies [e4dc545]
- Updated dependencies [5851a2c]
  - @mgdis/styles@2.2.0
  - @mgdis/img@2.1.2
  - @mgdis/stencil-helpers@2.2.1

## 6.2.0

### Minor Changes

- 462e909: [**`<mg-progress>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-progress--docs) add mg-progress component
- 47b5cf5: [**`<mg-input-numeric>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-numeric--docs) Add percent and unit format to mg-input-numeric
- c818bb0: [#508](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/508) mg-form: add method to reset form

### Patch Changes

- b194f5f: [#515](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/515) mg-input-checkbox: click on label does not send valid-input
- caa4498: [#519](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/519) auto-complete only works on html files
- 6f854b9: [#503](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/503) mg-button variant not updating when not explicitly set and displayed conditionally on Vue.js
- f73a81d: Updated dependencies
- 45e0c34: [#510](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/510) mg-form: when required mg-inputs are added to or removed from an already loaded mg-form, the validity check of the form is broken
- 0ddefc0: [#518](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/518) mg-form: mg-input elements are excluded
- Updated dependencies [459444d]
- Updated dependencies [f73a81d]
- Updated dependencies [462e909]
- Updated dependencies [47b5cf5]
  - @mgdis/styles@2.1.0
  - @mgdis/stencil-helpers@2.2.0
  - @mgdis/img@2.1.1

## 6.1.0

### Minor Changes

- fbbeb52: Add and update icons

### Patch Changes

- 3fc5d93: [#505](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/505) prevent DOM selectors to throw error
- b9f04db: [#504](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/504) mg-input-text the required indicator is not updated on dynamic "required" change
- 6bcee28: Updated dependencies
- 06e3aed: Rename config dependencies
- Updated dependencies [539d514]
- Updated dependencies [772b442]
- Updated dependencies [b4c8f16]
- Updated dependencies [a2875ae]
- Updated dependencies [5920894]
- Updated dependencies [6bcee28]
- Updated dependencies [fbbeb52]
- Updated dependencies [06e3aed]
  - @mgdis/styles@2.0.1
  - @mgdis/stencil-helpers@2.1.0
  - @mgdis/img@2.1.0

## 6.0.0

### Major Changes

- a8270ce: Separate styles
- 4edae4d: [**`<mg-button>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs) - remove identifier prop
- 3cd9204: Prefix all custom properties
- c2f33b8: remove question-circle icon
- 9e1d5c6: [**`<mg-action-more>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-action-more--docs) items icon variant can be defined.
- a84fb50: [**`<mg-modal>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-modal--docs) rename hide property to hidden
- fb3aec6: Renammed display-character-left prop to character-left-hide.
- 0ff869e: move [**`<mg-card>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-card--docs) variants to [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs)
- 631a96f: [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs) rename hide property to hidden
- 69bce84: move [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs) alerts features to a new component: [**`<mg-alert>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-alert--docs)
- 17b6aca: mg-input-numeric's currency type has been removed in favor of the format prop.
- 2678968: [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs) rename `variant-style` `fill` value to `background`

### Minor Changes

- 525e9ed: Component validation error messages contain the passed value.
- 7899249: [**`<mg-tooltip>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-tooltip--docs) automate popper.js strategy setting
- 3ccbb15: [**`<mg-input-text>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-text--docs) `datalistoptions` prop can handle `OptionType[]`
- 7e36d34: [**`<mg-action-more>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-action-more--docs) add divider between items
- f1e98e7: mg-input-checkbox: add `localeMessages` prop
- 2fbeeee: [**`<mg-tooltip>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-tooltip--docs) `<mg-tabs>` remove document|window listener on disconnectedCallback
- 2c6ee2f: [**`<mg-badge>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-badge--docs) Only alphabetical characters are excluded
- 88b5d3b: `<mg-input-**>` add tooltip in readonly state

### Patch Changes

- 74ed81b: Remove `@stencil-community/ban-exported-const-enums` linting rule override
- ab2224b: Add CSS code completion
- Updated dependencies [a8270ce]
- Updated dependencies [3cd9204]
- Updated dependencies [c2f33b8]
- Updated dependencies [525e9ed]
- Updated dependencies [2a72803]
- Updated dependencies [a84fb50]
- Updated dependencies [fb3aec6]
- Updated dependencies [b2a0a03]
- Updated dependencies [0ff869e]
- Updated dependencies [ab2224b]
- Updated dependencies [f1e98e7]
- Updated dependencies [631a96f]
- Updated dependencies [69bce84]
- Updated dependencies [88b5d3b]
  - @mgdis/styles@2.0.0
  - @mgdis/img@2.0.0
  - @mgdis/stencil-helpers@2.0.0

## 5.29.0

### Minor Changes

- b8a9428: linting: disabled eslint "no-redundant-roles" rule

### Patch Changes

- 2fad542: update dependencies
- e2100d2: [#501](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/501) mg-input-radio: readonly display value
- Updated dependencies [2fad542]
  - @mgdis/stencil-helpers@1.1.9

## 5.28.2

### Patch Changes

- 9c9620c: update dependencies
- Updated dependencies [9c9620c]
  - @mgdis/stencil-helpers@1.1.8

## 5.28.1

### Patch Changes

- Updated dependencies [4ee49fe]
  - @mgdis/stencil-helpers@1.1.7
  - @mgdis/styles@1.3.6

## 5.28.0

### Minor Changes

- 0d73023: [#495](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/495) mg-input-password: add maxlength prop

### Patch Changes

- c567b43: update dependencies
- 95cbe02: [#494](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/494) mg-menu: responsive sub-menu click didn't work
- 2218c8b: [#496](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/496) mg-input-password: Prevent mg-icon style to be overridden
- Updated dependencies [c567b43]
- Updated dependencies [2218c8b]
  - @mgdis/stencil-helpers@1.1.6
  - @mgdis/img@1.7.3
  - @mgdis/styles@1.3.5

## 5.27.4

### Patch Changes

- 43f1421: update dependancies
- 8343e1e: [#484](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/484) mg-tooltip: `<mg-button disable-on-click />` with tooltip forced position
- 1e8734b: [#492](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/492) mg-input-date: Invalid help text when using UTC-x timezone
- c8ff48e: [#490](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/490) mg-input-checkbox: the error message must not be shown when clicking on the checkbox label
- Updated dependencies [43f1421]
- Updated dependencies [1e8734b]
  - @mgdis/stencil-helpers@1.1.5
  - @mgdis/styles@1.3.4
  - @mgdis/img@1.7.2

## 5.27.3

### Patch Changes

- 5b5de24: [#486](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/486) mg-menu: error with itemmore config
- 3bb7043: [#485](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/485) mg-menu: sub-item repositionning mistake
- 253c7a6: Update dependencies
- Updated dependencies [5b5de24]
- Updated dependencies [38ba699]
- Updated dependencies [253c7a6]
  - @mgdis/styles@1.3.3
  - @mgdis/stencil-helpers@1.1.4

## 5.27.2

### Patch Changes

- d674c81: Update dependencies
- Updated dependencies [d674c81]
  - @mgdis/stencil-helpers@1.1.3
  - @mgdis/styles@1.3.2

## 5.27.1

### Patch Changes

- 17399c8: [#477](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/477) mg-menu - item-more menu content doesn't stay in sync with main menu content
- 3f8fbfa: [#480](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/480) mg-input-date: Display message on invalid value pattern
- f228d36: [#479](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/479) mg-input-date: input size change depending on props 'max' presence
- 0c93b4e: [#484](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/484) mg-tooltip: Glitch with `<mg-button disable-on-click />`
- 28b0455: [#482](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/482) mg-input-numeric: "0" are not displayed in decimal
- 140a4ab: Update dependencies
- f1f76dc: [**`<mg-input-password>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-password--docs) add missing aria pattern
- 3d998cc: [#483](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/483) mg-input-date: Input valid event is not correct when clearing field
- Updated dependencies [28b0455]
- Updated dependencies [140a4ab]
  - @mgdis/stencil-helpers@1.1.2
  - @mgdis/styles@1.3.1

## 5.27.0

### Minor Changes

- ad35587: Add icon type
- 227f361: [**`<mg-input-password>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-password--docs) add display password feature
- 9bc3223: [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) add mg-input component
- 215c537: [**`<mg-action-more>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-action-more--docs) [`<mg-menu-item>`](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-menus-mg-menu-item--docs) auto add "open in new tab" icon for links that open in a new tab

### Patch Changes

- 208d83c: [#476](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/476) Stop search event propagation
- a8d2eea: Update dependencies
- 1c07c3b: [#474](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/474) clearly define optional props
- Updated dependencies [a8d2eea]
- Updated dependencies [227f361]
- Updated dependencies [fd7f36c]
- Updated dependencies [9bc3223]
- Updated dependencies [215c537]
  - @mgdis/stencil-helpers@1.1.1
  - @mgdis/styles@1.3.0

## 5.26.0

### Minor Changes

- a4091b3: Provide autocompletion

### Patch Changes

- fbdf99a: Update dependencies
- Updated dependencies [a4091b3]
- Updated dependencies [fbdf99a]
  - @mgdis/stencil-helpers@1.1.0
  - @mgdis/img@1.7.1
  - @mgdis/styles@1.2.2

## 5.25.2

### Patch Changes

- 92be1fc: [**`<mg-input-textarea>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-textarea--docs) render line-break in readonly
- Updated dependencies [92be1fc]
  - @mgdis/styles@1.2.2

## 5.25.1

### Patch Changes

- d6a9e03: Update dependencies
- Updated dependencies [d6a9e03]
  - @mgdis/stencil-helpers@1.0.4

## 5.25.0

### Minor Changes

- 1cab7cf: Add icons

### Patch Changes

- 7a7e0ec: Update dependencies
- 1e3a230: [#446](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/446) mgInputToggle: prevent erreur when options can't be set
- Updated dependencies [7a7e0ec]
- Updated dependencies [1ba2d2a]
- Updated dependencies [1cab7cf]
- Updated dependencies [1cab7cf]
- Updated dependencies [2ed265a]
  - @mgdis/stencil-helpers@1.0.3
  - @mgdis/styles@1.2.1
  - @mgdis/img@1.7.0

## 5.24.0

### Minor Changes

- b022637: [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) Add possibility to display tooltip next to label
- c663987: [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) Add possibility to use Bootstrap behavior
- 0f8510e: [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) Add responsive behavior
- 99e1b92: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) use mg-input-\*\* readonly style
- 331ed0c: [**`<mg-form>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-form--docs) Add `label-on-top` prop.
- d72667f: [**`<mg-loader>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-loader--docs) add mg-loader component
- d360050: [**`<mg-input-toggle>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-toggle--docs) use mg-input-\*\* readonly style
- b9938ee: [**`<mg-input-numeric>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-numeric--docs) Add format prop

### Patch Changes

- e4aea6b: [#368](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/368) mg-tooltip: content style should not inherit from parent
- 495fec2: [#461](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/461) mg-input-date: badInput message show an unwanted date 1900-01-01
- d698fe4: Add input documentation for detailed information on using regular expressions in components.
- 80eecca: [#444](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/444) mg-form: aria-role isn't permit by axe-core
- c87d711: Update dependencies
- Updated dependencies [b022637]
- Updated dependencies [e4aea6b]
- Updated dependencies [c663987]
- Updated dependencies [0f8510e]
- Updated dependencies [99e1b92]
- Updated dependencies [331ed0c]
- Updated dependencies [d72667f]
- Updated dependencies [d360050]
- Updated dependencies [b1d026a]
- Updated dependencies [c87d711]
  - @mgdis/styles@1.2.0
  - @mgdis/stencil-helpers@1.0.2

## 5.23.2

### Patch Changes

- eb3b1ab: Update dependencies
- Updated dependencies [eb3b1ab]
  - @mgdis/stencil-helpers@1.0.1
  - @mgdis/styles@1.1.1
  - @mgdis/img@1.6.1

## 5.23.1

### Patch Changes

- 9afcd05: [#457](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/457) mg-input-\*\* : update error messages after min or max change
- 4052b52: [#458](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/458) mg-components: missing style files in dist

## 5.23.0

### Minor Changes

- e48bd9c: [**`<mg-input-date>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-date--docs) add default help-text with pattern based on user OS

### Patch Changes

- 71fd1ce: [#456](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/456) mg-input-checkbox: when type is undefined between 5 and 10 we still have the search bar
- 32a99cf: [#452](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/452) mg-modal focus trap error
- Updated dependencies [50174ed]
  - @mgdis/stencil-helpers@1.0.0

## 5.22.0

### Minor Changes

- bb1cca4: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) update "select all" action to only apply select/unselect on filtered results

### Patch Changes

- 4cdca06: [#445](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/445) popover should not move when update values
- Updated dependencies [bb1cca4]
- Updated dependencies [4cdca06]
  - @mgdis/styles@1.1.0

## 5.21.1

### Patch Changes

- 223455f: [#442](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/442) mg-input-checkbox: after close of the popover should go back to first page
- cfc3767: [#441](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/441) mg-input-checkbox: mg-popover does not close when click outside popover content and on mg-input-checkbox element (ex: label)
- Updated dependencies [223455f]
  - @mgdis/styles@1.0.2

## 5.21.0

### Minor Changes

- 61e9536: [#436](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/436) mg-form: add props `requiredMessage` to manage the "required message" display
- 255c878: [#438](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/438) mg-form: add role on `<form />` element

### Patch Changes

- 71d4e98: [#434](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/434) mg-item-more: console errors
- Updated dependencies [1cc5669]
- Updated dependencies [71d4e98]
  - @mgdis/img@1.6.0
  - @mgdis/styles@1.0.1

## 5.20.0

### Minor Changes

- b72c283: [**`<mg-menu>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-menus-mg-menu--docs) remove beta status
- 0a6a144: [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs) add "no-aria-role" prop
- d4f6545: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) reverse button and display values positions

### Patch Changes

- 109d113: [#423](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/423) apps: missing stencil demo app
- 4eb2690: [#424](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/424) mg-components: test error with components.utils createID
- 8bfae84: [421](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/421) mg-components: when upgrade stencil >=4.5.0 build is broken
- c4a9df3: [#431](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/431) mg-input-checkbox : in multi when no result on search, missing accent on e
- Updated dependencies [ebdeb20]
  - @mgdis/img@1.5.0
  - @mgdis/styles@1.0.0

## 5.19.3

### Patch Changes

- 558821cc: add Figma import script
- 621d77a7: [#412](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/412) mg-action-more: a mg-action-more not closing himself when clicking on another mg-action-more
- 68e5fee4: [#419](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/419) mg-input-checkbox: multi missing vocal link between legend and button add values
- b5acc121: [#408](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/408) mg-input-\*\* : 'input-valid' event triggerd even if no change
- b2f17ad0: [#417](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/417) mg-input-checkbox: console error with display-values=true and unset type
- c76e3048: [#403](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/403) mg-button does not submit native `<form>`
- 35b3260f: [#415](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/415) mg-action-more: main button can be disabled
- Updated dependencies [558821cc]
  - @mgdis/img@1.4.0

## 5.19.2

### Patch Changes

- 4e31332: fix @5.19.1 build

## 5.19.1

### Patch Changes

- d19f944: [#404](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/404) mg-input-toggle: Add setError public method
- aadb89e: [#410](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/410) mg-pagination: Missing "role=navigation"
- 271a171: [#409](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/409) mg-input-title : in readonly mode the components should not use a label or a fieldset
- 8e0171f: [#398](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/398) e2e: move mg-menu tests to playwright to improve stability
- 3bcb8d6: [#383](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/383) mg-input-\*: add the aria-invalid attribut

## 5.19.0

### Minor Changes

- b376c2e: Set CSS pattern to our SCSS files to enforce a convention.
- b376c2e: Use @mgdis/styles package
- b376c2e: [**`<mg-input-text>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-text--docs) add datalist type

### Patch Changes

- b376c2e: [#391](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/391) mg-components: vitejs build incompatibility
- b376c2e: [#388](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/388) refacto: use isValidText utils fonction where text need validation type with trim
- b376c2e: [#395](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/395) e2e: move mg-popover tests to playwright to improve stability
- b376c2e: [#396](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/396) mg-input-checkbox: emit updated value with all keys present at the prop initatilization
- b376c2e: [#399](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/399) mg-tag: review content vertical alignement
- b376c2e: [#393](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/393) mg-input-checkbox [muli]: search must not be case sentive with special caraters (ex: accents)
- b376c2e: [#387](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/387) mg-tabs: active-tab prop does not match displayed style
- Updated dependencies [b376c2e]
- Updated dependencies [b376c2e]
- Updated dependencies [b376c2e]
  - @mgdis/styles@1.0.0

## 5.18.0

### Minor Changes

- 1d96c0e: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) use automatic type only when prop 'type' is undefined

### Patch Changes

- 272294b: [#384](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/384) popperjs: some elements are displayed out of the page and are not reachable
- 25f448f: [#378](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/378) mg-popover - mg-tooltip: impossible to condition the display mg-\*\*-content with a if on base component
- f9f70e8: [#362](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/362) mg-input-\*\*: Enable customisation of errors

## 5.17.0

### Minor Changes

- 9336e2b: Add and update icons

### Patch Changes

- b078027: [#28](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/28) chore: upgrade Stenciljs to v4
- 7035494: [#371](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/371) mg-action-more : follow documentation for a hidden icon when label is visible
- Updated dependencies [9336e2b]
  - @mgdis/img@1.3.0

## 5.16.0

### Minor Changes

- 6a55650: Add and update icons

### Patch Changes

- 32ab855: [#352](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/352) mg-tooltip: tabindex should be set to -1 or removed when tooltip is disabled
- b36bfc4: [#334](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/334) mg-item-more: role can't be menuitem
- 4707858: [#355](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/355) doc - mg-input-checkbox update documentation
- 59afdac: [#359](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/359) [dist] Could not resolve '../../../../assets/icons'
- 24037d8: [#364](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/364) mg-modal: add role type
- 541c6e0: [#361](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/361) [e2e] mg-action-more & mg-item-more move e2e to playwright to improve test stability
- 1afda44: [#354](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/354) mg-modal: No scrollbar while using ng-if on mg-modal
- 5a7840f: [#329](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/329) mg-popover & mg-tooltip: mistake in aria-controls pattern
- fbd5d74: [#357](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/357) mg-menu: problems with tabulation
- bf80f2c: [#360](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/360) mg-button inside a mg-tooltip: tooltip is not hidden after click
- 6a8b594: [#356](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/356) mg-action-more: chevron does not go back to its initial position if we click outside if opened
- Updated dependencies [6a55650]
  - @mgdis/img@1.2.0

## 5.15.0

### Minor Changes

- c4cc4ef: Add icons

### Patch Changes

- e603900: [#350](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/350) mg-form: Required fields should include the readonly inputs in its display condition
- Updated dependencies [c4cc4ef]
  - @mgdis/img@1.1.0

## 5.14.0

### Minor Changes

- 150e0ac: [**`<mg-pagination>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-pagination--docs) display pagination only when total page is higher than 1
- 0ccdc22: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) hide pagination when section is not expanded

### Patch Changes

- f7d792f: [#347](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/347) mg-panel / mg-detail - stabilize e2e test
- 79211b5: [#93](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/93) mg-form - Reload the page on form submission
- 75e94a0: [#348](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/348) mg-component - e2e test can't resolve icons assets path
- 272925a: [#343](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/343) mg-input-select: mg-width 2 and 4 not working
- 928bb0e: [#342](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/342) [Firefox] mg-modal: keep focus on modal

## 5.13.1

### Patch Changes

- ca7aa7c: [#313](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/313) lint: create rule to set tsdoc mandatory
- 1b13754: [#344](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/344) mg-icon - SVG are not displayed on safari
- a6a9fab: [#346](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/346) [storybook] - actions not catch in stories dedicated section
- 682a446: [#345](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/345) mg-input-checkbox: i18n not rendering for navigator configured in french

## 5.13.0

### Minor Changes

- 2ebd1c0: [**`<mg-panel>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-panel--docs) display collapse-button on right and only with icon
- 588abac: [**`<mg-tabs>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-tabs--docs) add default header border-bottom CSS variable
- f5a5573: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) update story
- 817b604: Update components documentation
- 1e0ee14: Move to Storybook v7
- ad2a2d5: [**`<mg-pagination>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-pagination--docs) fix pagination test snapshot
- 54c7417: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) add "search" sections
- 03b77fa: Storybook blocks improvements.
- c31ce30: fix renderProperties with id ("#") in selector

### Patch Changes

- dd2f1a1: [#334](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/334) mg-menu: role can't be menu/menubar/menuitem

## 5.12.1

### Patch Changes

- c433c00: [**`<mg-details>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-details--docs) update media query

## 5.12.0

### Minor Changes

- 354ea9a: [**`<mg-details>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-details--docs) hide summary text when width is under 600px and add variable to customize space between summary and details
- 0fc473e: Add `<small/>` style typography
- 4e5ef64: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) add search input in "multi" mode
- a4c96b1: use @mgdis/img package
- 2d7d7b2: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) add "display-values" props

### Patch Changes

- Updated dependencies [642e65d]
  - @mgdis/img@1.0.0

## 5.11.1

### Patch Changes

- d871fe9: [#328](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/328) mg-popover: popover not display on chrome 114

## 5.11.0

### Minor Changes

- 1d7137d: [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs) add "multi" type behavior

### Patch Changes

- 4c3ff1a: [#322](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/322) mg-tooltip : click on the tooltip button, leave the hover zone, press ESCAPE, the tooltip is no longer displayed on hover

## 5.10.1

### Patch Changes

- 7ade01a: [#319](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/319) Remame `classList` state to `classCollection` inside components.
- 88990ad: [#312](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/312) lint: resolve tsdoc linting warning
- e80af1f: [#318](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/318) Mg-input-text: size of mg-width not reactive
- 38f200c: [#311](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/311): mg-input-numeric: when you want to enter a negative value in mg-input-numeric the minus is not taken

## 5.10.0

### Minor Changes

- ae30a37: [#300](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/300) chore: use playwright in mg-components e2e tests

### Patch Changes

- 678d38f: [#301](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/301) chore(mg-components): implement monorepo linting

## 5.9.1

### Patch Changes

- 484ada7: - [#296](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/296) mg-tooltip: when hovering over the mg-tooltip, then ECHAP, undisplay the tooltip
- 609d520: [#308](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/308) mg-action-more - update storybook controls
- e7d07a2: - [#302](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/302) mg-input-numeric: checkValidity is trigger even if a blank field is not required

## 5.9.0

### Minor Changes

- 5a18625: [**`<mg-popover>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-popover--docs) add max-width CSS variable.
- 5c8001b: [**`<mg-card>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-card--docs) add `variant` and `variantStyle` props
- b4b8c1b: Added variants to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).
- 9ae6765: Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).
- d382117: [**`<mg-details>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-details--docs) use small "chevron" icon

## 5.8.2

### Patch Changes

- e39307a: [#265](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/265) mg-menu: responsive menu does not accept click events in vue 3

## 5.8.1

### Patch Changes

- [#233](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/233) mg-form - Reload the page on form submission
- [#256](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/256) mg-select - show href when readonly
- [#269](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/269) mg-menu: itemMore property must be in small caps

## 5.8.0

### Minor Changes

- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).

### Patch Changes

- [#249](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/249) v5.6.0 : error on build
- [#258](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/258) mg-button: disable-on-click do not work when the disable state change in the fonction called by on-click
- [#259](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/259) mg-menu: responsive menu duplicates ids on mg-menu-item
- [#260](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/260) mg-menu: responsive menu does not update if button labels
- [#261](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/261) mg-tooltip: tooltip always displayed with button and ng-disable
- [#264](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/264) mg-tooltip: display bug on positioning when text is modified
- [#268](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/268) mg-menu: menu is closed on click

## 5.7.0

### Minor Changes

- [**`<mg-action-more>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-action-more--docs) new component
- [**`<mg-pagination>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-pagination--docs) Add prop `hideNavigationLabels` to hide "next/previous" labels in navigation.
- [**`<mg-form>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-form--docs) Update required message when single.
- Set opacity to 40% on `<mg-input-*>` and `<mg-button>` when disabled.

### Patch Changes

- [#196](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/196) chore: remove doc folders from build
- [#206](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/206) mg-modal - storybook errors
- [#241](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/241) mg-tooltip: hide tooltip on blur event
- [#245](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/245) mg-menu: set color of '+' badge to match menu color
- [#247](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/247) mg-input-date accepts invalid dates
- [#250](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/250) `list-style: none;` in CSS removes the list semantics
- [#252](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/252) mg-popover: need to reposition poper instance when content size change
- [#253](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/253) mg-button: focus state should be different from hover state

## 5.6.0

### Minor Changes

- [**`<mg-menu>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-menus-mg-menu--docs) Add overflow behavior.
- [**`<mg-tooltip>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-tooltip--docs) Add `max-width`.
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).
- Locale methods are now exported

### Patch Changes

- [#161](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/161) mg-tabs - default active status
- [#172](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/172) build - export CSS and SCSS files for mg-buisness components
- [#194](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/194) mg-tooltip: hide when mouseover and ESC pressed
- [#201](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/201) mg-illustrated-message: allow svg to be inserted dynamically
- [#202](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/202) mg-input-date - remove date
- [#207](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/207) mg-badge color in mg-tabs
- [#208](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/208) mg-illustrated-message: set aria-hidden on "illustration" slot (accessibility)
- [#209](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/209) mg-tabs: rework tabindex (accessibility)
- [#210](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/210) mg-message - The delay should start only when the component is not focused
- [#213](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/213) mg-tab: allow mg-badge to be outlined
- [#219](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/219) mg-popover - add a shadow to the "triangle"
- [#220](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/220) mg-tag - variant soft should use normal font-weight
- [#223](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/223) mg-skip-links: allow items to not have links
- [#224](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/224) mg-popover: not abled to click on buttons inside
- [#225](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/225) mg-popover: close button disappeared when mg-popover is disabled
- [#226](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/226) mg-tabs / mg-menu-item : selected state should not have the same ui as hover state
- [#227](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/227) mg-popover in an iframe : doesn't close if you click outside the iframe
- [#228](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/228) mg-popover: is stick to the frame border
- [#230](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/230) mg-panel: don't set mg-card variables to the host component
- [#231](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/231) mg-button: don't use --mg-button-border-radius variable on link variant
- [#235](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/235) mg-tooltip - arrow disappear after update message
- [#240](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/240) mg-menu - event in overflow menu don't dispatch
- [#242](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/242) mg-components.css exports also elements style

## 5.5.1

### Patch Changes

- use of `pnpm` in Github actions to publish lib on npm

## 5.5.0

### Minor Changes

- [**`<mg-skip-links>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-skip-links--docs) new component
- Move to Node 18
- [**`<mg-tag>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-tag--docs) Add `soft` props and `<mg-icon>` display rules.
- [**`<mg-button>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs) added `link` variant.
- [**`<mg-illustrated-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-illustrated-message--docs) max-height set to 184px in regular size.

### Patch Changes

- [#205](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/205) mg-menu-item: export click event
- [#215](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/215) mg-panel: header right items vertical alignment

## 5.4.0

### Minor Changes

- [**`<mg-badge>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-badge--docs) allows to add a `+` character after number.
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).
- Remove CSS animations if the user has requested that the system minimize the amount of non-essential motion it uses (`prefers-reduced-motion`).

### Patch Changes

- [#197](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/197) mg-button - Action can be triggered with a disabled button (the return)
- [#200](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/200) mg-item and mg-menu-item: errors on AngularJS

## 5.3.0

### Minor Changes

- [**`<mg-menu>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-menus-mg-menu--docs) new component **BETA**
- [**`<mg-menu-item>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-menus-mg-menu-item--docs) new component **BETA**
- [**`<mg-tabs>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-tabs--docs) Update component spacings.

## 5.2.0

### Minor Changes

- [**`<mg-form>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-form--docs) Does not display required message when all fields are required but disabled or in readonly.
- **`<mg-input-*>`** Does not display asterisk when required but disabled or in readonly.

### Patch Changes

- [#165](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/165) mg-input-numeric: non-responsive input
- [#177](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/177) mg-input-select and mg-input-date both cast nullish value to another type and produce an error in the process
- [#181](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/181) mg-input - delete error message when field validation rules changes
- [#182](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/182) mg-form: required field info is displayed even when all the mg-input are readOnly
- [#183](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/183) mg-form: when a required mg-input is added to an already loaded mg-form, it is not taken into account for the validity check of the form
- [#193](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/193) mg-modal - cover mutation observer callback lines

## 5.1.0

### Minor Changes

- [**`<mg-card>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-card--docs) new component
- [**`<mg-divider>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-divider--docs) new component
- [**`<mg-button>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs) added `full-width` property.
- [**`<mg-details>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-details--docs) added `hide-summary` property to hide summary text.
- [**`<mg-popover>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-popover--docs) enable close button even if disabled.

### Patch Changes

- [#155](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/155) mg-popover - scrolls with page when over a modal and on Firefox
- [#186](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/186) mg-modal - keyboard navigation allows to select background elements

## 5.0.0

### Major Changes

- `mg-button`, `mg-tooltip` and `mg-popover` components use now [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).  
  This might create some a11y issues but it fix all the issues we have with AngularJS.  
  The use of the [mg-text-content angularJS directive](http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-text-content-angular) is not necesary anymore.
- `mg-button` accessibility properties (expanded, controls, haspopup) have been removed, they now must be set on the component (aria-expanded, aria-controls, aria-haspopup) as a regular button.
- Components with missing mandatory props won't render and will throw an error.
- No more `variables.scss` export, only `variables.css`.

### Minor Changes

- [**`<mg-illustrated-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-illustrated-message--docs) can be displayed horizontally.
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).

### Patch Changes

- [#154](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/154) mg-button: Unexpected behavior when displayed conditionally
- [#158](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/158) mg-tooltip: child component interpolation does not work under ng-repeat directive

## 4.2.1

### Minor Changes

- Better checks on mandatory props **but does not throw error for now**, will be back on next major.
- Added minimum AngularJS version tu use with the lib.

### Patch Changes

- [#155](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/155) mg-popover: scrolls with page when over a modal and on Firefox

## 4.2.0

### Minor Changes

- Add available variables in components documentation.
- Better checks on mandatory props.

### Patch Changes

- [#150](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/150) mg-tabs - header does not use desired font
- [#156](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/156) version 4.1.1: misc problems
- [#157](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/157) mg-input-text: characters left are displayed outside of the input field when the content does not respect the validation pattern
- [#159](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/159) mg-components fails when a component is imported directly

## 4.1.1

### Patch Changes

- [#154](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/154) mg-button: Unexpected behavior when displayed conditionally

## 4.1.0

### Minor Changes

- [**`<mg-details>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-details--docs) new component
- [**`<mg-illustrated-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-illustrated-message--docs) new component
- Storybook component code example improvements:
  - boolean true values are displayed without the empty String: `=""`
  - when a props is using its default value the attribute is not displayed
  - when a component has object props we display a message to remind it won't be rendered
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).

### Patch Changes

- [#114](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/114) AngularJS components are not rendered correctly within ng-if nor ng-repeat
- [#123](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/123) mg-popover scroll with the page in the modal
- [#128](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/128) mg-form does not tolerate when it's child `<mg-input>` DOMelements are dynamicly constructed with Vue's `<component>` directive
- [#131](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/131) mg-form - make it possible to define the spacing
- [#132](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/132) Using icons in input help text result in unintended line breaks
- [#137](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/137) mg-button cannot be configured to not submit the parent form
- [#144](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/144) mg-input-toggle - impossible to set value as false on second item
- [#148](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/148) tooltip need to stay on hover

## 4.0.1

### Patch Changes

- Fix classes problem in [**`<mg-panel>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-panel--docs)
- Remove exports from `package.json`

## 4.0.0

### Major Changes

- Drop IE support 🍾
- Library default language is now `en`, with matching currency `USD`.
- Rename **`<mg-input-*>`** `width` property to `mg-width` to prevent a11y audit feedback.
- Removed **`<mg-character-left>`** `template` attribute, component new design (e.g. 400/400) does not need it anymore. **`<mg-input-text>`** and **`<mg-input-textarea>`** matching attribute `character-left-template` is also removed.
- **`<mg-icon>`** icon `arrows-rotate` renamed to `arrows-rotate-backward`

### Minor Changes

- **PDA9 Specs are now in our Storybook.**
- **i18n**: messages are availables in english and french. Based on the `lang` attribute.
- **`<mg-input-*>`**
  - Changed **`<mg-input-*>`** error behavior.
  - Content default alignment can be changed using `--mg-inputs-text-align` CSS variable.
- Changed danger color to `#db1f29`.
- Added `resizable` props on [**`<mg-input-textarea>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-textarea--docs).
- Added `small` (12px) icon size to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).
- [**`<mg-button>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs) border color can be changed using CSS variables.
- Changed backdrop color opacity on [**`<mg-modal>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-modal--docs)
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs).
- Changed required message font size on [**`<mg-form>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-form--docs)
- Changed **`<mg-character-left>`** layout
- Added [documentation about CSS variable](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/style-custom-properties--docs)

### Patch Changes

- [#109](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/109) mg-tag : Possibility to dynamically change variant and outline
- [#111](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/111) Add a way to remove border from mg-button's primary colors
- [#116](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/116) Select input handle value fail when value is undefined
- [#118](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/118) mg-button :variant does not change

## 3.3.0

### Minor Changes

- [**`<mg-panel>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-panel--docs)
  - Added `expanded-change` event
  - Added `title-pattern`, `title-pattern-error-message` and `expand-toggle-disabled` props
  - Changed edit button variant
- [**`<mg-tabs>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-tabs--docs)
  - Added `active-tab-change` event
  - Changed font sizes
- Added `success` variant on [**`<mg-button>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs)
- Changed backdrop color on [**`<mg-modal>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-modal--docs)
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs)

### Patch Changes

- [#94](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/94) Accessibility issues on multiple components
- [#105](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/105) mg-panel: Adapt left part of the component

## 3.2.0

### Minor Changes

- [**`<mg-form>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-form--docs)
- [**`<mg-modal>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-modal--docs)
- [**`<mg-panel>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-panel--docs)
- Added `size` to [**`<mg-tabs>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-tabs--docs)
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs)
- Components events are now displayed in Storybook
- Removed the `not-allowed` cursor on disabled components
- E2E test screenshots no longer allow difference pixels

### Patch Changes

- [#76](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/76) CSS buttons does not have space with icons anymore
- [#77](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/77) mg-input-numeric : Component not re render when value is updated
- [#79](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/79) Impossible d'afficher les mg-input en erreur au moment de la souscription
- [#82](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/82) mg-popover triangle is visible
- [#83](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/83) Cross icon does not appears on html messages
- [#84](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/84) Évenement value-change de mg-input-checkbox et composant parent
- [#86](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/86) possibilité de rendre disable le composant mg-tabs
- [#88](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/88) make mg-input-select max-width 100%
- [#89](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/89) mg-button disable-on-click does not display loader while disabled

## 3.1.0

### Minor Changes

- Library is now available from a public CDN (https://cdn.jsdelivr.net/npm/@mgdis/mg-components/)

## 3.0.0

### Major Changes

- Components properties are not reflected anymore to prevent errors with boolean values. For exemple to change the disabled property of a component in Vue.js you can do `disabled.prop="maVarDisabled"`.

### Minor Changes

- [**`<mg-popover>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-popover--docs)
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs)
- Added `component-hide` & `component-show` events on [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs)
- Added `width` attribute on `<mg-input-...>` to override default behavior
- Added `append-input` slot on `<mg-input-numeric>` & `<mg-input-text>`
- Added `type` and `icon` attributes on [**`<mg-input-text>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-text--docs) to get an a search input

### Patch Changes

- [#44](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/44) Read ISO 8601 date-time format with mg-input-date
- [#46](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/46) mg-pagination - Missing currentPage change event
- [#47](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/47) mg-tabs content display Firefox dotted border when clicked
- [#48](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/48) Control on mg-input-date-field
- [#49](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/49) mg-badge - change padding to 4px horizontal
- [#50](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/50) Storybook - remove semicolon at the end of code example
- [#51](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/51) Toggle component value
- [#52](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/52) Add the possibility to remove the placeholder option in a mg-input-select
- [#53](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/53) Change the type of SelectOption.value
- [#56](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/56) mg-input-date - "effacer" displays error in console and value can't be retrieved
- [#59](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/59) Impossible de récupérer la validité d'un composant mg-input après @blur ou @value-change
- [#61](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/61) mg-button : action can be triggered with a disabled button (fix of the fix)
- [#67](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/67) Composant mg-input-xxxx en erreur même si il est readOnly ou required
- [#68](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/68) mg-input-toggle Le style appliqué ne correspond pas a la valeur renseignée au premier rendu

## 2.1.0

### Minor Changes

- [**`<mg-pagination>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-pagination--docs)
- [**`<mg-tabs>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-tabs--docs)
- [**`<mg-badge>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-badge--docs)
- In addition to the `SCSS`, variables are now also available with a `CSS` file.
- Added icons to [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs)

### Patch Changes

- [#35](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/35) mg-input-password does not take all available space
- [#36](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/36) Value-changed event is call twice when toggle is switch on
- [#37](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/37) Align text into inputs
- [#38](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/38) Remove animation text on mg-input-toggle
- [#39](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/39) Tooltip placement with label-on-top and .mg-form-group
- [#40](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/40) Make link with .mg-button class look like a button
- [#41](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/41) mg-button disable-on-click load again after being set to disable
- [#42](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/42) mg-tooltip does not display on disabled mg-button

## 2.0.0

### Major Changes

- [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs)
  - icons names changed following naming convention described in [PDA9-744](https://jira.mgdis.fr/browse/PDA9-744)
  - icons sizes are now `regular` (default), `large` and `extra-large`
- Custom event names are now in kebab-case: `valueChange` changed to `value-change`

### Minor Changes

- [**`<mg-input-checkbox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-checkbox--docs)
- [**`<mg-input-password>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-password--docs)
- [**`<mg-input-toggle>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-toggle--docs)
- All inputs also refers to [PDA9-723](https://jira.mgdis.fr/browse/PDA9-723).
- [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs) for accessibility, sometimes we need to add a background on icons, it is now possible with the attribute `variant`
- [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs) can now be hidden after a defined delay using the `delay` attribute
- [**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) Tooltip icon moved next to label when used with the attribute `label-on-top`

### Patch Changes

- [#22](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/22) [#32](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/32) Remove errors during test
- [#25](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/25) Tooltip does not hide on IE
- [#28](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/28) Tooltip not display with `<mg-button>` in slot on keyboard event
- [#29](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/29) Tooltip hide behind tag with background-color
- [#30](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/30) Add the possibility to display tooltip with conditions
- [#31](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/31) mg-input-checkbox change tooltip margin top calc
- [#33](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/33) mg-button : Action can be triggered with a disabled button
- [#34](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/34) Custom events not working with vue3 projects

## 1.0.1

### Patch Changes

- [#23](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/23) Storybook error on grid page

## 1.0.0

### ⚠️ MG components release

First release of the component library 🎉

#### Atoms

- [**`<mg-button>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs)
- **`<mg-character-left>`**
- [**`<mg-icon>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-icon--docs)
- **`<mg-input-title>`**
- [**`<mg-tag>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-tag--docs)
- [**`<mg-tooltip>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-tooltip--docs)

(1) : Used in inputs molecules.

#### Molecules

- [**`<mg-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-message--docs)

##### Inputs

- [**`<mg-input-date>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-date--docs)
- [**`<mg-input-numeric>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-numeric--docs)
- [**`<mg-input-radio>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-radio--docs)
- [**`<mg-input-select>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-select--docs)
- [**`<mg-input-text>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-text--docs)
- [**`<mg-input-textarea>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-textarea--docs)

All inputs also refers to [PDA9-723](https://jira.mgdis.fr/browse/PDA9-723).

##### Stories

Dedicated stories to show how to setup :

- [Email](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-text--docs#email)
- [Emails](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-text--docs#emails)
- [RNA](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-text--docs#rna)
- [URL](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-text--docs#url)

#### More stories

- A dedicated story to show [all the availables icons](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/style-icons--docs)
