import base from '@mgdis/playwright-config';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  ...base,
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'cd ../.. && pnpm apps:notification-center',
    port: 3210,
    reuseExistingServer: true,
  },
};

export default config;
