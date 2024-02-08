import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../utils/playwright.fixture';

const renderHTML = args => `<mg-loader ${renderAttributes(args)}></mg-loader>`;

test.describe('mg-loader', () => {
  [{}, { message: 'new loader message' }, { messageHide: true }].forEach(args => {
    test(`renders with args message="${args.message}" messageHide="${args.messageHide}"`, async ({ page }) => {
      await page.setContent(renderHTML(args));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
