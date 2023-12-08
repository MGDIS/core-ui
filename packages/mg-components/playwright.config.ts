import { playwrightBaseConfig } from '@mgdis/e2e-helpers';
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
    command: 'pnpm prebuild && pnpm stencil build --serve --watch -p 3333',
    url: 'http://localhost:3333',
    reuseExistingServer: !(process.env.CI as boolean),
  },
  use: {
    baseURL: 'http://localhost:3333',
  },
});
