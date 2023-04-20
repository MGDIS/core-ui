import base from 'playwright-config/base';
import { devices, type PlaywrightTestConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  ...base,
  /* We need to separate e2e tests from Stencil */
  testMatch: '*.e2e.playwright.ts',
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm start -p 3333',
    url: 'http://localhost:3333',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3333',
    trace: 'on',
  },
  // for tests
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
};

export default config;
