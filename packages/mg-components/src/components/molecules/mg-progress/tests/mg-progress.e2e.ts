import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
import { test } from '../../../../utils/playwright.fixture';

const renderHTML = args => `<mg-progress ${renderAttributes(args)}></mg-progress>`;

test.describe('mg-progress', () => {
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: '.e2e-screenshot{padding:1rem}' });
  });
  ['unset', 'var(--mg-b-color-neutral-100)}'].forEach(backgroundColor => {
    [{}, { value: 5 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 95 }, { value: 100 }].forEach(args => {
      test(`renders with args ${renderAttributes(args)} and body background: ${backgroundColor}`, async ({ page }) => {
        await page.addStyleTag({ content: `body{background-color:${backgroundColor}` });
        await page.setContent(renderHTML({ label: 'label', ...args }));

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [{}, { value: 50 }, { value: 75 }, { value: 100 }].forEach(args => {
    test(`should fill the parent container, ${renderAttributes(args)}`, async ({ page }) => {
      await page.addStyleTag({ content: '.e2e-screenshot{width:30rem}' });
      await page.setContent(renderHTML({ label: 'label', ...args }));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
