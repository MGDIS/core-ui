import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes, renderProperties } from '@mgdis/playwright-helpers';

const baseArgs = {
  identifier: 'identifier',
  label: 'legend',
  items: ['batman', 'robin', 'joker', 'bane'],
};

const createHTML = args => `<mg-input-radio ${renderAttributes(args)}></mg-input-radio>`;

test.describe('mg-input-radio', () => {
  test(`Should render with template ${renderAttributes(baseArgs)}`, async ({ page }) => {
    const html = createHTML(baseArgs);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(baseArgs, `[identifier="${baseArgs.identifier}"]`) });

    await page.waitForSelector('mg-input-radio.hydrated');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    const radio = page.locator('.mg-c-input__input-group input').first();
    await radio.press('Space');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('ArrowDown');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  [
    { labelOnTop: true, helpText: 'HelpText Message' },
    { inputVerticalList: true, helpText: 'HelpText Message' },
    { labelOnTop: true, inputVerticalList: true, helpText: 'HelpText Message' },
    { labelHide: true },
    { helpText: 'HelpText Message' },
    { value: 'batman', helpText: '<mg-icon icon="user" size="small"></mg-icon> Welcome batman' },
    { required: true, helpText: 'HelpText Message', value: 'batman' },
    { required: true, readonly: true, helpText: 'HelpText Message', value: 'batman' },
    { required: true, disabled: true, helpText: 'HelpText Message', value: 'batman' },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, ...args };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach((labelOnTop: boolean) => {
    test.describe(`labelOnTop: ${labelOnTop}`, () => {
      test('render with tooltip', async ({ page }) => {
        const componentArgs = { ...baseArgs, labelOnTop, tooltip: 'Tooltip message' };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.waitForSelector('mg-input-radio.hydrated');

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.keyboard.down('Tab');
        if (!labelOnTop) {
          await page.keyboard.down('Tab');
        }

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test(`render inside a div.mg-form-group`, async ({ page }) => {
        const componentArgs = {
          ...baseArgs,
          tooltip: 'Tooltip message',
          labelOnTop,
          label: 'long label long label long label long label long label long label long label long label long label long label long label',
        };
        const html = createHTML(componentArgs);
        await page.setContent(`<div class="mg-form-group">${html}</div>`);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.waitForSelector('mg-input-radio.hydrated');

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test('Ensure component fit in width 200px', async ({ page }) => {
        const componentArgs = { ...baseArgs, labelOnTop };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.setViewportSize({ width: 200, height: 100 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test('render longer intems list inline', async ({ page }) => {
    const componentArgs = {
      ...baseArgs,
      items: ['batman', 'robin', 'joker', 'bane', 'ironman', 'spiderman', 'captain america', 'thor', 'vision', 'antman', 'black widow', 'black panther'],
    };
    const html = createHTML(componentArgs);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  [
    { readonly: true },
    { value: 'batman' },
    { value: 'batman', readonly: true },
    { value: 'batman', readonly: true, labelOnTop: true },
    { disabled: true },
    { value: 'batman', disabled: true },
    { tooltip: 'blu', tooltipPosition: 'label' },
    { tooltip: 'blu', tooltipPosition: 'input', labelOnTop: true },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, ...args };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [{}, { lang: 'fr' }].forEach(args => {
    test(`Should render error when leaving an empty input ${renderAttributes(args)}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, ...args, required: true };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await page.waitForSelector('mg-input-radio.hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        const componentArgs = { ...baseArgs, ...args };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
