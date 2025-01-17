import { expect } from '@playwright/test';
import { renderAttributes, renderProperties } from '@mgdis/playwright-helpers';
import { test } from '../../../../../utils/playwright.fixture';
import { CheckboxType, checkboxTypes } from '../mg-input-checkbox.conf';

const baseArgs = {
  identifier: 'identifier',
  label: 'legend',
  value: [
    { title: 'Batman', value: false },
    { title: 'Robin', value: false },
    { title: 'Joker', value: false },
    { title: 'Bane', value: false },
  ],
};

const createHTML = args => `<mg-input-checkbox ${renderAttributes(args)}></mg-input-checkbox>`;

const waitForInteractiveElement = (page, type: CheckboxType) => {
  // wait to ensure to have the interactive element rendered
  const interactiveElement = page.locator(type === 'multi' ? 'mg-button[tabindex="0"].hydrated' : 'mg-icon[tabindex="0"].hydrated').first();
  return interactiveElement.waitFor();
};

test.describe('mg-input-checkbox', () => {
  checkboxTypes.forEach((type: CheckboxType) => {
    test.describe(type, () => {
      [
        { ...baseArgs, readonly: true },
        { ...baseArgs, readonly: true, labelOnTop: true },
        { ...baseArgs, readonly: true, inputVerticalList: true },
        { ...baseArgs, readonly: true, labelOnTop: true, inputVerticalList: true },
        { ...baseArgs, disabled: true },
        { ...baseArgs, inputVerticalList: true, helpText: 'HelpText Message' },
        { ...baseArgs, inputVerticalList: true, helpText: 'HelpText Message', labelOnTop: true },
        { ...baseArgs, helpText: `<mg-icon icon='user' size='small'></mg-icon> Welcome batman` },
        { ...baseArgs, helpText: 'HelpText Message', required: true },
        { ...baseArgs, helpText: 'HelpText Message', required: true, readonly: true },
        { ...baseArgs, helpText: 'HelpText Message', required: true, disabled: true },
        { ...baseArgs, type, tooltip: 'blu' },
        { ...baseArgs, type, tooltip: 'blu', tooltipPosition: 'label' },
        { ...baseArgs, type, tooltip: 'blu', tooltipPosition: 'label', readonly: true },
        { ...baseArgs, type, tooltip: 'blu', tooltipPosition: 'input', readonly: true },
        { ...baseArgs, type, tooltip: 'blu', tooltipPosition: 'label', labelOnTop: true },
      ].forEach(args => {
        test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
          const componentArgs = {
            ...args,
            type,
            value: [
              { title: 'Batman', value: true },
              { title: 'Robin', value: false },
              { title: 'Joker', value: null },
              { title: 'Bane', value: true, disabled: true },
            ],
          };
          const html = createHTML(componentArgs);
          await page.setContent(html);
          await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      test.describe('readonly', () => {
        test(`Should render with tooltip`, async ({ page }) => {
          const componentArgs = {
            ...baseArgs,
            type,
            readonly: true,
            tooltip: 'tooltip',
            tooltipPosition: 'input',
          };
          const html = createHTML(componentArgs);
          await page.setContent(html);
          await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      [true, false].forEach((labelOnTop: boolean) => {
        test(`render with tooltip, case label-on-top ${labelOnTop}`, async ({ page }) => {
          const componentArgs = {
            ...baseArgs,
            tooltip: 'Tooltip message',
            labelOnTop,
            type,
          };
          const html = createHTML(componentArgs);

          await page.setContent(html);
          await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

          expect(page.locator('mg-input-checkbox.hydrated')).toBeDefined();

          // wait to ensure to have the interactive element rendered
          await waitForInteractiveElement(page, type);

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

          await page.keyboard.down('Tab');
          if (!labelOnTop) {
            await page.keyboard.down('Tab');
            await page.keyboard.down('Tab');
            await page.keyboard.down('Tab');
            await page.keyboard.down('Tab');
          }

          await page.locator('mg-tooltip-content').waitFor();

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      [
        { ...baseArgs, type },
        { ...baseArgs, type, labelOnTop: true },
        { ...baseArgs, type, labelHide: true },
        { ...baseArgs, type, helpText: 'HelpText Message' },
      ].forEach((args, index) => {
        test(`Should render without tooltip ${index + 1}`, async ({ page }) => {
          const html = createHTML(args);
          await page.setContent(html);
          await page.addScriptTag({ content: renderProperties(args, `[identifier="${args.identifier}"]`) });

          await page.locator('mg-input-checkbox.hydrated').waitFor();

          // Screenshot with focus on first item
          if (type === 'multi') {
            // On type multi we need to also capture the popover
            await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 200 } });
          } else {
            await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
          }

          // when multi open checkbox in popover
          if (type === 'multi') {
            // wait to ensure to have the interactive element rendered
            await waitForInteractiveElement(page, type);
            await page.keyboard.down('Tab');
            await page.keyboard.down('Enter');
            await page.locator('mg-popover-content').waitFor();
          }

          await page.keyboard.down('Tab');

          // Screenshot with focus on first item
          if (type === 'multi') {
            // On type multi we need to also capture the popover
            await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 200 } });
          } else {
            await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
          }

          await page.locator('mg-input-checkbox .mg-c-input__input-group:first-of-type input').press('Space');

          await page.keyboard.down('Tab');
          await page.locator('mg-input-checkbox .mg-c-input__input-group:nth-of-type(2) input').press('Space');

          await page.keyboard.down('Tab');
          await page.locator('mg-input-checkbox .mg-c-input__input-group:nth-of-type(3) input').press('Space');

          await page.keyboard.down('Tab');
          await page.locator('mg-input-checkbox .mg-c-input__input-group:nth-of-type(4) input').press('Space');

          // Screenshot with all selected items and focus on last item
          if (type === 'multi') {
            // On type multi we need to also capture the popover
            await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 200 } });
          } else {
            await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
          }

          await page.keyboard.down('Tab');

          // Screenshot with all selected items and without focus
          if (type === 'multi') {
            // On type multi we need to also capture the popover
            await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 200 } });
          } else {
            await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
          }
        });
      });

      [
        { ...baseArgs, helpText: 'HelpText Message', required: true, type },
        { ...baseArgs, helpText: "Message d'aide", lang: 'fr', required: true, type },
      ].forEach((args, index) => {
        test(`Should render error when leaving an empty required input ${index + 1}`, async ({ page }) => {
          const html = createHTML(args);
          await page.setContent(html);
          await page.addScriptTag({ content: renderProperties(args, `[identifier="${args.identifier}"]`) });

          await page.locator('mg-input-checkbox.hydrated').waitFor();

          // when multi open checkbox in popover
          if (type === 'multi') {
            // wait to ensure to have the interactive element rendered
            await waitForInteractiveElement(page, type);
            await page.keyboard.down('Tab');
            await page.keyboard.down('Enter');
            await page.locator('mg-popover-content').waitFor();
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
      });

      [false, true].forEach((labelOnTop: boolean) => {
        test(`Ensure component fit in width 200px with label-on-top: ${labelOnTop}`, async ({ page }) => {
          const componentArgs = { ...baseArgs, labelOnTop, type };
          const html = createHTML(componentArgs);
          await page.setContent(html);
          await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

          await page.locator('mg-input-checkbox.hydrated').waitFor();

          await page.setViewportSize({ width: 200, height: 100 });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('type multi', () => {
    const selectedValues = baseArgs.value.map(argValue => ({ ...argValue, value: true }));
    const smallValues = baseArgs.value.map((argValue, index) => ({ ...argValue, title: index.toString(), value: true }));

    [
      { disable: true, value: selectedValues },
      { disable: true, value: smallValues },
    ].forEach((args, index) => {
      test(`Ensure component fit in width 200px ${index + 1}`, async ({ page }) => {
        const componentArgs = { ...baseArgs, ...args, type: 'multi', displaySelectedValues: true };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.locator('mg-input-checkbox.hydrated').waitFor();

        // wait to ensure to have the interactive element rendered
        await waitForInteractiveElement(page, 'multi');

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

    [false, true].forEach((displaySelectedValues: boolean) => {
      test(`Ensure component fit in width 200px with display-values: ${displaySelectedValues}`, async ({ page }) => {
        const componentArgs = { ...baseArgs, type: 'multi', value: selectedValues, displaySelectedValues };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.locator('mg-input-checkbox.hydrated').waitFor();

        // wait to ensure to have the interactive element rendered
        await waitForInteractiveElement(page, 'multi');

        await page.setViewportSize({ width: 200, height: 100 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

    test('Should render "multi" with search', async ({ page }) => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item, index) => ({
        title: index === 9 ? `my super long title item ${item} is very super long and finaly it could not be shorter so what can I do with it` : `${item}`,
        value: false,
      }));
      const componentArgs = { ...baseArgs, value };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      // wait to ensure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // open popover
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');

      await page.locator('mg-popover-content').waitFor();

      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // take focus in search input
      await page.keyboard.down('Tab');
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // got to navigation after 10th input
      for (const index of value.map((_item, index) => index)) {
        if (index < 10) await page.keyboard.down('Tab');
      }
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // use navigatio to go to last page
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('Enter');

      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      await page.getByPlaceholder(/value/).fill('2');

      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // update search with an unmatchable value
      await page.getByPlaceholder(/value/).fill('batman');

      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // close popover
      await page.keyboard.down('Escape');
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test('Should render "multi" with 2 sections', async ({ page }) => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item, index) => ({
        title: `item ${item}`,
        value: [5, 12, 13, 17].some(item => item === index),
      }));
      const componentArgs = { ...baseArgs, value };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // wait to ensure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      // open popover
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.locator('mg-popover-content').waitFor();

      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 570 } });
    });

    test('Should render "multi" with 2 sections and a closed selected section', async ({ page }) => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item, index) => ({
        title: `item ${item}`,
        value: [5, 12, 13, 17].some(item => item === index),
      }));
      const componentArgs = { ...baseArgs, value };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      // wait to ensure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // open popover
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.locator('mg-popover-content').waitFor();

      // close section
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');

      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 570 } });
    });

    test('Should select all filtered values', async ({ page }) => {
      const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((item, index) => ({
        title: index === 9 ? `my super long title item ${item} is very super long and finaly it could not be shorter so what can I do with it` : `${item}`,
        value: false,
      }));
      const componentArgs = { ...baseArgs, value };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      // wait to ensure to have the interactive element rendered
      await waitForInteractiveElement(page, 'multi');

      // open popover
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.locator('mg-popover-content').waitFor();
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // filter content
      await page.keyboard.down('Tab');
      await page.keyboard.down('2');
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // display tooltip
      await page.keyboard.down('Tab');
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // select all
      await page.keyboard.down('Enter');
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // remove filter
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Delete');
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });

      // display tooltip
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 450, height: 470 } });
    });
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        const componentArgs = { ...baseArgs, ...args };
        const html = createHTML(componentArgs);

        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test.describe('Reset input', () => {
    test('Should reset value and error when calling reset method', async ({ page }) => {
      const componentArgs = {
        ...baseArgs,
        value: [
          { title: 'Chase', value: false },
          { title: 'Marshall', value: false },
        ],
      };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await page.locator('mg-input-checkbox.hydrated').waitFor();

      // Check a box
      await page.locator('mg-input-checkbox input').first().press('Space');

      // Set an error message intentionally
      await page.evaluate(() => {
        document.querySelector('mg-input-checkbox').setError(false, "Message d'erreur de test");
      });

      // Verify the state with error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Call the reset method
      await page.evaluate(() => {
        document.querySelector('mg-input-checkbox').reset();
      });

      // Verify that the input has been reset and the error has been removed
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
  test('Should udpate error with displayError() after value update with props', async ({page}) => {
    const componentArgs = {
      ...baseArgs,
      required: true,
      value: baseArgs.value.map((val, i) => ({...val, value: i === 0}))
    }
    const html = createHTML(componentArgs);

    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

    await page.locator('mg-input-checkbox.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Programaticaly remove value to display required error message
    await page.locator('mg-input-checkbox').evaluate(async (elm: HTMLMgInputTextElement, value) => {
      elm.value = value;
      await elm.displayError()
    }, baseArgs.value);

    // Check state 
    // - without any selected value
    // - with error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value from JS and remove required error
    await page.locator('mg-input-checkbox').evaluate(async (elm: HTMLMgInputTextElement, value) => {
      elm.value = value.map((val, i) => ({...val, value: i === 2}));
      await elm.displayError()
    }, baseArgs.value);

    // Check state 
    // - with selected value
    // - without error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  })
});
