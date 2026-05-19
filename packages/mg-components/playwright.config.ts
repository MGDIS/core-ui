import { playwrightBaseConfig } from '@mgdis/core-ui-helpers/dist/playwright';
import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  ...playwrightBaseConfig,
  /**
   * Configure projects for major browsers
   *
   * - `chromium` runs every e2e test file except those suffixed `.firefox.e2e.ts`.
   * - `firefox` runs only the `.firefox.e2e.ts` files, on the real Firefox engine,
   *   to cover engine-specific behaviour (e.g. sub-pixel rasterisation, see #611).
   *
   * To regenerate Firefox baselines locally:
   *     npx playwright test --project=firefox --update-snapshots
   */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      testIgnore: '**/*.firefox.e2e.ts',
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      testMatch: '**/*.firefox.e2e.ts',
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
