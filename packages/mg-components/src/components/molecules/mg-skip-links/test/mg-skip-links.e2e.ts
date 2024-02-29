import { describe, expect, test } from '../../../../utils/playwright.e2e.test.utils';

describe('mg-skip-links', () => {
  test('Should render', async ({ page }) => {
    await page.setContent(
      `<mg-skip-links></mg-skip-links>
    <style>body{background:#999;}</style>
    <script>
      const mgSkipLinks = document.querySelector('mg-skip-links');
      mgSkipLinks.links = [
        { href: '#content', label: 'Content' },
        { href: '#menu', label: 'Menu' },
        { href: '#search', label: 'Search' },
        { href: '#footer', label: 'Footer' },
      ];
    </script>`,
    );

    const mgSkipLinks = page.locator('mg-skip-links.hydrated');

    await expect(mgSkipLinks).not.toBeVisible();

    await page.keyboard.press('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.press('Enter');

    await expect(mgSkipLinks).not.toBeVisible();
  });
});
