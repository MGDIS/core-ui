import base from 'playwright-config/base';
import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  ...base,
  /* We need to separate e2e tests from Stencil */
  testMatch: '*.e2e.playwright.ts',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
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
    command: 'pnpm prebuild && pnpm stencil build --serve --watch -p 3333',
    url: 'http://localhost:3333',
    reuseExistingServer: !(process.env.CI as boolean),
  },
  use: {
    baseURL: 'http://localhost:3333',
  },
};

export default config;
