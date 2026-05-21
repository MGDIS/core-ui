---
'@mgdis/mg-components': patch
---

mg-tooltip: fix Escape key handling by listening to `keydown` instead of the non-existent `keyboard` event when removing the listener on disconnect.
