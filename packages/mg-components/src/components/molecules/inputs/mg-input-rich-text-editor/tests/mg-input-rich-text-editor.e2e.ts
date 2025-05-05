import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/core-ui-helpers/playwright';

const createHTML = props => {
  return `<mg-input-rich-text-editor ${renderAttributes(props)}></mg-input-rich-text-editor>`;
};

const baseArgs = { identifier: 'identifier', label: 'label' };
const sampleContent =
  '<p>Each episode of Paw Patrol follows a similar pattern. Episodes normally open with a scene depicting the dogs going about their everyday lives in Adventure Bay, often playing with dog toys or going to the local playground.</p><p>Ryder, a ten-year-old boy, is advised of a problem by receiving a call for help or by witnessing a situation himself.</p>';

test.describe('mg-input-rich-text-editor', () => {
  [{}, { labelOnTop: true }, { labelHide: true }, { placeholder: 'placeholder', helpText: 'HelpText Message' }].forEach(args => {
    test(`without tooltip ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await page.locator('mg-input-rich-text-editor.hydrated').waitFor();

      // Wait for the editor to be initialized
      await page.locator('.ql-editor').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Enter content in the editor
      await page.locator('.ql-editor').evaluate((element, content) => {
        element.innerHTML = content;
      }, sampleContent);

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
      await page.locator('.ql-editor').waitFor();

      await page.locator('.ql-editor').click();
      await page.locator('body').click();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render error when leaving input with a non matching pattern value', async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      pattern: '[a-z]*',
      patternErrorMessage: 'Vous ne pouvez saisir que des lettres minuscules.',
    });
    await page.setContent(html);

    await page.locator('mg-input-rich-text-editor.hydrated').waitFor();
    await page.locator('.ql-editor').waitFor();

    await page.locator('.ql-editor').click();
    await page.locator('.ql-editor').evaluate((element, content) => {
      element.innerHTML = content;
    }, sampleContent);
    await page.locator('body').click();

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

  test('Should reset value and error when calling reset method', async ({ page }) => {
    const html = createHTML({
      ...baseArgs,
      pattern: '.*!.*', // Requires an exclamation mark
      patternErrorMessage: "Le texte doit contenir un point d'exclamation (!)",
    });
    await page.setContent(html);

    await page.locator('mg-input-rich-text-editor.hydrated').waitFor();
    await page.locator('.ql-editor').waitFor();

    // Enter a value that doesn't match the pattern
    await page.locator('.ql-editor').evaluate((element, content) => {
      element.innerHTML = content;
    }, 'Paw Patrol');
    await page.locator('body').click(); // Trigger blur event

    // Check state with value and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Call reset method
    await page.evaluate(() => {
      document.querySelector('mg-input-rich-text-editor').reset();
    });

    // Check that the input has been reset and the error has been removed
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render with custom toolbar options', async ({ page }) => {
    const html = createHTML({ ...baseArgs });
    await page.setContent(html);

    await page.evaluate(() => {
      const editor = document.querySelector('mg-input-rich-text-editor');
      editor.modules = {
        toolbar: [['bold', 'italic'], ['clean']],
      };
    });

    await page.locator('mg-input-rich-text-editor.hydrated').waitFor();

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should apply bold formatting when clicking on bold button', async ({ page }) => {
    const html = createHTML({ ...baseArgs });
    await page.setContent(html);

    await page.locator('mg-input-rich-text-editor.hydrated').waitFor();
    await page.locator('.ql-editor').waitFor();

    await page.locator('.ql-editor').evaluate((element, content) => {
      element.innerHTML = content;
    }, sampleContent);

    // Select specific text
    await page.evaluate(() => {
      const editor = document.querySelector('mg-input-rich-text-editor');
      if (editor === null) throw new Error('Editor not found');

      // Access Quill editor via ql-editor class
      const quillEditor = editor.shadowRoot?.querySelector('.ql-editor');
      if (quillEditor === null) throw new Error('Quill editor not found');

      const textToSelect = 'Paw Patrol follows a similar pattern';
      const range = document.createRange();
      const selection = window.getSelection();

      // Find the first paragraph in Quill editor
      const firstP = quillEditor.querySelector('p');
      if (firstP === null) throw new Error('First paragraph not found');

      // Find text node containing our phrase
      const textNode = Array.from(firstP.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.includes(textToSelect));
      if (textNode === undefined) throw new Error('Text node not found');

      const startIndex = textNode.textContent.indexOf(textToSelect);
      range.setStart(textNode, startIndex);
      range.setEnd(textNode, startIndex + textToSelect.length);

      selection.removeAllRanges();
      selection.addRange(range);
    });

    // Click on bold button
    await page.locator('button.ql-bold').click();

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
    await page.locator('.ql-editor').waitFor();

    await page.locator('.ql-editor').evaluate((element, content) => {
      element.innerHTML = content;
    }, sampleContent);

    // Select specific text
    await page.evaluate(() => {
      const editor = document.querySelector('mg-input-rich-text-editor');
      if (editor === null) throw new Error('Editor not found');

      // Access Quill editor via ql-editor class
      const quillEditor = editor.shadowRoot?.querySelector('.ql-editor');
      if (quillEditor === null) throw new Error('Quill editor not found');

      const textToSelect = 'Paw Patrol follows a similar pattern';
      const range = document.createRange();
      const selection = window.getSelection();

      // Find the first paragraph in Quill editor
      const firstP = quillEditor.querySelector('p');
      if (firstP === null) throw new Error('First paragraph not found');

      // Find text node containing our phrase
      const textNode = Array.from(firstP.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.includes(textToSelect));
      if (textNode === undefined) throw new Error('Text node not found');

      const startIndex = textNode.textContent.indexOf(textToSelect);
      range.setStart(textNode, startIndex);
      range.setEnd(textNode, startIndex + textToSelect.length);

      selection.removeAllRanges();
      selection.addRange(range);
    });

    // Click on underline button
    await page.locator('button.ql-underline').click();

    // Place cursor at the end of selection to highlight action button
    await page.evaluate(() => {
      const selection = window.getSelection();
      selection.collapseToEnd();
    });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
