---
'@mgdis/styles': patch
---

[#609](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/work_items/609) mg-card: clarify the `--mg-c-card-overflow` documentation. The property is intentionally left `unset` by default to preserve nested cards (e.g. `mg-panel > mg-card`); consumers can set it on the card (e.g. `auto`) to scroll or clip overflowing content. Documentation only, no behaviour change.
