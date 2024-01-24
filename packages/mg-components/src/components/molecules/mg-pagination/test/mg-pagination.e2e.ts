import { setPageContent, expect, describe, testEach, PageType, test } from '../../../../utils/playwright.e2e.test.utils';
import { renderAttributes } from '../../../../utils/e2e.test.utils';
import { MgPagination } from '../mg-pagination';

const createHTML = args => `<mg-pagination ${renderAttributes(args)}></mg-pagination>`;

describe('mg-pagination', () => {
  describe('template', () => {
    testEach(
      [1, 2, 3].flatMap(totalPages => [true, false].flatMap(hidePageCount => [true, false].map(hideNavigationLabels => ({ totalPages, hideNavigationLabels, hidePageCount })))),
    )('render %s', async (page: PageType, args: Partial<MgPagination>) => {
      await setPageContent(page, createHTML(args));

      if (args.totalPages > 1) await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      else expect(await page.locator('mg-pagination').isVisible()).toBe(false);
    });
  });

  describe('navigation', () => {
    testEach([2, 3, 10])('should success mouse navigation %s', async (page: PageType, totalPages: number) => {
      await setPageContent(page, createHTML({ totalPages }));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      const actions = [...Array(totalPages - 1).keys()];

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of actions) {
        const nextButton = page.locator('mg-pagination mg-button:last-of-type');
        await nextButton.click();
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      }
    });

    test('Should success keyboard navigation', async ({ page }) => {
      await setPageContent(page, createHTML({ totalPages: 5 }));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // take focus on mg-input-select
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // change mg-input-select to value 3
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // take focus on previous button
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      await page.keyboard.up('Shift');
      await page.keyboard.down('Enter');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // take focus on next
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describe('locales', () => {
    test('render with locale: %s', async ({ page }) => {
      await setPageContent(page, createHTML({ totalPages: 5, lang: 'fr' }));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
