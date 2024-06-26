import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { actions, contents, setPageContent } from './mg-modal.e2e.template';
import { renderAttributes } from '@mgdis/playwright-helpers';

const slotsToTests = actions.flatMap(action => contents.map(content => ({ action, content })));

test.describe('mg-modal', () => {
  slotsToTests.forEach(slots => {
    test.describe(`render with slots: action:"${slots.action}" content:${slots.content}`, () => {
      [
        { closeButton: false, hide: false },
        { closeButton: true, hide: false },
        {
          closeButton: true,
          modalTitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
        },
      ].forEach(args => {
        test(`Should render ${renderAttributes(args)}`, async ({ page }) => {
          await setPageContent(page, args, slots);

          await expect(page.locator(args.hide ? 'body' : '.mg-c-modal')).toHaveScreenshot();
        });
      });
    });
  });

  test('Should render hidden modal', async ({ page }) => {
    await setPageContent(page, { hide: true });

    await expect(page.locator('body')).toHaveScreenshot();
  });

  test.describe('style', () => {
    test('Should render with child mg-card', async ({ page }) => {
      await setPageContent(
        page,
        { modalTitle: 'child mg-card', class: 'custom-modal-card' },
        {
          content: `<mg-card slot="content">child card</mg-card>`,
        },
      );

      await page.addStyleTag({ content: '.custom-modal-card {--mg-card-background: hsl(var(--color-danger));}' });

      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();
    });

    test('Should render with mg-message slot', async ({ page }) => {
      await setPageContent(
        page,
        { modalTitle: 'with mg-message slot' },
        {
          content: `<mg-message identifier="identifier"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></mg-message>`,
        },
      );

      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();
    });
  });

  test.describe('navigation', () => {
    test('Should trigger modal and close modal.', async ({ page }) => {
      await setPageContent(page, { closeButton: true, hide: true }, { action: true, content: 'short' });

      await expect(page.locator('body')).toHaveScreenshot();

      // open modal
      await page.locator('#modal-button').click();

      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      // close modal
      await page.locator('.mg-c-modal mg-button').click();

      await expect(page.locator('body')).toHaveScreenshot();
    });

    test('Should navigate with keyboard', async ({ page }) => {
      await setPageContent(page, { closeButton: true, hide: true }, { action: true, content: 'short' });
      await expect(page.locator('body')).toHaveScreenshot();

      // open modal
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      // loop in modal
      await page.keyboard.press('Tab');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      // close modal
      await page.keyboard.press('Enter');
      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
