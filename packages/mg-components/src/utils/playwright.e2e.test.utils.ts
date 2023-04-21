import { Page, ViewportSize } from '@playwright/test';
import { readFile } from 'fs/promises';

/**
 * Add mg-components to browser page
 *
 * @param {Page} page browser page
 * @param {string} html html to load in page
 */
export const setPageContent = async (page: Page, html: string, viewportSize?: ViewportSize): Promise<void> => {
  /**
   * We need to add mg-components to the e2e page
   *
   * Those solutions wasn't working to add the CSS
   * await page.addStyleTag({ url: 'http://localhost:3333/build/mg-components.css' });
   */

  // CSS
  const css = await readFile('./www/build/mg-components.css', { encoding: 'utf8' });
  await page.addStyleTag({ content: css });

  // JS
  await page.addScriptTag({ url: 'http://localhost:3333/build/mg-components.esm.js', type: 'module' });

  // Set page content
  // Added the `e2e-screenshot` class to be able to do the screenshot on this specific one with
  // `await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();`
  await page.setContent(`<style>${css}</style><div class="e2e-screenshot">${html}</div>`);

  // Set page size
  if (viewportSize) await page.setViewportSize(viewportSize);

  // Make sure everything is loaded
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('html.hydrated');
};
