import base from '@mgdis/playwright-config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...base,
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'cd ../.. && pnpm apps:notification-center',
    port: 3210,
    reuseExistingServer: true,
  },
});
