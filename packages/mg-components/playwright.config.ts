import { playwrightBaseConfig } from '@mgdis/playwright-helpers';
import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  ...playwrightBaseConfig,
  /**
   * Configure projects for major browsers
   * For now we only test on Chromium
   */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'cd ../.. && pnpm apps:mg-components',
    url: 'http://localhost:8080',
    reuseExistingServer: !(process.env.CI as boolean),
  },
  use: {
    baseURL: 'http://localhost:8080',
  },
});
