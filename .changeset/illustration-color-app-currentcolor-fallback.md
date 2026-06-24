---
'@mgdis/img': patch
---

Illustrations now keep their own brand colour when the `--mg-b-color-app` token is not provided, instead of disappearing. The dynamic-coloured paths use `fill="var(--mg-b-color-app, <brand colour>)"`: they still follow the app/theme colour when it is defined, and otherwise fall back to the illustration's brand colour rather than resolving to `fill: none`.
