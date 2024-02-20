import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../utils/playwright.fixture';
import { sizes, variantStyles, variants } from '../mg-icon.conf';
import icons from '@mgdis/img/dist/icons/index.json';

const createHTML = args => `<mg-icon ${renderAttributes(args)}></mg-icon>`;

test.describe('mg-icon', () => {
  icons.forEach((icon: string) => {
    test(`render icon ${icon}`, async ({ page }) => {
      const html = createHTML({ icon, size: 'extra-large' });

      await page.setContent(html);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('render sizes', async ({ page }) => {
    const html = sizes.map(size => createHTML({ icon: 'thumb-up', size })).join('');

    await page.setContent(html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  variantStyles.forEach(variantStyle => {
    test(`render variants, with variantStyle ${variantStyle}`, async ({ page }) => {
      const html = variants.map(variant => sizes.map(size => createHTML({ icon: 'check-circle', variant, variantStyle, size })).join('')).join('');

      page.addStyleTag({ content: 'mg-icon[variant="app"]{--mg-b-color-app-h:250}' });
      await page.setContent(html);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
