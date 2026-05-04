---
'@mgdis/mg-components': patch
---

mg-tooltip, mg-modal, mg-popover: throw an error when the `identifier` prop value is invalid, to prevent silent breakage of ARIA wiring.
