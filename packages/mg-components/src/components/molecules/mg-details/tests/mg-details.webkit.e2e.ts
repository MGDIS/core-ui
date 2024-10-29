import { devices, expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/playwright-helpers';

test.use({ ...devices['Desktop Safari'] });

const createHTML = (args, emptySummary = false) =>
  `<mg-details ${renderAttributes(args)}>${emptySummary ? '' : '<span slot="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>'}<p slot="details">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></mg-details>`;

test.describe('mg-details, webkit browser', () => {
  [{}, { hideSummary: true }].forEach(args => {
    test(`Should toggle details ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ toggleClosed: 'Show details', toggleOpened: 'Hide details', ...args });
      await page.setContent(html);

      await page.setViewportSize({ width: 700, height: 100 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
