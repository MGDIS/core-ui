import base from '@mgdis/playwright-helpers';
import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  ...base,
  /**
   * Configure projects for major browsers
   * removing webkit
   */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
  ],
});
