import { playwrightBaseConfig } from '@mgdis/core-ui-helpers/dist/playwright';
import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  ...playwrightBaseConfig,
  /**
   * Configure projects for major browsers.
   * `chromium` runs every e2e file except the ones explicitly scoped to other
   * engines via the `*.<engine>.e2e.ts` suffix. `webkit` runs only the webkit
   * suffix files so engine-specific regressions are caught by the right
   * rendering engine.
   */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      testIgnore: '**/*.webkit.e2e.ts',
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
      testMatch: '**/*.webkit.e2e.ts',
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
