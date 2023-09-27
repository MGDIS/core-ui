import { renderAttributes, renderProperties } from '../../../../../utils/e2e.test.utils';
import { setPageContent, expect, describe, test } from '../../../../../utils/playwright.e2e.test.utils';

describe('mg-input-text', () => {
  describe('datalist', () => {
    test('Should display datalist', async ({ page }) => {
      const props = { identifier: 'identifier', label: 'label', datalistoptions: ['batman', 'robin'] };
      await setPageContent(page, `<mg-input-text ${renderAttributes(props)}></mg-input-text><script>${renderProperties(props, `[identifier="${props.identifier}"]`)}</script>`);

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
