import { devices, expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/playwright-helpers';

test.use({ ...devices['Desktop Edge'] });

const createHTML = args => `<mg-input-password ${renderAttributes(args)}></mg-input-password>`;

test.describe('mg-input-password, edge browser', () => {
  test(`Should render with template`, async ({ page }) => {
    const html = createHTML({ identifier: 'identifier', label: 'label' });
    await page.setContent(html);

    await page.locator('mg-input-password.hydrated').waitFor();

    await page.keyboard.down('Tab');
    await page.keyboard.press('e');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
