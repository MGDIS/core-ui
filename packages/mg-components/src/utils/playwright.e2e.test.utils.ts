/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Page, expect as playwrightExpect, devices as playwrightDevices } from '@playwright/test';
import { test as playwrightTest } from './playwright.fixture';

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
