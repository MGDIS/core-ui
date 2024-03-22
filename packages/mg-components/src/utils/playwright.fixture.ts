import { test as base } from '@playwright/test';

export const test = base.extend<{ page: void }>({
  page: async ({ page }, use) => {
    // Override setContent method to keep style and script tags
    page.setContent = async (html: string) => {
      await page.evaluate((html: string) => {
        // Add content to the body
        document.body.innerHTML = `<span class="e2e-screenshot">${html}</span>`;
      }, html);
    };
    // Add lib JS
    await page.addScriptTag({ url: 'http://localhost:3333/build/mg-components.esm.js', type: 'module' });
    // Add lib CSS
    await page.addStyleTag({ url: 'http://localhost:3333/build/mg-components.css' });
    // Add screenshot CSS
    await page.addStyleTag({ content: '.e2e-screenshot{display:inline-block}' });
    // Make sure everything is loaded
    await page.waitForLoadState('networkidle');
    await page.locator('html.hydrated');
    // Use extended page
    await use(page);
  },
});
