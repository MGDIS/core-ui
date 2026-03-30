import { expect } from '@playwright/test';
import { renderProperties } from '@mgdis/core-ui-helpers/dist/playwright';
import { test } from '../../../../utils/playwright.fixture';

const defaultItems = [{ label: 'Home', href: '/', icon: 'home-outline' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }];

const longTextItems = [
  { label: 'Home', href: '/', icon: 'home-outline' },
  {
    label:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation',
    href: '/long',
  },
  { label: 'Another very long breadcrumb item label that might wrap or truncate on small screens', href: '/another' },
  { label: 'Current' },
];

const setBreadcrumb = async (page, items: typeof defaultItems) => {
  await page.setContent('<mg-breadcrumb></mg-breadcrumb>');
  await page.addScriptTag({
    content: renderProperties({ items }, 'mg-breadcrumb'),
  });
  await page.locator('mg-breadcrumb.hydrated').waitFor();
};

test.describe('mg-breadcrumb', () => {
  test('Should render with default items', async ({ page }) => {
    await setBreadcrumb(page, defaultItems);
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('responsive', () => {
    test('Should render correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 400 });
      await setBreadcrumb(page, defaultItems);
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('long text', () => {
    test('Should render with long labels', async ({ page }) => {
      await setBreadcrumb(page, longTextItems);
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test('Should render with long labels on narrow viewport', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 300 });
      await setBreadcrumb(page, longTextItems);
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('focus', () => {
    test('Should show focus on second link when tabbed twice', async ({ page }) => {
      await setBreadcrumb(page, defaultItems);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
