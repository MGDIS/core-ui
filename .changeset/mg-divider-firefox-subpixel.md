---
'@mgdis/styles': patch
---

[#611](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/work_items/611) mg-divider: fix line disappearing on Firefox at certain zoom levels by drawing the rule with `border-top` instead of `height` + `background-color`, which is more resilient to sub-pixel rasterisation.
