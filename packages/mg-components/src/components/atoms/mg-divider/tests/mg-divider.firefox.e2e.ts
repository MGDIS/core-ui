import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';

/**
 * Regression test for #611 — mg-divider line was rasterised away on Firefox at
 * certain zoom + screen-size combinations. The fix draws the line with
 * `border-top` (clamped to >= 1 device pixel) instead of `height` +
 * `background-color` (which a browser is free to rasterise to 0 when the
 * device-pixel mapping falls below 1).
 *
 * Reproducing real browser zoom from Playwright is non-deterministic (CSS
 * `zoom` does not reproduce the sub-pixel rasterisation path), so we force a
 * sub-pixel declared thickness instead. Empirically verified: with the OLD
 * approach this test produces an all-white screenshot on Firefox, with the
 * fix in place the line is visible.
 */
test.describe('mg-divider, firefox', () => {
  test('Should remain visible at sub-pixel thickness', async ({ page }) => {
    await page.setContent('<mg-divider full-width></mg-divider>');
    await page.addStyleTag({
      content: `
        mg-divider {
          --mg-c-divider-thickness: 0.3px;
          --mg-c-divider-color-background: rgb(0, 0, 0);
        }
        .e2e-screenshot { display: block; }
      `,
    });
    await page.setViewportSize({ width: 800, height: 81 });
    await expect(page.locator('html')).toHaveScreenshot();
  });
});
