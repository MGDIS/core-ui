import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../utils/playwright.fixture';

test.describe('mg-character-left', () => {
  [
    { characters: '', maxlength: 100 },
    { characters: 'blu', maxlength: 200 },
    { characters: 'blu blu blu blu', maxlength: 1000 },
  ].forEach((args, index) => {
    test(`Should render ${index + 1}`, async ({ page }) => {
      page.setContent(`<mg-character-left ${renderAttributes(args)}></mg-character-left>`);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
