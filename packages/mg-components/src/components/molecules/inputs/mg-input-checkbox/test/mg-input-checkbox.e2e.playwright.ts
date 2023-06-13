import { setPageContent, expect, describe, describeEach, testEach, updateScreenshotClass, PageType } from '../../../../../utils/playwright.e2e.test.utils';
import { createID } from '../../../../../utils/components.utils';
import { renderAttributes, renderProperties } from '../../../../../utils/e2e.test.utils';
import { checkboxTypes } from '../mg-input-checkbox.conf';

const baseArgs = {
  label: 'legend',
  value: [
    { title: 'Batman', value: false },
    { title: 'Robin', value: false },
    { title: 'Joker', value: false },
    { title: 'Bane', value: false },
  ],
};

const createHTML = (args, identifier = createID()) =>
  `<mg-input-checkbox ${renderAttributes({ ...args, identifier })}></mg-input-checkbox><script>${renderProperties(args, `[identifier="${identifier}"]`)}</script>`;

describe('mg-input-checkbox', () => {
  describeEach(checkboxTypes)('type %s', type => {
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

      await expect(page.locator('mg-input-checkbox.hydrated')).toBeDefined();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      // when label on top tooltip is on first tab (next to label)
      if (!labelOnTop) {
        await updateScreenshotClass(page, { height: '65px', width: '500px' });

        // when type is 'multi' the tooltip is on second tab
        await page.keyboard.down('Tab');

        if (type !== 'multi') {
          await page.keyboard.down('Tab');
          await page.keyboard.down('Tab');
          await page.keyboard.down('Tab');
        }
      }

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([
      { ...baseArgs, type },
      { ...baseArgs, type, labelOnTop: true },
      { ...baseArgs, type, labelHide: true },
      { ...baseArgs, type, helpText: 'HelpText Message' },
    ])('Should render without tooltip %s', async (page: PageType, args) => {
      await setPageContent(page, createHTML(args));

      const element = await page.locator('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // when multi open checkbox in popover
      if (type === 'multi') {
        await updateScreenshotClass(page, { width: '300px', height: '200px' });
        await page.keyboard.down('Tab');
        await page.keyboard.down('Enter');
      }

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.locator('mg-input-checkbox .mg-input__input-group:first-of-type input').press('Space');

      await page.keyboard.down('Tab');
      await page.locator('mg-input-checkbox .mg-input__input-group:nth-of-type(2) input').press('Space');

      await page.keyboard.down('Tab');
      await page.locator('mg-input-checkbox .mg-input__input-group:nth-of-type(3) input').press('Space');

      await page.keyboard.down('Tab');
      await page.locator('mg-input-checkbox .mg-input__input-group:nth-of-type(4) input').press('Space');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([
      { ...baseArgs, helpText: 'HelpText Message', required: true, type },
      { ...baseArgs, helpText: "Message d'aide", lang: 'fr', required: true, type },
    ])('Should render error when leaving an empty required input %s', async (page: PageType, args) => {
      await setPageContent(page, createHTML(args));
      const element = await page.locator('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      // when multi open checkbox in popover
      if (type === 'multi') {
        await updateScreenshotClass(page, { width: '300px', height: '200px' });
        await page.keyboard.down('Tab');
        await page.keyboard.down('Enter');
      }

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      if (type === 'multi') {
        await page.keyboard.down('Escape');
      }

      await updateScreenshotClass(page, { width: 'unset', height: 'unset' });

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
      const element = await page.locator('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([false, true])('Ensure component fit in width 200px with label-on-top: %s', async (page: PageType, labelOnTop) => {
      await setPageContent(page, createHTML({ ...baseArgs, labelOnTop, type }));
      const element = await page.locator('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

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
      await page.locator('mg-input-checkbox');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
    testEach([false, true])('Ensure component fit in width 200px with display-values: %s', async (page: PageType, displaySelectedValues) => {
      await setPageContent(page, createHTML({ ...baseArgs, type: 'multi', value: selectedValues, displaySelectedValues }));
      const element = await page.locator('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      await page.setViewportSize({ width: 200, height: 100 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
