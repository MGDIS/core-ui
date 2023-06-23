import { setPageContent, describe, testEach, expect, PageType, test } from '../../../../utils/playwright.e2e.test.utils';
import { renderAttributes } from '../../../../utils/e2e.test.utils';

const content =
  '<span slot="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span><p slot="details">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';

const baseArgs = { 'toggle-closed': 'Show details', 'toggle-opened': 'Hide details' };

const htmlContent = (args, style?) =>
  `<style>*, *:before, *:after { box-sizing: border-box; } .e2e-screenshot { width: 100%; } ${style}</style><mg-details ${renderAttributes(args)}>${content}</mg-details>`;

describe('mg-details', () => {
  testEach([{}, { 'hide-summary': '' }])('Should toggle details %s', async (page: PageType, args: object) => {
    await setPageContent(page, htmlContent({ ...baseArgs, ...args }));

    expect(page.locator('mg-details.hydrated')).toBeDefined();

    await page.setViewportSize({ width: 700, height: 100 });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    page.keyboard.press('Tab');
    page.keyboard.press('Space');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should not render toggle text when window size is under 700px', async ({ page }) => {
    await setPageContent(page, htmlContent({ ...baseArgs }));

    await page.setViewportSize({ width: 650, height: 100 });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  testEach([0, 5])('Should update space (%s) between summary and details', async (page, args) => {
    await setPageContent(
      page,
      htmlContent(
        { ...baseArgs },
        `mg-details {
        --mg-details-spacing: ${args}rem;
      })`,
      ),
    );

    await page.setViewportSize({ width: 700, height: 100 });

    page.keyboard.press('Tab');
    page.keyboard.press('Space');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
