---
'@mgdis/mg-components': patch
---

[**`<mg-popover>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-popover--docs) no longer closes when clicking inside it while it is nested in another component's shadow DOM. The outside-click detection now uses `composedPath()` instead of `event.target`, which is retargeted to the outer shadow host at the `window` level. This notably fixes [**`<mg-input-combobox>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input-combobox--docs) consumed inside a wrapper component, where clicking "Show more" closed the suggestions list instead of appending the next page.
