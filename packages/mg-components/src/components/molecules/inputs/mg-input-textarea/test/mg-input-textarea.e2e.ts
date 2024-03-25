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

      test('inside a div.mg-form-group', async ({ page }) => {
        const html = createHTML({
          ...baseArgs,
          tooltip: 'Tooltip message',
          label: 'long label long label long label long label long label long label long label long label long label long label long label',
          labelOnTop,
        });
        await page.setContent(`<div class="mg-form-group">${html}</div>`);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      [16, 4, 2].forEach(mgWidth => {
        test(`with mgWidth ${mgWidth}`, async ({ page }) => {
          const html = createHTML({
            ...baseArgs,
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

  [
    { readonly: true },
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
});
