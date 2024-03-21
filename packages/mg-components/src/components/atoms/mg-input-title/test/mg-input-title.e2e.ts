import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../utils/playwright.fixture';

const createHTML = args => `<mg-input-title ${renderAttributes({ ...args })}>${args.isLegend ? 'Legend' : 'Label'}</mg-input-title>`;

test.describe('mg-input-title', () => {
  [true, false]
    .flatMap(isLegend => [true, false].flatMap(required => [true, false].map(readonly => ({ isLegend, required, readonly, identifier: 'identifier' }))))
    .forEach(args => {
      test(`Should render ${renderAttributes(args)}`, async ({ page }) => {
        const html = createHTML(args);

        await page.setContent(html);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
});
