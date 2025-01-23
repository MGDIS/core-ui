import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { actions, contents, setPageContent } from './mg-modal.e2e.template';
import { renderAttributes } from '@mgdis/playwright-helpers';

const slotsToTests = actions.flatMap(action => contents.map(content => ({ action, content })));

test.describe('mg-modal', () => {
  slotsToTests.forEach(slots => {
    test.describe(`render with slots: action:"${slots.action}" content:${slots.content}`, () => {
      [
        { closeButton: false, open: true },
        { closeButton: true, open: true },
        {
          closeButton: true,
          modalTitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
          open: true,
        },
      ].forEach(args => {
        test(`Should render ${renderAttributes(args)}`, async ({ page }) => {
          await setPageContent(page, args, slots);

          await expect(page.locator('body')).toHaveScreenshot();
        });
      });
    });
  });

  test('Should render hidden modal', async ({ page }) => {
    await setPageContent(page, {}, { content: 'short' });

    await expect(page.locator('body')).toHaveScreenshot();
  });

  test.describe('style', () => {
    [
      { modalTitle: 'mg-card', content:'<mg-card>child card</mg-card>' },
      { modalTitle: 'mg-card > mg-message', content:'<mg-card><mg-message>child message</mg-message></mg-card>' },
      { modalTitle: 'mg-message', content: '<mg-message identifier="identifier"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></mg-message>' },
      { modalTitle: 'mg-panel', content:'<mg-panel panel-title="panel title" expanded>panel content</mg-panel>' },
      { modalTitle: 'mg-panel > mg-card', content:'<mg-panel panel-title="panel title" expanded><mg-card>child card</mg-card></mg-panel>' },
      { modalTitle: 'mg-panel > mg-card > mg-message', content:'<mg-panel panel-title="panel title" expanded><mg-card><mg-message>child card</mg-message></mg-card></mg-panel>' },
    ].forEach(({modalTitle, content}) => {
      test(`Should render with slot ${modalTitle}`, async ({ page }) => {
        await setPageContent(
          page,
          { modalTitle , class: 'custom-modal-card', open: true },
          {
            content,
            open: true,
          },
        );
  
        if(content.includes('mg-card')) {
          await page.addStyleTag({ content: '.custom-modal-card{--mg-c-card-color-background:var(--mg-b-color-danger)}' });
        }
  
        await expect(page.locator('body')).toHaveScreenshot();
      });
    })
  });

  test.describe('navigation', () => {
    test('Should trigger modal and close modal.', async ({ page }) => {
      await setPageContent(page, { closeButton: true }, { action: true, content: 'short' });

      await expect(page.locator('body')).toHaveScreenshot();

      // open modal
      await page.locator('#modal-button').click();

      await expect(page.locator('body')).toHaveScreenshot();

      // close modal
      await page.locator('.mg-c-modal mg-button').click();

      await expect(page.locator('body')).toHaveScreenshot();
    });

    test('Should navigate with keyboard', async ({ page }) => {
      await setPageContent(page, { closeButton: true }, { action: true, content: 'short' });
      await expect(page.locator('body')).toHaveScreenshot();

      // open modal
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('body')).toHaveScreenshot();

      // loop in modal
      await page.keyboard.press('Tab');
      await expect(page.locator('body')).toHaveScreenshot();
      await page.keyboard.press('Tab'); // First tab goes to URL bar
      await page.keyboard.press('Tab');
      await expect(page.locator('body')).toHaveScreenshot();

      // close modal
      await page.keyboard.press('Enter');
      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
