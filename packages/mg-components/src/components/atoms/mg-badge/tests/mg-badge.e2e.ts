import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
import { variants } from '../mg-badge.conf';

test.describe('mg-badge', () => {
  // Variants
  variants.forEach(variant => {
    // Outline
    [false, true].forEach(outline => {
      test(`variant ${variant} outline ${outline}`, async ({ page }) => {
        // Set HTML
        const html = [1, 99, '*', '!', '99+'].map(value => `<mg-badge ${renderAttributes({ value, label: variant, variant, outline })}></mg-badge>`).join('');
        // Add style based on variant
        if (variant === 'text-color') {
          await page.addStyleTag({ content: 'mg-badge{--mg-c-badge-color-text:hsl(40 80% 60%);color:hsl(260 80% 50%)}' });
        } else if (variant === 'secondary') {
          await page.addStyleTag({ content: 'body{background:#999}' });
        }
        // Set page content
        await page.setContent(html);
        // Screenshot
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
