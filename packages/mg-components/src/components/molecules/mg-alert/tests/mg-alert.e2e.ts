import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { variantStyles, variants } from '../mg-alert.conf';
import { renderAttributes } from '@mgdis/core-ui-helpers/playwright';

const createHTML = (args, slot = '') => `<mg-alert ${renderAttributes(args)}>${slot}</mg-alert>`;

test.describe('mg-alert', () => {
  variants.forEach(variant => {
    test.describe(variant, () => {
      variantStyles.forEach(variantStyle => {
        test.describe(variantStyle, () => {
          [
            '<strong>Strong</strong> content!',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          ].forEach(content => {
            ['', `<mg-button slot="actions">Primary</mg-button>`].forEach(actions => {
              test(`Should render variant ${variant} content ${content} with actions ${actions}`, async ({ page }) => {
                const html = createHTML({ variant, variantStyle }, `<p>${content}</p>${actions}`);
                await page.setContent(html);

                await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
              });
            });
          });
        });
      });
    });
  });

  test('Should render with child mg-card', async ({ page }) => {
    const html = createHTML({}, `<mg-card>child card</mg-card>`);
    await page.setContent(html);
    await page.addStyleTag({
      content: `mg-alert:has(> mg-card){--mg-c-card-color-background:var(--mg-b-color-danger)}`,
    });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should hide alert on close button click', async ({ page }) => {
    const html = createHTML({}, `<p>Blu</p>`);
    await page.setContent(html);

    const mgAlert = page.locator('mg-alert.hydrated');

    expect(await mgAlert.getAttribute('hidden')).toBeNull();

    const mgButton = mgAlert.locator('mg-button');
    await mgButton.click();

    const mgAlertHideProp = await mgAlert.evaluate(elm => (elm as HTMLMgAlertElement).hidden);

    expect(mgAlertHideProp).toEqual(true);

    await expect(mgAlert).not.toBeVisible();
  });
});
