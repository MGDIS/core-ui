---
'@mgdis/mg-components': patch
'@mgdis/styles': patch
---

[**`<mg-illustrated-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-illustrated-message--docs) no longer collapses to zero width when placed in a shrink-to-fit parent (flex item, inline-block, float). The host establishes an `inline-size` container query context for the horizontal direction; size containment removed its intrinsic inline size, so without an explicit width from the consumer the whole message — illustration included — disappeared. The host now fills its parent inline size, so `direction="horizontal"` works without forcing a width.
