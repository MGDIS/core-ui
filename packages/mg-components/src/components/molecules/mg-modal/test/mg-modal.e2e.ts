import { setPageContent, expect, describe, describeEach, testEach, PageType, test } from '../../../../utils/playwright.e2e.test.utils';
import { MgModalType, actions, contents, createHTML } from './mg-modal.e2e.template';

describe('mg-modal', () => {
  const slotsToTests = actions.flatMap(action => contents.map(content => ({ action, content })));
  describeEach(slotsToTests)('render with slots %s', slots => {
    testEach([
      { closeButton: false },
      { closeButton: true },
      {
        closeButton: true,
        modalTitle:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat',
      },
    ])('Should render %s', async (page: PageType, args: MgModalType) => {
      await setPageContent(page, createHTML(args, slots));

      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();
    });
  });

  test('Should render hidden modal', async ({ page }) => {
    await setPageContent(page, createHTML({ hidden: true }));

    await expect(page.locator('body')).toHaveScreenshot();
  });

  describe('style', () => {
    test('Should render with child mg-card', async ({ page }) => {
      await setPageContent(
        page,
        `<mg-modal modal-title="child mg-card" class="custom-modal-card">
  <mg-card slot="content">child card</mg-card>
</mg-modal>
<style>.custom-modal-card {--mg-c-card-background:var(--mg-b-color-danger)}</style>`,
      );

      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();
    });
  });

  describe('navigation', () => {
    test('Should trigger modal and close modal.', async ({ page }) => {
      await setPageContent(page, createHTML({ closeButton: true, hidden: true }, { action: true, content: 'short' }));

      await expect(page.locator('body')).toHaveScreenshot();

      // open modal
      await page.locator('#modal-button').click();

      await expect(page.locator('.mg-c-modal')).toHaveScreenshot();

      // close modal
      await page.locator('.mg-c-modal mg-button').click();

      await expect(page.locator('body')).toHaveScreenshot();
    });

    test('Should navigate with keyboard', async ({ page }) => {
      await setPageContent(page, createHTML({ closeButton: true, hidden: true }, { action: true, content: 'short' }));

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
