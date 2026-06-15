---
'@mgdis/mg-components': patch
---

[**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) now renders its auto-generated error message and help text in a `<p>` element instead of a generic `<div>` (RGAA 8.9 — meaningful HTML tags). This applies to every input relying on the `errorMessage` / `helpText` props (`mg-input-text`, `-numeric`, `-date`, `-select`, `-checkbox`, `-radio`, `-toggle`, `-file`, `-password`, `-textarea`, `-combobox`, `-rich-text-editor`). The slotted element still carries the same `id` and `slot`, and the BEM classes remain on the shadow-DOM wrappers, so styling is unaffected.
