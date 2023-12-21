import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../utils/playwright.fixture';

const createHTML = args => `<mg-divider ${renderAttributes(args)}></mg-divider>`;

test.describe('mg-divider', () => {
  test(`Should render with size regular`, async ({ page }) => {
    const html = createHTML({ size: 'regular' });

    await page.setContent(html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test(`Should render with size full`, async ({ page }) => {
    const html = createHTML({ size: 'full' });

    await page.setContent(html);

    await page.addStyleTag({ content: '.e2e-screenshot{display:block}' });
    await page.setViewportSize({ width: 800, height: 81 });

    await expect(page.locator('html')).toHaveScreenshot();
  });
});
