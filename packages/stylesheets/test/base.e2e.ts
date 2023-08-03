import { test, expect } from '@playwright/test';

test('Base stylesheet', async ({ page }) => {
  page.goto(`file://${__dirname}/base.html`);
  await expect(page).toHaveScreenshot({ fullPage: true });
});
