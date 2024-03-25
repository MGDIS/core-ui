import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/playwright-helpers';

const createHTML = args => `<mg-pagination ${renderAttributes(args)}></mg-pagination>`;

test.describe('mg-pagination', () => {
  test.describe('template', () => {
    [1, 2, 3]
      .flatMap(totalPages => [true, false].flatMap(hidePageCount => [true, false].map(hideNavigationLabels => ({ totalPages, hideNavigationLabels, hidePageCount }))))
      .forEach(args => {
        test(`render ${renderAttributes(args)}`, async ({ page }) => {
          const html = createHTML(args);
          await page.setContent(html);

          if (args.totalPages > 1) await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
          else expect(await page.locator('mg-pagination').isVisible()).toBe(false);
        });
      });
  });

  test.describe('navigation', () => {
    [2, 3, 10].forEach(totalPages => {
      test(`should success mouse navigation totalPages: ${totalPages}`, async ({ page }) => {
        const html = createHTML({ totalPages });
        await page.setContent(html);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        const actions = [...Array(totalPages - 1).keys()];

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of actions) {
          const nextButton = page.locator('mg-pagination mg-button:last-of-type');
          await nextButton.click();
          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        }
      });
    });

    test('should success keyboard navigation', async ({ page }) => {
      const html = createHTML({ totalPages: 5 });
      await page.setContent(html);

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

  test.describe('locales', () => {
    test('render with locale fr', async ({ page }) => {
      const html = createHTML({ totalPages: 5, lang: 'fr' });
      await page.setContent(html);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
