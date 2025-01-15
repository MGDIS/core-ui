import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../../utils/playwright.fixture';

const baseProps = { identifier: 'identifier', label: 'label' };

const createHTML = args => `<mg-input-date ${renderAttributes(args)}></mg-input-date>`;

test.describe('mg-input-date', () => {
  [{}, { labelOnTop: true }, { labelHide: true }, { placeholder: 'placeholder', helpText: 'HelpText Message' }].forEach(props => {
    test(`render props ${renderAttributes(props)} without tooltip`, async ({ page }) => {
      await page.setContent(createHTML({ ...baseProps, ...props }));
      await page.locator('mg-input-date.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('0');
      await page.keyboard.down('2');
      await page.keyboard.down('0');
      await page.keyboard.down('6');
      await page.keyboard.down('1');
      await page.keyboard.down('9');
      await page.keyboard.down('8');
      await page.keyboard.down('2');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach(labelOnTop => {
    test(`render with tooltip, label-on-top="${labelOnTop}"`, async ({ page }) => {
      await page.setContent(createHTML({ ...baseProps, tooltip: 'Tooltip message', labelOnTop }));
      await page.locator('mg-input-date.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab'); // Display tootip when labelOnTop
      if (!labelOnTop) {
        await page.keyboard.down('Tab');
        await page.keyboard.down('Tab');
        await page.keyboard.down('Tab');
        await page.keyboard.down('Tab'); // Display tootip when !labelOnTop
      }

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [
    { readonly: true },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input', value: '1982-06-02' },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'label', value: '1982-06-02' },
    { value: '1982-06-02' },
    { value: '1982-06-02', readonly: true },
    { disabled: true },
    { value: '1982-06-02', disabled: true },
    { value: '1982-06-02', readonly: true, lang: 'fr' },
    { helpText: `<mg-icon icon='user' size='small'></mg-icon> Welcome batman` },
    { value: '1982-06-02', helpText: 'My help text', required: true },
    { value: '1982-06-02', helpText: 'My help text', required: true, readonly: true },
    { value: '1982-06-02', helpText: 'My help text', required: true, disabled: true },
    { tooltip: 'Batman is a DC Comics license', tooltipPosition: 'label' },
    { tooltip: 'Batman is a DC Comics license', tooltipPosition: 'input', labelOnTop: true },
  ].forEach(props => {
    test(`render with template, ${renderAttributes(props)}`, async ({ page }) => {
      const html = createHTML({ ...baseProps, ...props });
      await page.setContent(html);
      await page.locator('mg-input-date.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [undefined, 'fr'].forEach(lang => {
    test(`render error when leaving an empty required input, lang=${lang}`, async ({ page }) => {
      await page.setContent(createHTML({ ...baseProps, lang, required: true }));
      await page.locator('mg-input-date.hydrated').waitFor();

      await page.keyboard.down('Tab'); // Enter input: day
      await page.keyboard.down('Tab'); // month
      await page.keyboard.down('Tab'); // year
      await page.keyboard.down('Tab'); // calendar
      await page.keyboard.down('Tab'); // tooltip

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  ['', 'My help text use pattern {pattern} for date: {date}. {defaultHelpText}'].forEach(helpText => {
    test(`Should render error when leaving input with a wrong date, help-text="${helpText}"`, async ({ page }) => {
      await page.setContent(createHTML({ ...baseProps, helpText }));
      await page.locator('mg-input-date.hydrated').waitFor();

      await page.keyboard.down('Tab'); // Enter input: day

      await page.keyboard.down('0');
      await page.keyboard.down('2');
      await page.keyboard.down('0');
      await page.keyboard.down('6');

      await page.keyboard.down('Tab'); // calendar
      await page.keyboard.down('Tab'); // exit tooltip

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [false, true].forEach(labelOnTop => {
    test(`Ensure component fit in width 200px, label-on-top="${labelOnTop}"`, async ({ page }) => {
      await page.setContent(createHTML({ ...baseProps, labelOnTop }));
      await page.setViewportSize({ width: 200, height: 100 });
      await page.locator('mg-input-date.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('fr', () => {
    test.use({
      locale: 'fr-FR',
    });

    ['', 'My help text use pattern {pattern} for date: {date}. {defaultHelpText}'].forEach(helpText => {
      test(`Should render error when leaving input with a wrong date, help-text="${helpText}"`, async ({ page }) => {
        await page.setContent(createHTML({ ...baseProps, helpText }));
        await page.locator('mg-input-date.hydrated').waitFor();

        await page.keyboard.down('Tab'); // Enter input: day

        await page.keyboard.down('0');
        await page.keyboard.down('2');
        await page.keyboard.down('0');
        await page.keyboard.down('6');

        await page.keyboard.down('Tab'); // calendar
        await page.keyboard.down('Tab'); // exit tooltip

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        const componentArgs = { ...baseProps, ...args };
        const html = createHTML(componentArgs);
        await page.setContent(html);

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test('Should reset value and error when calling reset method', async ({ page }) => {
    const html = createHTML({
      ...baseProps,
      min: '1980-01-01',
      max: '2024-12-31',
      value: '2024-12-24',
    });
    await page.setContent(html);

    await page.locator('mg-input-date.hydrated').waitFor();

    // Enter a value that doesn't match the pattern
    await page.locator('mg-input-date input').fill('2025-01-01'); // Invalid date
    await page.locator('mg-input-date input').blur(); // Trigger error

    // Check state with value and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Call reset method
    await page.evaluate(() => {
      document.querySelector('mg-input-date').reset();
    });

    // Check that the input has been reset and the error has been removed
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
  test('Should udpate error with displayError() after value update with props', async ({page}) => {
    const html = createHTML({
      ...baseProps,
      required: true,
      value: '2025-01-01'
    });
    await page.setContent(html);

    await page.locator('mg-input-date.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value programaticaly and display required error
    await page.locator('mg-input-date').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = '';
      await elm.displayError()
    });

    // Check state with value and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value programaticaly and remove required error
    await page.locator('mg-input-date').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = '2025-12-01';
      await elm.displayError()
    });

    // Check state with value and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  })
});
