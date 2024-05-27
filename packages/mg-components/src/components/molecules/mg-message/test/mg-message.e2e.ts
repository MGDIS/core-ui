import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { variants } from '../mg-message.conf';
import { renderAttributes } from '@mgdis/playwright-helpers';

const createHTML = (args, slot = '') => `<mg-message ${renderAttributes(args)}>${slot}</mg-message>`;

test.describe('mg-message', () => {
  variants.forEach(variant => {
    [
      '<strong>Strong</strong> content!',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ].forEach(content => {
      ['', `<mg-button slot="actions">Primary</mg-button>`].forEach(actions => {
        [true, false].forEach(closeButton => {
          if (actions && closeButton) return; // Close button and slot actions are not allowed
          test(`Should render variant ${variant} content ${content} with actions ${actions} close-button: ${closeButton}`, async ({ page }) => {
            const html = createHTML({ variant, closeButton }, `<p>${content}</p>${actions}`);
            await page.setContent(html);

            await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
          });
        });
      });
    });
  });

  test('Should render with child mg-card', async ({ page }) => {
    const html = createHTML({}, `<mg-card>child card</mg-card>`);
    await page.setContent(html);
    await page.addStyleTag({
      content: `mg-message:has(> mg-card){--mg-c-card-color-background:var(--mg-b-color-danger)}`,
    });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should hide message on close button click', async ({ page }) => {
    const html = createHTML({ closeButton: true }, `<p>Blu</p>`);
    await page.setContent(html);

    const mgMessage = page.locator('mg-message.hydrated');

    expect(await mgMessage.getAttribute('hidden')).toBeNull();

    const mgButton = mgMessage.locator('mg-button');
    await mgButton.click();

    const mgMessageHideProp = await mgMessage.evaluate(elm => (elm as HTMLMgMessageElement).hidden);

    expect(mgMessageHideProp).toEqual(true);

    await expect(mgMessage).not.toBeVisible();
  });
});
