import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes, renderProperties } from '@mgdis/core-ui-helpers/dist/playwright';

const baseArgs = { identifier: 'identifier', label: 'label' };

const createHTML = props => `<mg-input-file ${renderAttributes(props)}></mg-input-file>`;

const setFile = (fileName = 'batman') => {
  const file = new File(['file content'], fileName, { type: 'text/plain' });
  return {
    name: file.name,
    size: file.size,
  };
};

test.describe('mg-input-file', () => {
  [
    {},
    { value: ['batman.jpg'] },
    { value: [setFile('batman.jpg')] },
    {
      value: [
        setFile('super long file name that exceeds normal length expectations for testing purposes with some extra characters to ensure it is really long and wraps around.png'),
      ],
    },
    { value: [setFile('batman.jpg'), setFile('robin.png')], multiple: true },
    { disabled: true },
    { disabled: true, value: [setFile('batman.jpg')] },
    { disabled: true, value: [setFile('batman.jpg'), setFile('robin.png')], multiple: true },
    { labelOnTop: true },
    { labelHide: true },
    { maxSize: 5000 },
    { accept: '.pdf' },
    { accept: '.pdf', maxSize: 5000 },
    { placeholder: 'placeholder' },
    { helpText: 'HelpText Message' },
    {
      helpText: `<p>hello <a href="h">batman<mg-icon icon="user"></mg-icon></a></p>`,
    },
  ].forEach((args, index) => {
    test(`render without tooltip ${renderAttributes(args)} ${index}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, ...args };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await page.locator('mg-input-file.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach(labelOnTop => {
    test.describe(`labelOnTop: ${labelOnTop}`, () => {
      test('render with tooltip', async ({ page }) => {
        const componentArgs = { ...baseArgs, tooltip: 'Tooltip message', labelOnTop };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.locator('mg-input-file.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.keyboard.down('Tab');
        if (!labelOnTop) {
          await page.keyboard.down('Tab');
        }

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test('Ensure component fit in width 200px with label-on-top', async ({ page }) => {
        const componentArgs = { ...baseArgs, labelOnTop };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.locator('mg-input-file.hydrated').waitFor();

        await page.setViewportSize({ height: 100, width: 200 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [{}, { lang: 'fr' }].forEach(args => {
    test(`Should render error when leaving an empty required input ${renderAttributes(args)}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, ...args, required: true };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await page.locator('mg-input-file.hydrated').waitFor();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'batman' }, { tooltip: 'batman', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip: ${renderAttributes(args)}`, async ({ page }) => {
        const componentArgs = { ...baseArgs, ...args };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.locator('mg-input-file.hydrated').waitFor();

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test.describe('Navigation', () => {
    test('Should focus input file when tabbing to the component', async ({ page }) => {
      const componentArgs = { ...baseArgs };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await page.locator('mg-input-file.hydrated').waitFor();

      // Focus add button
      await page.keyboard.press('Tab');

      await page.locator('.mg-c-input__file-button[data-focus-visible]').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach(lock => {
    test(`Should reset value and error when calling reset method, lock: ${lock}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, accept: '.jpg, .png' };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await page.locator('mg-input-file.hydrated').waitFor();

      // Set an error message
      await page.evaluate(lock => {
        document.querySelector('mg-input-file').setError(false, "Message d'erreur de test", lock);
      }, lock);

      // Verify the state with custom error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Enter a value that doesn't match the accept attribute
      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles([
        {
          name: 'test.pdf',
          mimeType: 'application/pdf',
          buffer: Buffer.from([0x25, 0x50, 0x44, 0x46]),
        },
      ]);

      await page.locator('mg-button').first().blur();

      // Check state with value andpattern error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Call reset method
      await page.evaluate(() => {
        document.querySelector('mg-input-file').reset();
      });

      // Check that the input has been reset and the error has been removed
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should udpate error with displayError() after value update with props', async ({ page }) => {
    const componentArgs = {
      ...baseArgs,
      required: true,
      value: [setFile('batman.jpg')],
    };
    const html = createHTML(componentArgs);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

    await page.locator('mg-input-file.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Programaticaly remove value to display required error message
    await page.locator('mg-input-file').evaluate(async (elm: HTMLMgInputFileElement) => {
      elm.value = undefined;
      await elm.displayError();
    });

    // Check state
    // - without value
    // - with error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value from JS and remove required error
    await page.locator('mg-input-file').evaluate(async (elm: HTMLMgInputFileElement) => {
      elm.value = ['robin.png'];
      await elm.displayError();
    });

    // Check state
    // - with value
    // - without error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
