---
'@mgdis/mg-components': patch
'@mgdis/core-ui-helpers': minor
---

[#598](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/work_items/598) mg-components: align all boolean `@Prop()`s with the HTML spec for boolean attributes — the attribute's presence now implies `true` regardless of its value (`readonly`, `readonly=""`, `readonly="true"`, `readonly="false"`). Adds `normalizeBooleanAttributes` to `@mgdis/core-ui-helpers/dist/stencil`. Aligns `renderAttributes` (in `@mgdis/core-ui-helpers/dist/playwright`) with the same semantics: `true` → `attr=""`, `false` → attribute omitted.
