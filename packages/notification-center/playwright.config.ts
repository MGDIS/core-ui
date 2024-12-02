import { playwrightBaseConfig } from '@mgdis/playwright-helpers';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  ...playwrightBaseConfig,
  timeout: 60 * 1000, // Increased timeout due to extended waiting times in tests.
  expect: {
    ...playwrightBaseConfig.expect,
    toHaveScreenshot: {
      ...playwrightBaseConfig.expect?.toHaveScreenshot,
      maxDiffPixelRatio: 0.02, // Allowing a small difference in pixels.
    },
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'cd ../.. && pnpm apps:notification-center',
    port: 3210,
    reuseExistingServer: true,
  },
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
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
