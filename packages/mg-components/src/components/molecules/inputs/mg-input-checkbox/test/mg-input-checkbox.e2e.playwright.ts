import { setPageContent, expect, describe, describeEach, testEach, updateScreenshotClass, PageType, test } from '../../../../../utils/playwright.e2e.test.utils';
import { renderAttributes, renderProperties } from '../../../../../utils/e2e.test.utils';
import { CheckboxType, checkboxTypes } from '../mg-input-checkbox.conf';

const TIMEOUT = 1000;

const baseArgs = {
  label: 'legend',
  value: [
    { title: 'Batman', value: false },
    { title: 'Robin', value: false },
    { title: 'Joker', value: false },
    { title: 'Bane', value: false },
  ],
};

const createHTML = (args, identifier = 'identifier') =>
  `<mg-input-checkbox ${renderAttributes({ ...args, identifier })}></mg-input-checkbox><script>${renderProperties(args, `[identifier="${identifier}"]`)}</script>`;

const waitForInteractiveElement = async (page: PageType, type: CheckboxType) => {
  // wait few seconds to insure to have the interactive element rendered
  const interactiveElement = page.locator(type === 'multi' ? 'mg-button[tabindex="0"].hydrated' : 'mg-icon[tabindex="0"].hydrated').first();
  return interactiveElement.waitFor({ timeout: 3000 });
};

describe('mg-input-checkbox', () => {
  describeEach(checkboxTypes)('type %s', (type: CheckboxType) => {
    testEach([
      { ...baseArgs, readonly: true },
      { ...baseArgs, readonly: true, labelOnTop: true },
      { ...baseArgs, disabled: true },
      { ...baseArgs, inputVerticalList: true, helpText: 'HelpText Message' },
      { ...baseArgs, inputVerticalList: true, helpText: 'HelpText Message', labelOnTop: true },
      { ...baseArgs, helpText: `<mg-icon icon='user' size='small'></mg-icon> Welcome batman` },
      { ...baseArgs, helpText: 'HelpText Message', required: true },
      { ...baseArgs, helpText: 'HelpText Message', required: true, readonly: true },
      { ...baseArgs, helpText: 'HelpText Message', required: true, disabled: true },
    ])('Should render with template %s', async (page: PageType, args: object) => {
      await setPageContent(
        page,
        createHTML({
          ...args,
          type,
          value: [
            { title: 'Batman', value: true },
            { title: 'Robin', value: false },
            { title: 'Joker', value: null },
            { title: 'Bane', value: true, disabled: true },
          ],
        }),
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
    testEach([true, false])(`render with tooltip, case label-on-top %s`, async (page: PageType, labelOnTop: boolean) => {
      await setPageContent(
        page,
        createHTML({
          ...baseArgs,
          tooltip: 'Tooltip message',
          labelOnTop,
          type,
        }),
      );

      const KEY_TAB = 'Tab';

      expect(page.locator('mg-input-checkbox.hydrated')).toBeDefined();

      // wait few seconds to insure to have the interactive element rendered
      await waitForInteractiveElement(page, type);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      let actions = [KEY_TAB];

      // when label on top tooltip is on first tab (next to label)
      if (!labelOnTop) {
        await updateScreenshotClass(page, { height: '65px', width: '500px' });

        // when type is 'multi' the tooltip is on second tab
        actions = type !== 'multi' ? [...actions, KEY_TAB, KEY_TAB, KEY_TAB, KEY_TAB] : [...actions, KEY_TAB];
      }

      for (const key of actions) {
        await page.keyboard.down(key);
      }

      await page.locator('mg-tooltip-content').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach(
      [
        { ...baseArgs, type },
        { ...baseArgs, type, labelOnTop: true },
        { ...baseArgs, type, labelHide: true },
        { ...baseArgs, type, helpText: 'HelpText Message' },
      ],
      'only',
    )('Should render without tooltip %s', async (page: PageType, args) => {
      await setPageContent(page, createHTML(args), type === 'multi' ? { width: 300, height: 200 } : undefined);

      await page.waitForSelector('mg-input-checkbox.hydrated');

      // await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // when multi open checkbox in popover
      if (type === 'multi') {
        // wait few seconds to insure to have the interactive element rendered
        await waitForInteractiveElement(page, type);
        await page.keyboard.down('Tab');
        await page.keyboard.down('Enter');
        await page.locator('mg-popover-content').waitFor({ timeout: TIMEOUT });
      }

      await page.keyboard.down('Tab');

      // await expect(page.locator(type === 'multi' ? 'body' : '.e2e-screenshot')).toHaveScreenshot();

      await page.locator('mg-input-checkbox .mg-c-input__input-group:first-of-type input').press('Space');

      await page.keyboard.down('Tab');
      await page.locator('mg-input-checkbox .mg-c-input__input-group:nth-of-type(2) input').press('Space');

      await page.keyboard.down('Tab');
      await page.locator('mg-input-checkbox .mg-c-input__input-group:nth-of-type(3) input').press('Space');

      await page.keyboard.down('Tab');
      await page.locator('mg-input-checkbox .mg-c-input__input-group:nth-of-type(4) input').press('Space');

      // await expect(page.locator(type === 'multi' ? 'body' : '.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([
      { ...baseArgs, helpText: 'HelpText Message', required: true, type },
      { ...baseArgs, helpText: "Message d'aide", lang: 'fr', required: true, type },
    ])('Should render error when leaving an empty required input %s', async (page: PageType, args) => {
      await setPageContent(page, createHTML(args), type === 'multi' ? { width: 390, height: 200 } : undefined);

      await page.waitForSelector('mg-input-checkbox.hydrated');

      // when multi open checkbox in popover
      if (type === 'multi') {
        // wait few seconds to insure to have the interactive element rendered
        await waitForInteractiveElement(page, type);
        await page.keyboard.down('Tab');
        await page.keyboard.down('Enter');
        await page.locator('mg-popover-content').waitFor({ timeout: TIMEOUT });
      }

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      if (type === 'multi') {
        await page.keyboard.down('Escape');
      }

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([
      { label: 'long label long label long label long label long label long label long label long label long label long label long label', type, tooltip: 'tooltip message' },
      {
        label: 'long label long label long label long label long label long label long label long label long label long label long label',
        type,
        tooltip: 'tooltip message',
        labelOnTop: true,
      },
    ])('render long label in .mg-form-group, %s', async (page: PageType, args: object) => {
      await setPageContent(
        page,
        `<div class="mg-form-group">${createHTML({
          ...baseArgs,
          ...args,
          value: [
            { title: 'Batman', value: true },
            { title: 'Robin', value: false },
            { title: 'Joker', value: null },
            { title: 'Bane', value: true, disabled: true },
          ],
        })}</div>`,
      );

      await page.waitForSelector('mg-input-checkbox.hydrated');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([false, true])('Ensure component fit in width 200px with label-on-top: %s', async (page: PageType, labelOnTop) => {
      await setPageContent(page, createHTML({ ...baseArgs, labelOnTop, type }));

      await page.waitForSelector('mg-input-checkbox.hydrated');

      await page.setViewportSize({ width: 200, height: 100 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describe('type multi', () => {
    const selectedValues = baseArgs.value.map(argValue => ({ ...argValue, value: true }));
    const smallValues = baseArgs.value.map((argValue, index) => ({ ...argValue, title: index.toString(), value: true }));
    testEach([
      { disable: true, value: selectedValues },
      { disable: true, value: smallValues },
    ])('Ensure component fit in width 200px with display-values: %s', async (page: PageType, args: object) => {
      await setPageContent(page, createHTML({ ...baseArgs, ...args, type: 'multi', displaySelectedValues: true }));

      await page.locator('mg-input-checkbox.hydrated').waitFor({ timeout: TIMEOUT });

      // wait few seconds to insure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
    testEach([false, true])('Ensure component fit in width 200px with display-values: %s', async (page: PageType, displaySelectedValues) => {
      await setPageContent(page, createHTML({ ...baseArgs, type: 'multi', value: selectedValues, displaySelectedValues }));

      await page.locator('mg-input-checkbox.hydrated').waitFor({ timeout: TIMEOUT });

      // wait few seconds to insure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      await page.setViewportSize({ width: 200, height: 100 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test('Should render "multi" with search', async ({ page }) => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item, index) => ({
        title: index === 9 ? `my super long title item ${item} is very super long and finaly it could not be shorter so what can I do with it` : `${item}`,
        value: false,
      }));
      await setPageContent(page, createHTML({ ...baseArgs, value }), { width: 450, height: 470 });

      // wait few seconds to insure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // open popover
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');

      await page.locator('mg-popover-content').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('body')).toHaveScreenshot();

      // take focus in search input
      await page.keyboard.down('Tab');
      await expect(page.locator('body')).toHaveScreenshot();

      // got to navigation after 10th input
      for (const index of value.map((_item, index) => index)) {
        if (index < 10) await page.keyboard.down('Tab');
      }
      await expect(page.locator('body')).toHaveScreenshot();

      // use navigatio to go to last page
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('Enter');

      await expect(page.locator('body')).toHaveScreenshot();

      await page.getByPlaceholder(/value/).fill('2');

      await expect(page.locator('body')).toHaveScreenshot();

      // update search with an unmatchable value
      await page.getByPlaceholder(/value/).fill('batman');

      await expect(page.locator('body')).toHaveScreenshot();

      // close popover
      await page.keyboard.down('Escape');
      await updateScreenshotClass(page, { width: '285px', height: '35px' });
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test('Should render "multi" with 2 sections', async ({ page }) => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item, index) => ({
        title: `item ${item}`,
        value: [5, 12, 13, 17].some(item => item === index),
      }));
      await setPageContent(page, createHTML({ ...baseArgs, value }), { width: 450, height: 570 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // wait few seconds to insure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      // open popover
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.locator('mg-popover-content').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('body')).toHaveScreenshot();
    });

    test('Should render "multi" with 2 sections and a closed selected section', async ({ page }) => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item, index) => ({
        title: `item ${item}`,
        value: [5, 12, 13, 17].some(item => item === index),
      }));
      await setPageContent(page, createHTML({ ...baseArgs, value }), { width: 450, height: 570 });

      // wait few seconds to insure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // open popover
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.locator('mg-popover-content').waitFor({ timeout: TIMEOUT });

      // close section
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');

      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
