# @mgdis/e2e-helpers

This package provides [Playwright](https://playwright.dev/) configuration file for your project.

## Installation

```bash
pnpm i -D @mgdis/e2e-helpers
```

## Configuration

Here a configuration exemple for your `playwright.config.ts` if you need to override a value or run a webserver for your e2e tests :

```TS
import { playwrightBaseConfig } from '@mgdis/e2e-helpers';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...config
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm webserver',
    port: 3210,
    reuseExistingServer: true,
  },
});

```
