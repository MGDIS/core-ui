import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
});

test('Base', async ({ page }) => {
  page.goto(`file://${__dirname}/base.html`);
  await page.locator('h1').first().waitFor({ state: 'visible' });
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Layout', async ({ page }) => {
  page.goto(`file://${__dirname}/layout.html`);
  await page.locator('h1').first().waitFor({ state: 'visible' });
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Utils', async ({ page }) => {
  page.goto(`file://${__dirname}/utils.html`);
  await page.locator('h1').first().waitFor({ state: 'visible' });
  await expect(page).toHaveScreenshot({ fullPage: true });
});
