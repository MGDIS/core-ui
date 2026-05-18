import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';

/**
 * Regression test for #611 — mg-divider line was rasterised away on Firefox at
 * certain zoom levels. The fix draws the line with `border-top` (clamped to >=
 * 1 device pixel) instead of `height` + `background-color`.
 *
 * This test forces a sub-pixel declared thickness so the original bug would
 * make the line vanish on Firefox. With the fix in place the border stays
 * visible.
 */
test.describe('mg-divider, firefox', () => {
  test('Should remain visible at sub-pixel thickness', async ({ page }) => {
    await page.setContent('<mg-divider full-width></mg-divider>');
    await page.addStyleTag({
      content: `
        mg-divider {
          --mg-c-divider-thickness: 0.3px;
          --mg-c-divider-color-background: rgb(0, 0, 0);
          --mg-c-divider-spacing-vertical: 1rem;
        }
        .e2e-screenshot { display: block; }
      `,
    });
    await page.setViewportSize({ width: 800, height: 81 });
    await expect(page.locator('html')).toHaveScreenshot();
  });
});
