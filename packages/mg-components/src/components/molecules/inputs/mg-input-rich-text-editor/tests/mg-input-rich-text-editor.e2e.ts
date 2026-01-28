import { expect, type Page } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';

const createHTML = props => {
  return `<mg-input-rich-text-editor ${renderAttributes(props)}></mg-input-rich-text-editor>`;
};

const baseArgs = { identifier: 'identifier', label: 'label' };
const sampleContent =
  '<p>Each episode of Paw Patrol follows a similar pattern. Episodes normally open with a scene depicting the dogs going about their everyday lives in Adventure Bay, often playing with dog toys or going to the local playground.</p><p>Ryder, a ten-year-old boy, is advised of a problem by receiving a call for help or by witnessing a situation himself.</p>';

// Jodit editor wysiwyg selector
const JODIT_WYSIWYG_SELECTOR = '.jodit-wysiwyg';

/**
 * Inserts content into the Jodit editor and triggers input event to update placeholder state
 */
const setEditorContent = async (page: Page, content: string): Promise<void> => {
  await page.locator(JODIT_WYSIWYG_SELECTOR).evaluate((element, htmlContent) => {
    element.innerHTML = htmlContent;
    // Trigger input event to notify Jodit of content change (updates placeholder state)
    element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }, content);
};

test.describe('mg-input-rich-text-editor', () => {
  [
    {},
    { labelOnTop: true },
    { labelHide: true },
    { placeholder: 'placeholder', helpText: 'HelpText Message' },
    {
      helpText: `<p>hello <a href="h">batman<mg-icon icon="user"></mg-icon></a></p>`,
    },
  ].forEach(args => {
    test(`without tooltip ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await page.locator('mg-input-rich-text-editor.hydrated').waitFor();

      // Wait for the editor to be initialized
      await page.locator(JODIT_WYSIWYG_SELECTOR).waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Enter content in the editor
      await setEditorContent(page, sampleContent);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach(labelOnTop => {
    test.describe(`labelOnTop: ${labelOnTop}`, () => {
      test('with tooltip', async ({ page }) => {
        const html = createHTML({ ...baseArgs, tooltip: 'Tooltip message', labelOnTop });
        await page.setContent(html);

        await page.locator('mg-input-rich-text-editor.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [
    { value: sampleContent },
    { value: sampleContent, readonly: true },
    { value: sampleContent, readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: sampleContent, readonly: true, tooltip: 'tooltip', tooltipPosition: 'label' },
    { value: sampleContent, readonly: true, labelOnTop: true },
    { disabled: true },
    { value: sampleContent, disabled: true },
    { value: sampleContent, helpText: '<mg-icon icon="info-circle" size="small"></mg-icon> Paw Patrol plot' },
    { value: sampleContent, helpText: 'HelpText Message', required: true },
    { value: sampleContent, helpText: 'HelpText Message', required: true, readonly: true },
    { value: sampleContent, helpText: 'HelpText Message', required: true, disabled: true },
    { value: sampleContent, tooltip: 'Paw Patrol', tooltipPosition: 'label' },
    { value: sampleContent, tooltip: 'Paw Patrol', tooltipPosition: 'input', labelOnTop: true },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await page.locator('mg-input-rich-text-editor.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [{}, { lang: 'fr' }].forEach(args => {
    test(`Should render error when leaving an empty required input ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args, required: true });
      await page.setContent(html);

      await page.locator('mg-input-rich-text-editor.hydrated').waitFor();
      await page.locator(JODIT_WYSIWYG_SELECTOR).waitFor();

      await page.locator(JODIT_WYSIWYG_SELECTOR).click();
      await page.locator('body').click();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should take focus with keyboard navigation', async ({ page }) => {
    const html = createHTML({ ...baseArgs });
    await page.setContent(html);

    await page.locator('mg-input-rich-text-editor.hydrated').waitFor();

    // Take focus on the editor using keyboard Tab navigation
    await page.keyboard.press('Tab');

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

  [true, false].forEach(lock => {
    test(`Should reset value and error when calling reset method, lock: ${lock}`, async ({ page }) => {
      const html = createHTML({
        ...baseArgs,
        pattern: '.*!.*', // Requires an exclamation mark
        patternErrorMessage: "Le texte doit contenir un point d'exclamation (!)",
      });
      await page.setContent(html);

      await page.locator('mg-input-rich-text-editor.hydrated').waitFor();
      await page.locator(JODIT_WYSIWYG_SELECTOR).waitFor();

      // Set an error message
      await page.evaluate(lock => {
        document.querySelector('mg-input-rich-text-editor').setError(false, "Message d'erreur de test", lock);
      }, lock);

      // Verify the state with custom error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Enter a value that doesn't match the pattern
      await setEditorContent(page, 'Paw Patrol');
      await page.locator('body').click(); // Trigger blur event for validation

      // Check state with value and pattern error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Call reset method
      await page.evaluate(() => {
        document.querySelector('mg-input-rich-text-editor').reset();
      });

      // Check that the input has been reset and the error has been removed
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render with custom toolbar options', async ({ page }) => {
    const html = createHTML({ ...baseArgs, modules: 'bold, italic, eraser' });
    await page.setContent(html);

    await page.locator('mg-input-rich-text-editor.hydrated').waitFor();

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should apply bold formatting when clicking on bold button', async ({ page }) => {
    const html = createHTML({ ...baseArgs });
    await page.setContent(html);

    await page.locator('mg-input-rich-text-editor.hydrated').waitFor();
    await page.locator(JODIT_WYSIWYG_SELECTOR).waitFor();

    await setEditorContent(page, sampleContent);

    // Select specific text
    await page.evaluate(() => {
      const editor = document.querySelector('mg-input-rich-text-editor');
      // Access Jodit editor via jodit-wysiwyg class
      const joditEditor = editor.shadowRoot.querySelector(JODIT_WYSIWYG_SELECTOR);

      const textToSelect = 'Paw Patrol follows a similar pattern';
      const range = document.createRange();
      const selection = window.getSelection();

      // Find the first paragraph in Jodit editor
      const firstP = joditEditor.querySelector('p');

      // Find text node containing our phrase
      const textNode = Array.from(firstP.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.includes(textToSelect));

      const startIndex = textNode.textContent.indexOf(textToSelect);
      range.setStart(textNode, startIndex);
      range.setEnd(textNode, startIndex + textToSelect.length);

      selection.removeAllRanges();
      selection.addRange(range);
    });

    // Click on bold button
    await page.evaluate(() => {
      (document.querySelector('mg-input-rich-text-editor').shadowRoot.querySelector('span.jodit-toolbar-button_bold button') as HTMLButtonElement).click();
    });

    // Place cursor at the end of selection to highlight action button
    await page.evaluate(() => {
      const selection = window.getSelection();
      selection.collapseToEnd();
    });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should apply underline formatting when clicking on underline button', async ({ page }) => {
    const html = createHTML({ ...baseArgs });
    await page.setContent(html);

    await page.locator('mg-input-rich-text-editor.hydrated').waitFor();
    await page.locator(JODIT_WYSIWYG_SELECTOR).waitFor();

    await setEditorContent(page, sampleContent);

    // Select specific text
    await page.evaluate(() => {
      const editor = document.querySelector('mg-input-rich-text-editor');
      // Access Jodit editor via jodit-wysiwyg class
      const joditEditor = editor.shadowRoot.querySelector(JODIT_WYSIWYG_SELECTOR);

      const textToSelect = 'Paw Patrol follows a similar pattern';
      const range = document.createRange();
      const selection = window.getSelection();

      // Find the first paragraph in Jodit editor
      const firstP = joditEditor.querySelector('p');

      // Find text node containing our phrase
      const textNode = Array.from(firstP.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.includes(textToSelect));

      const startIndex = textNode.textContent.indexOf(textToSelect);
      range.setStart(textNode, startIndex);
      range.setEnd(textNode, startIndex + textToSelect.length);

      selection.removeAllRanges();
      selection.addRange(range);
    });

    // Click on underline button
    await page.evaluate(() => {
      (document.querySelector('mg-input-rich-text-editor').shadowRoot.querySelector('span.jodit-toolbar-button_underline button') as HTMLButtonElement).click();
    });

    // Place cursor at the end of selection to highlight action button
    await page.evaluate(() => {
      const selection = window.getSelection();
      selection.collapseToEnd();
    });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
