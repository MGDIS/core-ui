import { Page } from '@playwright/test';
import { readFile } from 'fs/promises';

export const setPageContent = async (page: Page): Page => {
  // <link rel="stylesheet" href="/build/mg-components.css" />
  // <script type="module" src="/build/mg-components.esm.js"></script>

  const css = await readFile('./www/build/mg-components.css', { encoding: 'utf8' });
  await page.addStyleTag({ content: css });

  // const requestPromise = page.waitForResponse('http://localhost:3333/build/mg-components.css');

  // await page.addStyleTag({ url: 'http://localhost:3333/build/mg-components.css' });
  await page.addScriptTag({ url: 'http://localhost:3333/build/mg-components.esm.js', type: 'module' });

  await page.setContent(`<style>${css}</style><div class="e2e-screenshot">${html}</div>`);

  // await requestPromise;
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('html.hydrated');

  console.log(await page.content());
  await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
};
