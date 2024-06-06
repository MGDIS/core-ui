import { expect, devices } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { setPageContent } from './mg-modal.e2e.template';

test.use({ ...devices['Desktop Firefox'] });

test.describe('mg-modal, firefox', () => {
  test.describe('navigation', () => {
    test('Should navigate with keyboard', async ({ page }) => {
      await setPageContent(page, { closeButton: true }, { action: true, content: 'short' });
      await page.addStyleTag({ content: '.e2e-screenshot{height:100%}' });
      await expect(page.locator('body')).toHaveScreenshot();

      // open modal
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('body')).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(page.locator('body')).toHaveScreenshot();

      await page.keyboard.press('Shift+Tab'); // Dialog ensure focus but we also have to loop into FF URL and menu bar
      await expect(page.locator('body')).toHaveScreenshot();

      // close modal
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
