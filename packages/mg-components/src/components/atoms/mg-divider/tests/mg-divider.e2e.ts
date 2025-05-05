import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/playwright';
import { test } from '../../../../utils/playwright.fixture';

const createHTML = args => `<mg-divider ${renderAttributes(args)}></mg-divider>`;

test.describe('mg-divider', () => {
  test(`Should render with full-width false`, async ({ page }) => {
    const html = createHTML({ fullWidth: false });

    await page.setContent(html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test(`Should render with full-width true`, async ({ page }) => {
    const html = createHTML({ fullWidth: true });

    await page.setContent(html);

    await page.addStyleTag({ content: '.e2e-screenshot{display:block}' });
    await page.setViewportSize({ width: 800, height: 81 });

    await expect(page.locator('html')).toHaveScreenshot();
  });
});
