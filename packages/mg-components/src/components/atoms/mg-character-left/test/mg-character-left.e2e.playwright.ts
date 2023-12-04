import { PageType, describe, expect, setPageContent, testEach } from '../../../../utils/playwright.e2e.test.utils';

const TIMEOUT = 1000;

describe('mg-character-left', () => {
  testEach([
    `<mg-character-left characters="" maxlength="100"></mg-character-left>`,
    `<mg-character-left characters="blu" maxlength="200"></mg-character-left>`,
    `<mg-character-left characters="blu blu blu blu" maxlength="1000"></mg-character-left>`,
  ])('Should render %s', async (page: PageType, html: string) => {
    await setPageContent(page, html);

    await page.locator('mg-character-left.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
