import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
import { test } from '../../../../utils/playwright.fixture';

const defaultItems = [{ label: 'Home', href: '/', icon: 'home-outline' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }];

const createHTML = (itemsAttr: string, args: Record<string, unknown>) => `<mg-breadcrumb ${itemsAttr} ${renderAttributes(args)}></mg-breadcrumb>`;

test.describe('mg-breadcrumb', () => {
  test('Should render with default items', async ({ page }) => {
    const itemsAttr = `items='${JSON.stringify(defaultItems).replace(/'/g, "\\'")}'`;
    const html = createHTML(itemsAttr, {});

    await page.setContent(html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
