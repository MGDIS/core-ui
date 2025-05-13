import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
import { test } from '../../../../utils/playwright.fixture';
import { sizes, variantStyles, variants } from '../mg-icon.conf';
import { icons } from '../../../../assets/icons';

const createHTML = args => `<mg-icon ${renderAttributes(args)}></mg-icon>`;

test.describe('mg-icon', () => {
  Object.keys(icons).forEach((icon: string) => {
    test(`render icon ${icon}`, async ({ page }) => {
      const html = createHTML({ icon, size: 'xxlarge' });

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
      const html = variants.map(variant => sizes.map(size => createHTML({ icon: 'dashboard', variant, variantStyle, size })).join('')).join('');

      page.addStyleTag({ content: 'mg-icon[variant="app"]{--mg-b-color-app:#190099}' });
      await page.setContent(html);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
