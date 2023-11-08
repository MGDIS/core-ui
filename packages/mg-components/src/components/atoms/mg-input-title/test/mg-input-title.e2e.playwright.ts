import { renderAttributes } from '../../../../utils/e2e.test.utils';
import { setPageContent, describe, testEach, expect, PageType } from '../../../../utils/playwright.e2e.test.utils';

const createHtml = args => `<mg-input-title ${renderAttributes({ ...args, identifier: 'identifier' })}>Label</mg-input-title>`;

const TIMEOUT = 1000;

describe('mg-input-title', () => {
  testEach([true, false].flatMap(isLegend => [true, false].flatMap(required => [true, false].map(readonly => ({ isLegend, required, readonly })))))(
    'Should render %s',
    async (page: PageType, args) => {
      await setPageContent(page, createHtml(args));

      await page.locator('mg-input-title.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    },
  );
});
