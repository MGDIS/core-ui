# @mgdis/playwright-helpers

This package provides a [Playwright](https://playwright.dev/) configuration file for your projects and methods to build your test HTML.

## Installation

```bash
pnpm i -D @mgdis/playwright-helpers
```

## Configuration

Here a configuration exemple for your `playwright.config.ts` if you need to override a value or run a webserver for your e2e tests:

```TS
import { playwrightBaseConfig } from '@mgdis/playwright-helpers';
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

### methods

#### renderAttributes

Render attributes from props objects.

#### Parameters:

- `args`: Argument to render as a string. Example: `{ status: 'visible' }`

#### Returns:

Formatted inline attributes. Example: `'status="visible"'`

#### Usage:

```TS
import { renderAttributes } from '@mgdis/playwright-helpers';

const attributes = renderAttributes({ status: 'visible', color: 'red' });
console.log(attributes); // Output: 'status="visible" color="red"'
```

### renderProperties

Render properties from props objects. Insert the return value in a <script></script> element.

#### Parameters:

- `args`: Argument to render as a script. Example: `{ status: 'visible' }`
- `selector`: querySelector to get the targeted element and bind properties on it.

#### Returns:

Stringified properties script.

#### Usage:

```TS
import { renderProperties } from '@mgdis/playwright-helpers';

const propertiesScript = renderProperties({ status: 'visible', color: 'red' }, '.targetElement');
console.log(propertiesScript);
// Output: 'document.querySelector(".targetElement").status="visible"; document.querySelector(".targetElement").color="red";'
```
