/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Page, ViewportSize, test as playwrightTest, expect as playwrightExpect, devices as playwrightDevices } from '@playwright/test';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Add mg-components to browser page
 *
 * @param page - browser page
 * @param html - html to load in page
 */
export const setPageContent = async (page: Page, html: string, viewportSize?: ViewportSize): Promise<void> => {
  // We need to add mg-components to the e2e page
  // Those solutions wasn't working to add the CSS
  // await page.addStyleTag({ url: 'http://localhost:3333/build/mg-components.css' });

  // CSS
  const css = await readFile(join(__dirname, '../../www/build/mg-components.css'), { encoding: 'utf8' });
  await page.addStyleTag({ content: css });

  // JS
  await page.addScriptTag({ url: 'http://localhost:3333/build/mg-components.esm.js', type: 'module' });

  // Set page size before style setting to prevent "resize" event to be triggered
  if (viewportSize !== undefined) await page.setViewportSize(viewportSize);

  // Set page content
  // Added the `e2e-screenshot` class to be able to do the screenshot on this specific one with
  // `await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();`
  await page.setContent(`<style>${css} .e2e-screenshot { display: inline-block; }</style><span class="e2e-screenshot">${html}</span>`);

  // Make sure everything is loaded
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('html.hydrated');
};

/**
 * playwright 'expect' function definition
 */
export const expect = playwrightExpect;

/**
 * playwright 'describe' function definition
 */
export const describe = playwrightTest.describe;

/**
 * playwright 'test' function definition
 */
export const test = playwrightTest;

/**
 * playwright 'devices' definition
 */
export const devices = playwrightDevices;

/**
 * Value to get in string
 * @param value - valut to stringify
 * @returns stringified value
 */
const valueToString = (value: unknown): string => (typeof value === 'object' ? JSON.stringify(value) : `${value}`);

/**
 * Declare page type
 */
export type PageType = Page;

/**
 * repeat test over array
 * @param array - array of test
 * @param option - test runner option
 * @returns describe iteration
 */
export const describeEach = (array: unknown[] | any, option?: 'skip' | 'only') => (title: string, cb: (param: unknown) => void) => {
  array.forEach(value => {
    const displayTitle = title.replace('%s', valueToString(value));
    const fn = () => cb(value);
    if (Boolean(option)) describe[option](displayTitle, fn);
    else describe(displayTitle, fn);
  });
};

/**
 * repeat test over array
 * @param array - array of test
 * @param option - test runner option
 * @returns test iteration
 */
export const testEach = (array: unknown[] | any, option?: 'skip' | 'only') => (title: string, cb: (page: PageType, param: unknown) => Promise<void>) => {
  array.forEach(value => {
    const displayTitle = title.replace('%s', valueToString(value));
    const fn = async ({ page }) => cb(page, value);
    if (Boolean(option)) test[option](displayTitle, fn);
    else test(displayTitle, fn);
  });
};

/**
 * Update .e2e-screenshot style for screenshot needs
 * @param page - playwright Page
 * @param params - css properties to apply
 * @returns class style definition
 */
export const updateScreenshotClass = async (page: Page, params: unknown): Promise<void> =>
  page.evaluate(params => {
    const css = `.e2e-screenshot { ${Object.keys(params)
      .map(key => `${key}: ${typeof params[key] === 'string' ? params[key] : ''}`)
      .join(';')} }`;
    const body = document.getElementsByTagName('body')[0];
    const style = document.createElement('style');
    body.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }, params);
