import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes, renderProperties } from '@mgdis/playwright-helpers';

const createHTML = props => {
  const slot = props.slot;
  delete props.slot;
  return `<mg-input-text ${renderAttributes(props)}>${slot}</mg-input-text>`;
};

const baseArgs = { identifier: 'identifier', label: 'label' };

test.describe('mg-input-text', () => {
  [{}, { labelOnTop: true }, { labelHide: true }, { placeholder: 'placeholder', helpText: 'HelpText Message' }].forEach(args => {
    test(`without tooltip ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await page.locator('mg-input-text.hydrated').waitFor();

      const input = page.locator('mg-input-text input');

      // Hide caret for screenshots
      await page.locator('mg-input-text input').evaluate(elm => (elm.style.caretColor = 'transparent'));

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

        await page.locator('mg-input-text.hydrated').waitFor();

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

  [16, 4, 2].forEach(mgWidth => {
    test(`with mgWidth ${mgWidth} with tooltip`, async ({ page }) => {
      const html = createHTML({
        ...baseArgs,
        value: 'M'.repeat(mgWidth),
        mgWidth,
        maxlength: mgWidth,
        tooltip: 'Tooltip message',
      });
      await page.setContent(html);

      // Wait for the component to be hydrated
      await page.locator('mg-input-text.hydrated').waitFor();

      // Focus the input field
      await page.focus('mg-input-text input');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
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

      await page.locator('mg-input-text.hydrated').waitFor();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [16, 'full'].forEach(mgWidth => {
    test(`Should render error when leaving input with a non matching pattern value, mg-width: ${mgWidth}`, async ({ page }) => {
      const html = createHTML({
        ...baseArgs,
        mgWidth,
        pattern: '[a-z]*',
        patternErrorMessage: 'Vous ne pouvez saisir que des lettres minuscules.',
      });
      await page.setContent(html);

      await page.locator('mg-input-text.hydrated').waitFor();

      const input = page.locator('mg-input-text input');

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
  });

  [true, false].forEach(readonly => {
    test.describe(`using append-input slot, case readonly: ${readonly}`, () => {
      [
        {
          type: 'search',
          slot: `<mg-button slot="append-input" label="search">
            <mg-icon icon="magnifying-glass"></mg-icon> Search
          </mg-button>`,
          icon: 'magnifying-glass',
        },
        {
          type: 'text',
          slot: '<span slot="append-input">@dc.comics</span>',
        },
        {
          type: 'text',
          slot: `<mg-button is-icon slot="append-input" label="cancel" variant="secondary">
            <mg-icon icon="cross"></mg-icon>
          </mg-button>
          <mg-button is-icon slot="append-input" label="validate" variant="secondary">
            <mg-icon icon="check"></mg-icon>
          </mg-button>
          `,
        },
      ].forEach(args => {
        test(`render slot ${renderAttributes(args)}`, async ({ page }) => {
          const html = createHTML({
            ...baseArgs,
            ...args,
            placeholder: 'placeholder',
            value: 'bruce',
            readonly,
          });
          await page.setContent(html);

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });
    });
  });

  [true, false].forEach(characterLeftHide => {
    [true, false].forEach(searchMode => {
      test(`render search input characterLeftHide=${characterLeftHide}, case ${searchMode ? 'with' : 'without'} searchMode`, async ({ page }) => {
        const searchProps = {
          type: 'search',
          icon: 'magnifying-glass',
        };
        const componentsProps = searchMode ? { ...baseArgs, ...searchProps } : { baseArgs };

        const html = createHTML({
          ...componentsProps,
          characterLeftHide,
          value: 'Bruce',
        });

        await page.setContent(html);

        await page.locator('mg-input-text.hydrated').waitFor();

        await page.keyboard.press('Tab');

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test('Should display datalist', async ({ page }) => {
    const componentsProps = { ...baseArgs, datalistoptions: ['batman', 'robin'] };
    const html = createHTML(componentsProps);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

    await page.locator('mg-input-text.hydrated').waitFor();

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip: ${renderAttributes(args)}`, async ({ page }) => {
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

  test('Should reset value and error when calling reset method', async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      pattern: '.*!.*', // Requires an exclamation mark
      patternErrorMessage: "Le texte doit contenir un point d'exclamation (!)",
    });
    await page.setContent(html);

    await page.locator('mg-input-text.hydrated').waitFor();

    // Enter a value that doesn't match the pattern
    await page.locator('mg-input-text input').fill('Chase'); // Invalid value
    await page.locator('mg-input-text input').blur(); // Trigger error

    // Check state with value and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Call reset method
    await page.evaluate(() => {
      document.querySelector('mg-input-text').reset();
    });

    // Check that the input has been reset and the error has been removed
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should udpate error with displayError() after value update with props', async ({page}) => {
    const html = createHTML({
      ...baseArgs,
      required: true,
      value: 'Batman'
    });
    await page.setContent(html);

    await page.locator('mg-input-text.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Programaticaly remove value to display required error message
    await page.locator('mg-input-text').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = '';
      await elm.displayError()
    });

    // Check state 
    // - without value
    // - with error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value from JS and remove required error
    await page.locator('mg-input-text').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = 'Hello Batman';
      await elm.displayError()
    });

    // Check state 
    // - with value
    // - without error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  })
});
