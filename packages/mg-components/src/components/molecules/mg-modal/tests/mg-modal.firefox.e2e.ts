import { expect, devices } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { setPageContent } from './mg-modal.e2e.template';

test.use({ ...devices['Desktop Firefox'] });

test.describe('mg-modal, firefox', () => {
  test.describe('navigation', () => {
    test('Should navigate with keyboard', async ({ page }) => {
      await setPageContent(page, { closeButton: true, hidden: true }, { action: true, content: 'short' });
      await expect(page.locator('body')).toHaveScreenshot();

      // open modal
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      // loop in modal
      await page.keyboard.press('Tab');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      // close modal
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
