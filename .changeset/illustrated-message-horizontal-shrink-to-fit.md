---
'@mgdis/mg-components': patch
'@mgdis/styles': patch
---

[**`<mg-illustrated-message>`**](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/molecules-mg-illustrated-message--docs) `direction="horizontal"` no longer renders an invisible illustration. Two issues are fixed:

- The host establishes an `inline-size` container query context, and its size containment removed its intrinsic inline size — so in a shrink-to-fit parent (flex item, inline-block, float) the whole message collapsed to 0 unless the consumer forced a width. The host now fills its parent inline size.
- On Firefox, an `<img>` illustration collapsed to 0 inside the horizontal container query (its `fit-content` column resolved to 0 for a replaced child with no intrinsic size; inline `<svg>` was unaffected). Images are now anchored by their block-size with the inline-size following the intrinsic ratio.
