import { playwrightBaseConfig } from '@mgdis/playwright-helpers';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  ...playwrightBaseConfig,
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'cd ../.. && pnpm apps:notification-center',
    port: 3210,
    reuseExistingServer: true,
  },
});
