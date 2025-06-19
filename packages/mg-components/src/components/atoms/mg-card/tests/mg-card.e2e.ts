import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';

const createHTML = (args, slot = '') => `<mg-card ${renderAttributes(args)}>${slot}</mg-card>`;

test.describe('mg-card', () => {
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: '.e2e-screenshot{padding:1rem}' });
  });

  [
    'short text',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    '<mg-card>Content with child card.</mg-card>',
    '<mg-card class="custom-card--info">Content with child info card.</mg-card>',
  ].forEach(slot => {
    test(`Should render with slot ${slot}`, async ({ page }) => {
      if (slot.includes('</mg-card>')) {
        await page.addStyleTag({
          content: 'mg-card:has(> mg-card){--mg-c-card-color-background:var(--mg-b-color-danger)}.custom-card--info{--mg-c-card-color-background:var(--mg-b-color-info)}',
        });
      }
      await page.setContent(createHTML({}, slot));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render with different radius sizes', async ({ page }) => {
    await page.setContent(`
      ${createHTML({ radius: 'small' }, 'Small radius')}
      ${createHTML({ radius: 'medium' }, 'Medium radius')}
      ${createHTML({ radius: 'large' }, 'Large radius')}
    `);
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
