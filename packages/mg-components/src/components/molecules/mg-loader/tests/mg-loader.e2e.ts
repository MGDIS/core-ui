import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/playwright';
import { test } from '../../../../utils/playwright.fixture';

const renderHTML = args => `<mg-loader ${renderAttributes(args)}></mg-loader>`;

test.describe('mg-loader', () => {
  [{}, { message: 'new loader message' }, { messageHide: true }].forEach(args => {
    test(`renders with args ${renderAttributes(args)}`, async ({ page }) => {
      await page.setContent(renderHTML(args));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('responsive', () => {
    test(`renders with default args`, async ({ page }) => {
      await page.setContent(renderHTML({}));

      await page.setViewportSize({ width: 100, height: 100 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
