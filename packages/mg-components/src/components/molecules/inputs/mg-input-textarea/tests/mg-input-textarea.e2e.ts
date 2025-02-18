import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/playwright-helpers';

const createHTML = props => {
  return `<mg-input-textarea ${renderAttributes(props)}></mg-input-textarea>`;
};

const baseArgs = { identifier: 'identifier', label: 'label' };

test.describe('mg-input-textarea', () => {
  [{}, { labelOnTop: true }, { labelHide: true }, { placeholder: 'placeholder', helpText: 'HelpText Message' }].forEach(args => {
    test(`without tooltip ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await page.locator('mg-input-textarea.hydrated').waitFor();

      const input = page.locator('textarea');

      // Hide caret for screenshots
      await page.locator('mg-input-textarea textarea').evaluate(elm => (elm.style.caretColor = 'transparent'));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await input.press('KeyB');
      await input.press('KeyL');
      await input.press('KeyU');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach(labelOnTop => {
    test.describe(`labelOnTop: ${labelOnTop}`, () => {
      test('with tooltip', async ({ page }) => {
        const html = createHTML({ ...baseArgs, tooltip: 'Tooltip message', labelOnTop });
        await page.setContent(html);

        await page.locator('mg-input-textarea.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.keyboard.down('Tab');
        if (!labelOnTop) {
          await page.keyboard.down('Tab');
        }

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      [16, 4, 2].forEach(mgWidth => {
        test(`with mgWidth ${mgWidth}`, async ({ page }) => {
          const html = createHTML({
            ...baseArgs,
            value: 'M'.repeat(mgWidth),
            mgWidth,
            maxlength: mgWidth * 3, // 3 rows by default
            labelOnTop,
          });
          await page.setContent(html);

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      test('Ensure component fit in width 200px with label-on-top', async ({ page }) => {
        const html = createHTML({
          ...baseArgs,
          labelOnTop,
        });
        await page.setContent(html);

        await page.setViewportSize({ height: 100, width: 200 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [
    { readonly: true },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: 'blu', readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: 'blu', readonly: true, tooltip: 'tooltip', tooltipPosition: 'label' },
    { value: 'blu' },
    { value: 'blu', readonly: true },
    { value: 'blu', readonly: true, labelOnTop: true },
    { disabled: true },
    { value: 'blu', disabled: true },
    { value: 'resizable', resizable: 'both' },
    { value: 'batman', helpText: '<mg-icon icon="user" size="small"></mg-icon> Welcome batman' },
    { value: 'blu', helpText: 'HelpText Message', required: true },
    { value: 'blu', helpText: 'HelpText Message', required: true, readonly: true },
    { value: 'blu', helpText: 'HelpText Message', required: true, disabled: true },
    { value: 'blu', tooltip: 'blu', tooltipPosition: 'label' },
    { value: 'blu', tooltip: 'blu', tooltipPosition: 'input', labelOnTop: true },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [{}, { lang: 'fr' }].forEach(args => {
    test(`Should render error when leaving an empty required input ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args, required: true });
      await page.setContent(html);

      await page.locator('mg-input-textarea.hydrated').waitFor();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test(`Should render error when leaving input with a non matching pattern value`, async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      pattern: '[a-z]*',
      patternErrorMessage: 'Vous ne pouvez saisir que des lettres minuscules.',
    });
    await page.setContent(html);

    await page.locator('mg-input-textarea.hydrated').waitFor();

    const input = page.locator('mg-input-textarea textarea');

    await page.keyboard.down('Tab');

    await input.press('KeyB');
    await input.press('KeyL');
    await input.press('KeyU');
    await input.press('1');

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        const html = createHTML({ ...baseArgs, ...args });
        await page.setContent(html);

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test('Should display content with line-break', async ({ page }) => {
    const html = createHTML({ ...baseArgs, value: 'Blu\nBli\nBla\nBlo' });
    await page.setContent(html);

    await page.locator('mg-input-textarea.hydrated').waitFor();

    // Initial state
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    // Set Readonly
    await page.locator('mg-input-textarea').evaluate((elm: HTMLMgInputTextareaElement) => {
      elm.readonly = true;
    });
    // Readonly state
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  [true, false].forEach(characterLeftHide => {
    test(`render input with characterLeftHide=${characterLeftHide}`, async ({ page }) => {
      const html = createHTML({
        ...baseArgs,
        characterLeftHide,
      });
      await page.setContent(html);

      await page.locator('mg-input-textarea.hydrated').waitFor();

      await page.keyboard.press('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should reset value and error when calling reset method', async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      pattern: '.*!.*', // Requires an exclamation mark
      patternErrorMessage: "Le texte doit contenir un point d'exclamation (!)",
    });
    await page.setContent(html);

    await page.locator('mg-input-textarea.hydrated').waitFor();

    // Enter a value that doesn't match the pattern
    await page.locator('mg-input-textarea textarea').fill('Chase'); // Invalid value
    await page.locator('mg-input-textarea textarea').blur(); // Trigger error

    // Check state with value and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Call reset method
    await page.evaluate(() => {
      document.querySelector('mg-input-textarea').reset();
    });

    // Check that the input has been reset and the error has been removed
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should udpate error with displayError() after value update with props', async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      required: true,
      value: 'Batman',
    });
    await page.setContent(html);

    await page.locator('mg-input-textarea.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Programaticaly remove value to display required error message
    await page.locator('mg-input-textarea').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = '';
      await elm.displayError();
    });

    // Check state
    // - without value
    // - with error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value from JS and remove required error
    await page.locator('mg-input-textarea').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = 'Hello Batman';
      await elm.displayError();
    });

    // Check state
    // - with value
    // - without error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
