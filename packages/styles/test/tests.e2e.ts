import { test, expect } from '@playwright/test';

test('Base', async ({ page }) => {
  page.goto(`file://${__dirname}/base.html`);
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Layout', async ({ page }) => {
  page.goto(`file://${__dirname}/layout.html`);
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test('Utils', async ({ page }) => {
  page.goto(`file://${__dirname}/utils.html`);
  await expect(page).toHaveScreenshot({ fullPage: true });
});
