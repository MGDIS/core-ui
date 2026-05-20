import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { setPageContent } from './mg-modal.e2e.template';

test.describe('mg-modal, webkit browser', () => {
  // Guards against the WebKit collapse where mg-card height resolved to 0.
  test('Should render long content without collapsing the dialog', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await setPageContent(page, {}, { content: 'long' });
    await page.locator('#modal-button').click();
    await page.waitForFunction(() => document.querySelector('mg-modal')?.shadowRoot?.querySelector('dialog')?.hasAttribute('open'));

    await expect(page).toHaveScreenshot();
  });

  // Guards against the UA max-height + content-box dialog overflow.
  test('Should fit within a small viewport without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 400 });
    await setPageContent(page, {}, { content: 'long' });
    await page.locator('#modal-button').click();
    await page.waitForFunction(() => document.querySelector('mg-modal')?.shadowRoot?.querySelector('dialog')?.hasAttribute('open'));

    await expect(page).toHaveScreenshot();
  });
});
