---
'@mgdis/styles': patch
---

Migrate the deprecated Sass `if(condition, then, else)` calls to the modern `if(sass(condition): then; else: else)` syntax. This removes the `DEPRECATION WARNING [if-function]` emitted at build time and cascading to every component that consumes the styles via `@use`. Pure syntactic change — the generated CSS is byte-identical.
