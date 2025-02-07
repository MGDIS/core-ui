import { renderAttributes } from '@mgdis/playwright-helpers';
import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { requiredMessageStatus } from '../mg-form.conf';

const createHTML = (args, slot) => `<mg-form ${renderAttributes(args)}>${slot}</mg-form>`;

const inputs = `<mg-input-checkbox identifier="mg-input-checkbox" label="mg-input-checkbox label"></mg-input-checkbox>
<mg-input-date identifier="mg-input-date" label="mg-input-date label"></mg-input-date>
<mg-input-numeric identifier="mg-input-numeric" label="mg-input-numeric label"></mg-input-numeric>
<mg-input-password identifier="mg-input-password" label="mg-input-password label"></mg-input-password>
<mg-input-radio identifier="mg-input-radio" label="mg-input-radio label"></mg-input-radio>
<mg-input-select identifier="mg-input-select" label="mg-input-select label"></mg-input-select>
<mg-input-rich-text-editor identifier="mg-input-rich-text-editor" label='mg-input-rich-text-editor label'></mg-input-rich-text-editor>
<mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>
<mg-input-textarea identifier="mg-input-textarea" label="mg-input-textarea label"></mg-input-textarea>
<mg-input-toggle identifier="mg-input-toggle" label="mg-input-toggle label">
  <span slot="item-1">non</span>
  <span slot="item-2">oui</span>
</mg-input-toggle>`;

const inputsScript = `const mgInputCheckbox = document.querySelector('mg-input-checkbox');
  const mgInputDate = document.querySelector('mg-input-date');
  const mgInputNumeric = document.querySelector('mg-input-numeric');
  const mgInputPassword = document.querySelector('mg-input-password');
  const mgInputRadio = document.querySelector('mg-input-radio');
  const mgInputSelect = document.querySelector('mg-input-select');
  const mgInputText = document.querySelector('mg-input-text');
  const mgInputRichTextEditor = document.querySelector('mg-input-rich-text-editor');
  const mgInputTextarea = document.querySelector('mg-input-textarea');
  const mgInputToggle = document.querySelector('mg-input-toggle');
  mgInputCheckbox.value = [
    { title: 'oui', value: false },
    { title: 'non', value: false },
  ];
  mgInputRadio.items = ['blu', 'bli', 'bla', 'blo'];
  mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
  mgInputToggle.items = [
    { title: 'non', value: false },
    { title: 'oui', value: true },
  ];`;

const inputsScriptSetValues = `
  mgInputCheckbox.value = [
    { title: 'oui', value: true },
    { title: 'non', value: false },
  ];
  mgInputDate.value = '2022-04-15';
  mgInputNumeric.value = 1234567890;
  mgInputPassword.value = 'p455w0rD';
  mgInputRadio.value = mgInputRadio.items[0];
  mgInputSelect.value = mgInputSelect.items[0];
  mgInputRichTextEditor.value = '<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>';
  mgInputText.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  mgInputTextarea.value =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  mgInputToggle.value = mgInputToggle.items[1].value;`;

const inputsScriptSetValuesExceptCheckbox = `
  mgInputDate.value = '2022-04-15';
  mgInputNumeric.value = 1234567890;
  mgInputPassword.value = 'p455w0rD';
  mgInputRadio.value = mgInputRadio.items[0];
  mgInputSelect.value = mgInputSelect.items[0];
  mgInputRichTextEditor.value = '<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>';
  mgInputText.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  mgInputTextarea.value =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  mgInputToggle.value = mgInputToggle.items[1].value;`;

const inputsScriptSetLongValues = `
  mgInputRadio.items = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'bli', 'bla', 'blo'];
  mgInputSelect.items = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'bli', 'bla', 'blo'];
  mgInputToggle.items = [
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', value: false },
    { title: 'oui', value: true },
  ];
  mgInputCheckbox.value = [
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', value: true },
    { title: 'non', value: false },
  ];
  mgInputDate.value = '2022-04-15';
  mgInputNumeric.value = 1234567890123;
  mgInputPassword.value = 'p455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rDp455w0rD';
  mgInputRadio.value = mgInputRadio.items[0];
  mgInputSelect.value = mgInputSelect.items[0];
  mgInputRichTextEditor.value = '<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>';
  mgInputText.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  mgInputTextarea.value =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  mgInputToggle.value = mgInputToggle.items[1].value;`;

const inputsScriptRequiredAll = `
  mgInputCheckbox.required = true;
  mgInputDate.required = true;
  mgInputNumeric.required = true;
  mgInputPassword.required = true;
  mgInputRadio.required = true;
  mgInputSelect.required = true;
  mgInputRichTextEditor.required = true;
  mgInputText.required = true;
  mgInputTextarea.required = true;`;

const inputsScriptRequiredSome = `
  mgInputCheckbox.required = true;
  mgInputNumeric.required = true;
  mgInputRadio.required = true;
  mgInputText.required = true;`;

const inputsScriptTooltipAll = `
  mgInputCheckbox.tooltip = 'tooltip';
  mgInputDate.tooltip = 'tooltip';
  mgInputNumeric.tooltip = 'tooltip';
  mgInputPassword.tooltip = 'tooltip';
  mgInputRadio.tooltip = 'tooltip';
  mgInputSelect.tooltip = 'tooltip';
  mgInputRichTextEditor.tooltip = 'tooltip';
  mgInputText.tooltip = 'tooltip';
  mgInputTextarea.tooltip = 'tooltip';
  mgInputToggle.tooltip = 'tooltip';`;

const inputsScriptRequiredSingle = `
  mgInputCheckbox.required = true;`;

const inputsScriptReadonlyAll = `
  mgInputCheckbox.readonly = true;
  mgInputDate.readonly = true;
  mgInputNumeric.readonly = true;
  mgInputPassword.readonly = true;
  mgInputRadio.readonly = true;
  mgInputSelect.readonly = true;
  mgInputRichTextEditor.readonly = true;
  mgInputText.readonly = true;
  mgInputTextarea.readonly = true;
  mgInputToggle.readonly = true;`;

const inputsScriptDisabledAll = `
  mgInputCheckbox.disabled = true;
  mgInputDate.disabled = true;
  mgInputNumeric.disabled = true;
  mgInputPassword.disabled = true;
  mgInputRadio.disabled = true;
  mgInputSelect.disabled = true;
  mgInputRichTextEditor.disabled = true;
  mgInputText.disabled = true;
  mgInputTextarea.disabled = true;
  mgInputToggle.disabled = true;`;

test.describe('mg-form', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
  });

  [{}, { disabled: true }, { readonly: true }, { labelOnTop: true }].forEach(args => {
    test.describe(`args ${JSON.stringify(args)}`, () => {
      test(`Should render`, async ({ page }) => {
        const html = createHTML(args, inputs);
        await page.setContent(html);
        await page.addScriptTag({ content: inputsScript });
        await page.addScriptTag({ content: inputsScriptSetValues });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test(`Should render with tooltip`, async ({ page }) => {
        const html = createHTML(args, inputs);
        await page.setContent(html);
        await page.addScriptTag({ content: inputsScript });
        await page.addScriptTag({ content: inputsScriptSetValues });
        await page.addScriptTag({ content: inputsScriptTooltipAll });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test('Should render with custom style', async ({ page }) => {
        const html = createHTML(args, inputs);
        await page.setContent(html);
        await page.addScriptTag({ content: inputsScript });
        await page.addScriptTag({ content: inputsScriptSetValues });
        await page.addScriptTag({ content: inputsScriptRequiredSome });

        await page.locator('mg-form').evaluate((elm: HTMLMgFormElement) => {
          elm.setAttribute('style', '--mg-c-form-inputs-title-width: 15rem;');
        });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [true, false].forEach((required: boolean) => {
    test.describe(`required ${required}`, () => {
      [...requiredMessageStatus.map(requiredMessage => ({ requiredMessage }))].forEach(args => {
        test(`Should render with props ${JSON.stringify(args)}`, async ({ page }) => {
          const html = createHTML(args, inputs);
          await page.setContent(html);
          await page.addScriptTag({ content: inputsScript });
          await page.addScriptTag({ content: inputsScriptSetValues });
          if (required) {
            await page.addScriptTag({ content: inputsScriptRequiredSome });
          }

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });
    });
  });

  [{}, { lang: 'fr' }].forEach(args => {
    [inputsScriptRequiredAll, inputsScriptRequiredSome, inputsScriptRequiredSingle].forEach(inputsScriptRequired => {
      test.describe(`lang ${JSON.stringify(args)} inputsScriptRequired ${inputsScriptRequired}`, () => {
        test(`Should render required and errors`, async ({ page }) => {
          const html = createHTML(args, inputs);
          await page.setContent(html);
          await page.addScriptTag({ content: inputsScript });
          await page.addScriptTag({ content: inputsScriptRequired });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

          await page.locator('mg-form').evaluate((elm: HTMLMgFormElement) => {
            elm.displayError();
          });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });

        test(`Should render single required input`, async ({ page }) => {
          const html = createHTML(args, '<mg-input-date identifier="mg-input-date" label="mg-input-date label"></mg-input-date>');
          await page.setContent(html);
          await page.addScriptTag({ content: `document.querySelector('mg-input-date').required = true;` });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

          await page.locator('mg-form').evaluate((elm: HTMLMgFormElement) => {
            elm.displayError();
          });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });
    });
  });

  [{ readonly: true }, { disabled: true }].forEach(args => {
    test(`Should not have required message when all inputs are required and args ${JSON.stringify(args)}`, async ({ page }) => {
      const html = createHTML(args, inputs);
      await page.setContent(html);
      await page.addScriptTag({ content: inputsScript });
      await page.addScriptTag({ content: inputsScriptSetValues });
      await page.addScriptTag({ content: inputsScriptRequiredAll });
      if (args.readonly) {
        await page.addScriptTag({ content: inputsScriptReadonlyAll });
      } else {
        await page.addScriptTag({ content: inputsScriptDisabledAll });
      }

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test(`Should render responsive`, async ({ page }) => {
    const html = createHTML({}, inputs);
    await page.setContent(html);
    await page.addScriptTag({ content: inputsScript });
    await page.addScriptTag({ content: inputsScriptSetValues });

    await page.setViewportSize({ width: 700, height: 800 });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test(`Should render readonly long values`, async ({ page }) => {
    const html = createHTML({ readonly: true }, inputs);
    await page.setContent(html);
    await page.addScriptTag({ content: inputsScript });
    await page.addScriptTag({ content: inputsScriptSetLongValues });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should reset inputs values', async ({ page }) => {
    const html = createHTML({}, inputs);
    await page.setContent(html);
    await page.addScriptTag({ content: inputsScript });
    await page.addScriptTag({ content: inputsScriptSetValuesExceptCheckbox });
    await page.addScriptTag({ content: inputsScriptRequiredSingle });

    // Display error
    await page.locator('mg-form').evaluate((elm: HTMLMgFormElement) => {
      elm.displayError();
    });

    // Check state with values and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Call reset method
    await page.locator('mg-form').evaluate((form: HTMLMgFormElement) => {
      form.reset();
    });

    // Check that the inputs has been reseted and the errors has been removed
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
