import { playwrightBaseConfig } from '@mgdis/playwright-helpers';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...playwrightBaseConfig,
  timeout: 60 * 1000, // increased timeout because of waiting times in tests
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'cd ../.. && pnpm apps:notification-center',
    port: 3210,
    reuseExistingServer: true,
  },
});
