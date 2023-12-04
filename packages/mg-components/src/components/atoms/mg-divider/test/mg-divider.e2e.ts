import { PageType, describe, expect, setPageContent, testEach, updateScreenshotClass } from '../../../../utils/playwright.e2e.test.utils';

const TIMEOUT = 1000;

describe('mg-divider', () => {
  testEach(['regular', 'full'])('Should render with size %s', async (page: PageType, size: string) => {
    await setPageContent(page, `<mg-divider size="${size}"></mg-divider>`);

    if (size === 'full') await updateScreenshotClass(page, { width: '800px', height: '81px' });

    await page.locator('mg-divider.hydrated').waitFor({ timeout: TIMEOUT });
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
