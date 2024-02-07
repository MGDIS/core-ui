import { renderAttributes } from '@mgdis/playwright-helpers';
import { PageType, describe, describeEach, expect, setPageContent, test, testEach } from '../../../../utils/playwright.e2e.test.utils';
import { requiredMessageStatus } from '../mg-form.conf';

const TIMEOUT = 1000;

const inputs = `<mg-input-checkbox identifier="mg-input-checkbox" label="mg-input-checkbox label"></mg-input-checkbox>
<mg-input-date identifier="mg-input-date" label="mg-input-date label"></mg-input-date>
<mg-input-numeric identifier="mg-input-numeric" label="mg-input-numeric label"></mg-input-numeric>
<mg-input-password identifier="mg-input-password" label="mg-input-password label"></mg-input-password>
<mg-input-radio identifier="mg-input-radio" label="mg-input-radio label"></mg-input-radio>
<mg-input-select identifier="mg-input-select" label="mg-input-select label"></mg-input-select>
<mg-input-text identifier="mg-input-text" label="mg-input-text label"></mg-input-text>
<mg-input-textarea identifier="mg-input-textarea" label="mg-input-textarea label"></mg-input-textarea>
<mg-input-toggle identifier="mg-input-toggle" label="mg-input-toggle label">
  <span slot="item-1">non</span>
  <span slot="item-2">oui</span>
</mg-input-toggle>`;

const inputsScript = `<script>
  const mgInputCheckbox = document.querySelector('mg-input-checkbox');
  const mgInputDate = document.querySelector('mg-input-date');
  const mgInputNumeric = document.querySelector('mg-input-numeric');
  const mgInputPassword = document.querySelector('mg-input-password');
  const mgInputRadio = document.querySelector('mg-input-radio');
  const mgInputSelect = document.querySelector('mg-input-select');
  const mgInputText = document.querySelector('mg-input-text');
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
  ];
</script>`;

const inputsScriptSetValues = `<script>
  mgInputCheckbox.value = [
    { title: 'oui', value: true },
    { title: 'non', value: false },
  ];
  mgInputDate.value = '2022-04-15';
  mgInputNumeric.value = 1234567890;
  mgInputPassword.value = 'p455w0rD';
  mgInputRadio.value = mgInputRadio.items[0];
  mgInputSelect.value = mgInputSelect.items[0];
  mgInputText.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  mgInputTextarea.value =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  mgInputToggle.value = mgInputToggle.items[1].value;
</script>`;

const inputsScriptRequiredAll = `<script>
  mgInputCheckbox.required = true;
  mgInputDate.required = true;
  mgInputNumeric.required = true;
  mgInputPassword.required = true;
  mgInputRadio.required = true;
  mgInputSelect.required = true;
  mgInputText.required = true;
  mgInputTextarea.required = true;
</script>`;

const inputsScriptRequiredSome = `<script>
  mgInputCheckbox.required = true;
  mgInputNumeric.required = true;
  mgInputRadio.required = true;
  mgInputText.required = true;
</script>`;

const inputsScriptRequiredSingle = `<script>
  mgInputCheckbox.required = true;
</script>`;

const inputsScriptReadonlyAll = `<script>
  mgInputCheckbox.readonly = true;
  mgInputDate.readonly = true;
  mgInputNumeric.readonly = true;
  mgInputPassword.readonly = true;
  mgInputRadio.readonly = true;
  mgInputSelect.readonly = true;
  mgInputText.readonly = true;
  mgInputTextarea.readonly = true;
  mgInputToggle.readonly = true;
</script>`;

const inputsScriptDisabledAll = `<script>
  mgInputCheckbox.disabled = true;
  mgInputDate.disabled = true;
  mgInputNumeric.disabled = true;
  mgInputPassword.disabled = true;
  mgInputRadio.disabled = true;
  mgInputSelect.disabled = true;
  mgInputText.disabled = true;
  mgInputTextarea.disabled = true;
  mgInputToggle.disabled = true;
</script>`;

describe.only('mg-form', () => {
  test.beforeEach(async ({ page }) => {
    page.setViewportSize({ width: 800, height: 800 });
  });

  describeEach(['<mg-form>', '<mg-form disabled>', '<mg-form readonly>', '<mg-form label-on-top>'])('startTag %s', (startTag: string) => {
    test(`Should render`, async ({ page }) => {
      await setPageContent(
        page,
        `${startTag}
        ${inputs}
        </mg-form>
        ${inputsScript}
        ${inputsScriptSetValues}`,
      );

      await page.locator('mg-form.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test('Should render with custom style', async ({ page }) => {
      await setPageContent(
        page,
        `${startTag}
        ${inputs}
        </mg-form>
        ${inputsScript}
        ${inputsScriptSetValues}
        ${inputsScriptRequiredSome}`,
      );

      const elementHandle = await page.$('mg-form');
      elementHandle.evaluate(el => {
        el.setAttribute('style', '--mg-form-inputs-title-width: 25rem;');
      });

      await page.locator('mg-form.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([true, false])('required %s', required => {
    testEach([...requiredMessageStatus.map(requiredMessage => ({ requiredMessage }))])(`Should render with props %s`, async (page: PageType, args) => {
      await setPageContent(
        page,
        `<mg-form ${renderAttributes(args)}>
        ${inputs}
        </mg-form>
        ${inputsScript}
        ${inputsScriptSetValues}
        ${required ? inputsScriptRequiredSome : ''}`,
      );

      await page.locator('mg-form.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach(['<mg-form>', '<mg-form lang="fr">'])('With different locale %s', startTag => {
    testEach([inputsScriptRequiredAll, inputsScriptRequiredSome, inputsScriptRequiredSingle])(
      'Should render required and errors %s',
      async (page: PageType, inputsScriptRequired: string) => {
        await setPageContent(
          page,
          `${startTag}
        ${inputs}
        </mg-form>
        ${inputsScript}
        ${inputsScriptRequired}`,
        );

        await page.locator('mg-form.hydrated').waitFor({ timeout: TIMEOUT });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        const elementHandle = await page.$('mg-form');
        await elementHandle.evaluate(element => {
          element.displayError();
        });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      },
    );

    test(`Should render single required input`, async ({ page }) => {
      await setPageContent(
        page,
        `${startTag}
          <mg-input-date identifier="mg-input-date" label="mg-input-date label"></mg-input-date>
        </mg-form>
        <script>
          const mgInputDate = document.querySelector('mg-input-date');
          mgInputDate.required = true;
        </script>`,
      );

      await page.locator('mg-form.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      const elementHandle = await page.$('mg-form');
      await elementHandle.evaluate(element => {
        element.displayError();
      });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach(['readonly', 'disabled'])('Should not have required message when all inputs are required and %s', async (page: PageType, attribute) => {
    await setPageContent(
      page,
      `<mg-form>
    ${inputs}
    </mg-form>
    ${inputsScript}
    ${inputsScriptSetValues}
    ${inputsScriptRequiredAll}
    ${attribute === 'readonly' ? inputsScriptReadonlyAll : inputsScriptDisabledAll}`,
    );

    await page.locator('mg-form.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
