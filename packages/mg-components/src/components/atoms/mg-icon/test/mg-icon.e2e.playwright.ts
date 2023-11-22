import { PageType, describe, expect, setPageContent, testEach, test } from '../../../../utils/playwright.e2e.test.utils';
import { renderAttributes } from '../../../../utils/e2e.test.utils';
import { sizes, variantStyles, variants } from '../mg-icon.conf';
import icons from '@mgdis/img/dist/icons/index.json';

const TIMEOUT = 1000;

const style = `<style>[variant='app']{ --mg-color-app-h: 250; }</style>`;

describe.only('mg-icon', () => {
  testEach(icons)('renders icon %s', async (page: PageType, icon) => {
    await setPageContent(page, `<mg-icon icon="${icon}"></mg-icon>`);

    await page.locator('mg-icon.hydrated').first().waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('renders sizes', async ({ page }) => {
    const html = sizes.map(size => `<mg-icon ${renderAttributes({ icon: 'thumb-up', size })}></mg-icon>`).join('');
    await setPageContent(page, html);

    await page.locator('mg-icon.hydrated').first().waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  testEach(variantStyles)('renders variants, with variantStyle %s', async (page: PageType, variantStyle) => {
    const html = variants
      .map(variant => sizes.map(size => `<mg-icon ${renderAttributes({ icon: 'check-circle', variant: variant, variantStyle, size })}></mg-icon>`).join(''))
      .join('');

    await setPageContent(page, html + style);

    await page.locator('mg-icon.hydrated').first().waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
