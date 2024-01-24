import { setPageContent, expect, describe, test, devices } from '../../../../utils/playwright.e2e.test.utils';
import { createHTML } from './mg-modal.e2e.template';

test.use({ ...devices['Desktop Firefox'] });

describe('mg-modal, firefox', () => {
  describe('navigation', () => {
    test('Should navigate with keyboard', async ({ page }) => {
      await setPageContent(page, createHTML({ closeButton: true, hidden: true }, { action: true, content: 'short' }));
      await expect(page.locator('body')).toHaveScreenshot();

      // open modal
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      // loop in modal
      await page.keyboard.press('Tab');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      // close modal
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
