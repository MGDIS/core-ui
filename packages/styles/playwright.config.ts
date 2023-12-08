import { playwrightBaseConfig } from '@mgdis/e2e-helpers';
import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  ...playwrightBaseConfig,
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
