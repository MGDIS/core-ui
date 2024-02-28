import { test as base } from '@playwright/test';
import { readFile } from 'fs/promises';
import { join } from 'path';

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
    // Add Styles CSS - TODO : remove
    const css = await readFile(join(__dirname, '../../../styles/dist/styles.css'), { encoding: 'utf8' });
    await page.addStyleTag({ content: css });

    // Add screenshot CSS
    await page.addStyleTag({ content: 'body{margin:0}.e2e-screenshot{display:inline-block}' });
    // Make sure everything is loaded
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('html.hydrated');
    // Use extended page
    await use(page);
  },
});
