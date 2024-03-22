import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { renderProperties } from '@mgdis/playwright-helpers';

test.describe('mg-skip-links', () => {
  test('Should render', async ({ page }) => {
    await page.setContent('<mg-skip-links></mg-skip-links>');
    await page.addScriptTag({
      content: renderProperties(
        {
          links: [
            { href: '#content', label: 'Content' },
            { href: '#menu', label: 'Menu' },
            { href: '#search', label: 'Search' },
            { href: '#footer', label: 'Footer' },
          ],
        },
        `mg-skip-links`,
      ),
    });

    const mgSkipLinks = page.locator('mg-skip-links.hydrated');

    await mgSkipLinks.waitFor({ state: 'attached' });

    await expect(mgSkipLinks).not.toBeVisible();

    await page.keyboard.press('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.press('Enter');

    await expect(mgSkipLinks).not.toBeVisible();
  });
});
