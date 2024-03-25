import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/playwright-helpers';

const createHTML = args =>
  `<mg-details ${renderAttributes(args)}><span slot="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span><p slot="details">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></mg-details>`;

const baseArgs = { toggleClosed: 'Show details', toggleOpened: 'Hide details' };

test.describe('mg-details', () => {
  [{}, { hideSummary: true }].forEach(args => {
    test(`Should toggle details ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await page.setViewportSize({ width: 700, height: 100 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should not render toggle text when window size is under 700px', async ({ page }) => {
    const html = createHTML({ ...baseArgs });
    await page.setContent(html);

    await page.setViewportSize({ width: 650, height: 100 });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  [0, 5].forEach(space => {
    test(`Should update space (${space}) between summary and details`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, expanded: true });
      await page.setContent(html);

      await page.addStyleTag({ content: `mg-details{--mg-details-spacing:${space}rem})` });

      await page.setViewportSize({ width: 700, height: 100 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
