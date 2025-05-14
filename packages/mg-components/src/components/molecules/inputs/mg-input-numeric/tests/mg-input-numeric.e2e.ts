import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
import { test } from '../../../../../utils/playwright.fixture';
import { formats, types } from '../mg-input-numeric.conf';

const baseArgs = {
  identifier: 'identifier',
  label: 'label',
};

const createHTML = (args, slot = '') => `<mg-input-numeric ${renderAttributes(args)}>${slot}</mg-input-numeric>`;

test.describe('mg-input-numeric', () => {
  [{}, { labelOnTop: true }, { labelHide: true }, { placeholder: 'placeholder', helpText: 'HelpText Message' }, { type: 'integer' }].forEach(addedArgs => {
    test(`render ${renderAttributes(addedArgs)}`, async ({ page }) => {
      const args = { ...baseArgs, ...addedArgs };
      const html = createHTML(args);
      await page.setContent(html);

      const input = page.locator('mg-input-numeric.hydrated');

      await input.evaluate(elm => {
        elm.shadowRoot.querySelector('input').style.caretColor = 'transparent';
      });

      // initial state
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      // focus
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await input.press('1');
      await input.press('2');
      await input.press('3');
      await input.press('4');
      await input.press('5');
      await input.press(',');
      await input.press('6');
      await input.press('7');

      // filled
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [
    { readonly: true },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: '123,45', readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: '123,45', readonly: true, tooltip: 'tooltip', tooltipPosition: 'label' },
    { value: '123,45', readonly: true },
    { value: '123,45', readonly: true, disabled: true },
    { disabled: true },
    { value: '123,45', disabled: true },
    { value: '123,45', lang: 'fr' },
    { value: '123,45', lang: 'fr', format: 'currency' },
    { value: '123,45', lang: 'fr', format: 'currency', currency: 'EUR' },
    { value: '123,45', readonly: true, lang: 'fr' },
    { value: '123,45', readonly: true, lang: 'fr', format: 'currency' },
    { value: '123,45', readonly: true, lang: 'fr', format: 'currency', currency: 'EUR' },
    { value: '123,45', helpText: '<mg-icon icon="user" size="small"></mg-icon> Welcome batman' },
    { value: '123,45', helpText: 'HelpText Message', required: true },
    { value: '123,45', helpText: 'HelpText Message', required: true, readonly: true },
    { value: '123,45', helpText: 'HelpText Message', required: true, disabled: true },
    { value: '123,45', tooltip: 'blu', tooltipPosition: 'label' },
    { value: '123,45', tooltip: 'blu', tooltipPosition: 'input', labelOnTop: true },
  ].forEach(addedArgs => {
    test(`Should render template ${renderAttributes(addedArgs)}`, async ({ page }) => {
      const args = { ...baseArgs, ...addedArgs };
      const html = createHTML(args);
      await page.setContent(html);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render currency symbol', async ({ page }) => {
    const args = { ...baseArgs, format: 'currency' };
    const html = createHTML(args);
    await page.setContent(html);

    await page.keyboard.down('Tab');

    const input = page.locator('input');
    await input.press('1');
    await input.press('2');
    await input.press('3');
    await input.press('4');
    await input.press('5');
    await input.press(',');
    await input.press('6');
    await input.press('7');

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  [{}, { lang: 'fr' }].forEach(addedArgs => {
    test(`Should render error when leaving an empty required input ${renderAttributes(addedArgs)}`, async ({ page }) => {
      const args = { ...baseArgs, ...addedArgs, required: true };
      const html = createHTML(args);
      await page.setContent(html);

      await page.locator('mg-input-numeric.hydrated').waitFor();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [{ min: '120' }, { max: '100' }, { min: '10', max: '100' }].forEach(addedArgs => {
    test(`Should render error when value does not respect min max attributes ${renderAttributes(addedArgs)}`, async ({ page }) => {
      const args = { ...baseArgs, ...addedArgs };
      const html = createHTML(args);
      await page.setContent(html);

      await page.locator('mg-input-numeric.hydrated').waitFor();

      await page.keyboard.down('Tab');

      const input = page.locator('input');
      await input.press('1');
      await input.press('1');
      await input.press('0');

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should not allow invalid characters', async ({ page }) => {
    const html = createHTML(baseArgs);
    await page.setContent(html);

    await page.locator('mg-input-numeric.hydrated').waitFor();

    await page.keyboard.down('Tab');

    const input = page.locator('input');
    await input.press('1');
    await input.press('KeyB'); // Should not be included
    await input.press('2');
    await input.press('KeyL'); // Should not be included
    await input.press('3');
    await input.press('KeyU'); // Should not be included
    await input.press('4');
    await input.press('5');
    await input.press('6');
    await input.press('7');
    await input.press('8');
    await input.press('9');
    await input.press('0');
    await input.press('1');
    await input.press('2');
    await input.press('3');
    await input.press('4'); // Should not be included
    await input.press(',');
    await input.press('.'); // Should not be included
    await input.press('4');
    await input.press('5');
    await input.press('6'); // Should not be included

    const value = await input.inputValue();
    expect(value).toEqual('1234567890123,45');
  });

  [{}, { labelOnTop: true }].forEach(addedArgs => {
    test.describe(`${renderAttributes(addedArgs)}`, () => {
      test(`render with tooltip`, async ({ page }) => {
        const args = { ...baseArgs, ...addedArgs, tooltip: 'Tooltip message' };
        const html = createHTML(args);
        await page.setContent(html);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.keyboard.down('Tab');
        if (!addedArgs.labelOnTop) {
          await page.keyboard.down('Tab');
        }

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      [{ mgWidth: 'full' }, { mgWidth: 16 }, { mgWidth: 4 }, { mgWidth: 2 }].forEach(widthArgs => {
        test(`with custom width ${renderAttributes(widthArgs)}`, async ({ page }) => {
          const args = { ...baseArgs, ...addedArgs, ...widthArgs };
          const html = createHTML(args);
          await page.setContent(html);

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      test('Ensure component fit in width 150px', async ({ page }) => {
        const args = { ...baseArgs, ...addedArgs };
        const html = createHTML(args);
        await page.setContent(html);
        await page.setViewportSize({ width: 150, height: 100 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [{}, { readonly: true }].forEach(addedArgs => {
    [
      `<mg-button slot="append-input" label="search">
        <mg-icon icon="calculator"></mg-icon> Calculate
      </mg-button>`,
      '<span slot="append-input">km</span>',
    ].forEach(slottedHTML => {
      test(`using append-input slot ${renderAttributes(addedArgs)} ${slottedHTML}`, async ({ page }) => {
        const args = { ...baseArgs, ...addedArgs, value: 1 };
        const html = createHTML(args, slottedHTML);
        await page.setContent(html);

        await page.locator('mg-input-numeric.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(addedArgs => {
      test(`Should display label on top on responsive breakpoint with tooltip message ${renderAttributes(addedArgs)}`, async ({ page }) => {
        const args = { ...baseArgs, ...addedArgs };
        const html = createHTML(args);
        await page.setContent(html);

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test.describe('Format', () => {
    [false, true].forEach(readonly => {
      types.forEach(type => {
        formats.forEach(format => {
          const addedArgs = {
            readonly,
            value: type === 'integer' ? 123456789 : 1234567.89,
            type,
            format,
            ...(format === 'unit'
              ? {
                  unit: 'meter',
                  unitDisplay: 'short',
                }
              : {}),
          };
          test(`format value ${renderAttributes(addedArgs)}`, async ({ page }) => {
            const args = { ...baseArgs, ...addedArgs };

            const html = createHTML(args);
            await page.setContent(html);

            await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
          });
        });
      });
    });
  });

  test('Should reset value and error when calling reset method', async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      min: 10, // Example of constraint to generate an error
      max: 100,
    });
    await page.setContent(html);

    await page.locator('mg-input-numeric.hydrated').waitFor();

    // Enter a value that doesn't respect constraints
    await page.locator('mg-input-numeric input').fill('5'); // Value outside limits
    await page.locator('mg-input-numeric input').blur(); // Trigger error

    // Check state with value and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Call reset method
    await page.evaluate(() => {
      document.querySelector('mg-input-numeric').reset();
    });

    // Check that input has been reset and error has been removed
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should udpate error with displayError() after value update with props', async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      required: true,
      value: 10,
    });
    await page.setContent(html);

    await page.locator('mg-input-numeric.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Programaticaly remove value to display required error message
    await page.locator('mg-input-numeric').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = '';
      await elm.displayError();
    });

    // Check state
    // - without value
    // - with error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value from JS and remove required error
    await page.locator('mg-input-numeric').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = 1;
      await elm.displayError();
    });

    // Check state
    // - with value
    // - without error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
