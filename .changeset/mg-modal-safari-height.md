---
'@mgdis/styles': patch
---

`<mg-modal>`: fix dialog collapse on WebKit/Safari (`mg-card` shrunk to header height because `max-height: 100%` chained against a `fit-content` dialog parent) and prevent the silent ~8px overflow on all browsers caused by the `<dialog>` UA `max-height: calc(100% - 6px - 2em)` combined with content-box. Switches to `100dvh` viewport units and `box-sizing: border-box`. Closes [#602](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/issues/602).
