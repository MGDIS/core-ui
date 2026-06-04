---
'@mgdis/mg-components': minor
---

mg-input-select: options are now differentiated by their `value` instead of their `title`. Selecting an option whose `title` is shared with another option (only allowed across different `optgroup`s) now emits the correct `value`. As a consequence, `items` can no longer contain two options with the same `title` outside of a group or within the same group — such configurations now throw an explicit error.
