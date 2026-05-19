import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { setPageContent } from './mg-modal.e2e.template';

test.describe('mg-modal, webkit browser', () => {
  // On WebKit, `.mg-c-modal mg-card { max-height: 100% }` resolved against a
  // `fit-content` dialog parent collapses the card to 0, leaving only the
  // header strip visible.
  test('Should render long content without collapsing the dialog', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await setPageContent(page, {}, { content: 'long' });
    await page.locator('#modal-button').click();
    await page.waitForFunction(() => document.querySelector('mg-modal')?.shadowRoot?.querySelector('dialog')?.hasAttribute('open'));

    await expect(page).toHaveScreenshot();
  });

  // Dialog total height (padding included) must stay within the viewport.
  // The UA `max-height: calc(100% - 6px - 2em)` rule combined with our 48px
  // vertical padding and `content-box` allowed an ~8px overflow on every
  // browser; the fix uses `border-box` + `100dvh`.
  test('Should fit within a small viewport without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 400 });
    await setPageContent(page, {}, { content: 'long' });
    await page.locator('#modal-button').click();
    await page.waitForFunction(() => document.querySelector('mg-modal')?.shadowRoot?.querySelector('dialog')?.hasAttribute('open'));

    await expect(page).toHaveScreenshot();
  });
});
