---
'@mgdis/mg-components': patch
'@mgdis/styles': patch
---

[**`<mg-input>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-inputs-mg-input--docs) now renders its auto-generated error message and help text in a `<p>` element instead of a generic `<div>` (RGAA 8.9 — meaningful HTML tags). This applies to every input relying on the `errorMessage` / `helpText` props (`mg-input-text`, `-numeric`, `-date`, `-select`, `-checkbox`, `-radio`, `-toggle`, `-file`, `-password`, `-textarea`, `-combobox`, `-rich-text-editor`). The slotted element keeps the same `id` and `slot`, the BEM classes stay on the shadow-DOM wrappers, and the slotted content now resets its margin so the `<p>` renders with the exact same spacing as the former `<div>` — styling is unaffected.

Because `errorMessage` / `helpText` accept HTML, the tag is chosen from the content: textual / phrasing content (the common case) renders as `<p>`, while content wrapping block-level elements (`<p>`, `<ul>`, `<div>`, headings…) falls back to a `<div>` to avoid invalid nesting such as `<p><p>…</p></p>` (RGAA 8.2 — valid source code). The tag is re-evaluated when the content changes.
