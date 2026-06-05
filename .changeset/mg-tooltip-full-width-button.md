---
'@mgdis/mg-components': patch
'@mgdis/styles': patch
---

[#601](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/work_items/601) mg-tooltip: stretch a slotted `mg-button[full-width]` to the tooltip's container width. mg-tooltip now detects a slotted full-width mg-button in `componentDidLoad` and adds a `mg-c-tooltip--full-width` class so the host adopts `display: block`. The wrapper inserted around a disabled mg-button (`.mg-c-tooltip__mg-button-wrapper`) is also `display: block; width: 100%` so the button still stretches in the disabled case.
