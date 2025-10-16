import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';

const baseArgs = {
  identifier: 'identifier',
  label: 'label',
};

const createHTML = args => `<mg-input-password ${renderAttributes(args)}></mg-input-password>`;

test.describe('mg-input-password', () => {
  [
    {},
    { labelOnTop: true },
    { labelHide: true },
    {
      placeholder: 'placeholder',
      helpText: 'HelpText Message',
    },
    {
      helpText: `<p>hello <a href="h">batman<mg-icon icon="user"></mg-icon></a></p>`,
    },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await page.locator('mg-input-password.hydrated').waitFor();

      const input = page.locator('input');

      // Hide caret for screenshots
      await page.locator('mg-input-password').evaluate((elm: HTMLMgInputPasswordElement) => {
        elm.shadowRoot.querySelector('input').style.caretColor = 'transparent';
      });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await input.press('KeyB');
      await input.press('KeyL');
      await input.press('KeyU');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach((labelOnTop: boolean) => {
    test.describe(`labelOnTop: ${labelOnTop}`, () => {
      test('render with tooltip', async ({ page }) => {
        const html = createHTML({ ...baseArgs, tooltip: 'Tooltip message', labelOnTop });
        await page.setContent(html);

        await page.locator('mg-input-password.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.keyboard.down('Tab');
        if (!labelOnTop) {
          await page.keyboard.down('Tab');
          await page.keyboard.down('Tab');
        }

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      [16].forEach(width => {
        test(`with custom width: ${width}`, async ({ page }) => {
          const html = createHTML({ ...baseArgs, mgWidth: width, labelOnTop });
          await page.setContent(html);

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      test('Ensure component fit in width 200px', async ({ page }) => {
        const html = createHTML({ ...baseArgs, labelOnTop });
        await page.setContent(html);

        await page.setViewportSize({ width: 200, height: 100 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [
    { readonly: true },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: 'blu' },
    { value: 'blu', readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: 'blu', readonly: true, tooltip: 'tooltip', tooltipPosition: 'label' },
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

      await page.locator('mg-input-password.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('display password', () => {
    test(`Should toggle display password with click on eye`, async ({ page }) => {
      await page.setContent(createHTML({ ...baseArgs, value: 'batman' }));

      await page.locator('mg-input-password.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.locator('mg-button').click();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.locator('mg-button').click();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test(`Should navigate with keyboard on "eye" button`, async ({ page }) => {
      await page.setContent(createHTML({ ...baseArgs, value: 'batman' }));

      await page.locator('mg-input-password.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Enter');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [{}, { lang: 'fr' }].forEach(args => {
    test(`Should render error when leaving an empty input ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args, required: true });
      await page.setContent(html);

      await page.locator('mg-input-password.hydrated').waitFor();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
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

  test.describe('Style', () => {
    test('Should prevent style override from context', async ({ page }) => {
      const html = createHTML({ ...baseArgs, helpText: "text d'aide", tooltip: 'tooltip' });
      await page.addStyleTag({ content: 'body{color: white;background-color: black;}' });
      await page.setContent(html);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach(lock => {
    test(`Should reset value and error when calling reset method, lock: ${lock}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, required: true });
      await page.setContent(html);

      await page.locator('mg-input-password.hydrated').waitFor();

      // Set an error message
      await page.evaluate(lock => {
        document.querySelector('mg-input-password').setError(false, "Message d'erreur de test", lock);
      }, lock);

      // Verify the state with custom error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // render required error
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      // Verify the state with required error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Enter a value that doesn't match the pattern
      await page.locator('mg-input-password input').fill('Chase');

      // Check state with value and no error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Set an error message
      await page.evaluate(lock => {
        document.querySelector('mg-input-password').setError(false, "Message d'erreur de test", lock);
      }, lock);

      // Check state with value and custom error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Call reset method
      await page.evaluate(() => {
        document.querySelector('mg-input-password').reset();
      });

      // Check that the input has been reset and the error has been removed
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should udpate error with displayError() after value update with props', async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      required: true,
      value: 'Batman',
    });
    await page.setContent(html);

    await page.locator('mg-input-password.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Programaticaly remove value to display required error message
    await page.locator('mg-input-password').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = '';
      await elm.displayError();
    });

    // Check state
    // - without value
    // - with error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value from JS and remove required error
    await page.locator('mg-input-password').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = 'Hello Batman';
      await elm.displayError();
    });

    // Check state
    // - with value
    // - without error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
