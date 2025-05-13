import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes, renderProperties } from '@mgdis/core-ui-helpers/dist/playwright';
import { Keys } from '../../../../../utils/events.utils';

const initArray = length => new Array(length).fill('').map((_, key) => (key + 1).toString());

const items = ['batman', 'robin', 'joker'];

const createHTML = props => {
  return `<mg-input-combobox ${renderAttributes(props)}></mg-input-combobox>`;
};

const baseArgs = {
  label: 'label',
  itemsLabel: 'Dc Comics',
  identifier: 'identifier',
  items,
};

test.describe('mg-input-combobox', () => {
  [{}, { labelOnTop: true }, { labelHide: true }, { placeholder: 'placeholder', helpText: 'HelpText Message' }].forEach(args => {
    test(`without tooltip ${renderAttributes(args)}`, async ({ page }) => {
      const componentsProps = { ...baseArgs, ...args };
      const html = createHTML(componentsProps);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

      await page.locator('mg-input-combobox.hydrated').waitFor();

      const input = page.locator('mg-input-combobox input');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // display suggestions
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // list elements
      await input.press('KeyJ');
      await input.press('KeyO');
      await input.press('KeyK');

      const height = componentsProps.labelOnTop ? 100 : 80;

      // wait for debounce
      await page.locator('.mg-c-input__input-list-item').first().getByText('Joker').waitFor();
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height } });

      // empty list
      await input.press('KeyJ');
      await input.press('KeyO');
      await input.press('KeyK');
      await input.press('KeyK');

      // wait for debounce
      await page.locator('.mg-c-input__popover-info').first().getByText('No elements match your input').waitFor();
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height } });
    });
  });

  [true, false].forEach(labelOnTop => {
    test.describe(`labelOnTop: ${labelOnTop}`, () => {
      test('with tooltip', async ({ page }) => {
        const componentsProps = { ...baseArgs, tooltip: 'Tooltip message', labelOnTop };
        const html = createHTML(componentsProps);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

        await page.locator('mg-input-combobox.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.keyboard.down('Tab');
        if (!labelOnTop) {
          await page.keyboard.down('Tab');
        }

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      [16, 4, 2].forEach(mgWidth => {
        test(`with mgWidth ${mgWidth}`, async ({ page }) => {
          const componentsProps = {
            ...baseArgs,
            value: 'M'.repeat(mgWidth),
            mgWidth,
            labelOnTop,
          };
          const html = createHTML(componentsProps);
          await page.setContent(html);
          await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      test('Ensure component fit in width 200px with label-on-top', async ({ page }) => {
        const componentsProps = {
          ...baseArgs,
          labelOnTop,
        };
        const html = createHTML(componentsProps);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

        await page.setViewportSize({ height: 100, width: 200 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [16, 4, 2].forEach(mgWidth => {
    test(`with mgWidth ${mgWidth} with tooltip`, async ({ page }) => {
      const value = 'M'.repeat(mgWidth);
      const componentsProps = {
        ...baseArgs,
        items: [...items, value],
        value,
        mgWidth,
        maxlength: mgWidth,
        tooltip: 'Tooltip message',
      };
      const html = createHTML(componentsProps);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

      // Wait for the component to be hydrated
      await page.locator('mg-input-combobox.hydrated').waitFor();

      // Focus the input field
      await page.focus('mg-input-combobox input');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Reset value
      await page.locator('input + mg-button').click();
      // Open popover
      await page.locator('input + mg-button').click();

      let width = 350;
      if (mgWidth === 2) {
        width = 190;
      } else if (mgWidth === 4) {
        width = 215;
      }
      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width, height: 75 } });
    });
  });

  [
    { readonly: true },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: 'joker', readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: 'joker', readonly: true, tooltip: 'tooltip', tooltipPosition: 'label' },
    { value: 'joker' },
    { value: 'joker', readonly: true },
    { value: 'joker', readonly: true, labelOnTop: true },
    { disabled: true },
    { value: 'joker', disabled: true },
    { value: 'batman', helpText: '<mg-icon icon="user" size="small"></mg-icon> Welcome batman' },
    { value: 'joker', helpText: 'HelpText Message', required: true },
    { value: 'joker', helpText: 'HelpText Message', required: true, readonly: true },
    { value: 'joker', helpText: 'HelpText Message', required: true, disabled: true },
    { value: 'joker', tooltip: 'joker', tooltipPosition: 'label' },
    { value: 'joker', tooltip: 'joker', tooltipPosition: 'input', labelOnTop: true },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const componentsProps = {
        ...baseArgs,
        ...args,
      };
      const html = createHTML(componentsProps);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [{}, { lang: 'fr' }].forEach(args => {
    test(`Should render error when leaving an empty required input ${renderAttributes(args)}`, async ({ page }) => {
      const componentsProps = {
        ...baseArgs,
        ...args,
        required: true,
      };
      const html = createHTML(componentsProps);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

      await page.locator('mg-input-combobox.hydrated').waitFor();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test(`Should render with load-more ${renderAttributes(args)}`, async ({ page }) => {
      const componentsProps = {
        ...baseArgs,
        ...args,
        items: initArray(25),
      };
      const html = createHTML(componentsProps);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

      // Open popover on focus
      await page.locator('input').click();

      // Scroll to bottom to show "load-more"
      const section = page.locator('.mg-c-input__popover-container');
      await section.evaluate(element => {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'instant',
        });
      });

      await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });
    });
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'joker' }, { tooltip: 'joker', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip: ${renderAttributes(args)}`, async ({ page }) => {
        const componentsProps = {
          ...baseArgs,
          ...args,
        };
        const html = createHTML(componentsProps);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test('Should reset value and error when calling reset method', async ({ page }) => {
    const componentsProps = {
      ...baseArgs,
      required: true,
    };
    const html = createHTML(componentsProps);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

    await page.locator('mg-input-combobox.hydrated').waitFor();

    // Take focus in input
    await page.keyboard.down('Tab');

    // Leave input and display error
    await page.keyboard.down('Tab');

    // Check state with value and error
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Call reset method
    await page.evaluate(() => {
      document.querySelector('mg-input-combobox').reset();
    });

    // Check that the input has been reset and the error has been removed
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should udpate error with displayError() after value update with props', async ({ page }) => {
    const componentsProps = {
      ...baseArgs,
      required: true,
      value: 'joker',
    };
    const html = createHTML(componentsProps);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

    await page.locator('mg-input-combobox.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Programaticaly remove value to display required error message
    await page.locator('mg-input-combobox').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = '';
      await elm.displayError();
    });

    // Check state
    // - without value
    // - with error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value from JS and remove required error
    await page.locator('mg-input-combobox').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = 'Hello Batman';
      await elm.displayError();
    });

    // Check state
    // - with value
    // - without error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('Navigation', () => {
    test.describe('Mouse', () => {
      test(`Should navigate throw input with mouse`, async ({ page }) => {
        const componentsProps = {
          ...baseArgs,
          items: initArray(25),
        };
        const html = createHTML(componentsProps);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Open popover on focus
        await page.locator('input').click();

        // popover opened with 10 elements
        // 1 to 10 visible
        // visual focus on 1st
        // load-more displaied
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Load more elements
        await page.getByText('Load more').click();

        // popover opened with 20 elements
        // 1 to 11 visible (1 partialy)
        // visual focus on 11th
        // load-more hidden hidden in overflow
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Scroll to bottom
        const section = page.locator('.mg-c-input__popover-container');
        await section.evaluate(element => {
          element.scrollTo({
            top: element.scrollHeight,
            behavior: 'instant',
          });
        });

        // popover opened with 20 elements
        // 11 to 20 visible (11 partialy)
        // visual focus on 11th
        // load-more visible
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Load more elements
        await page.getByText('Load more').click();

        // popover opened with 25 elements
        // 11 to 21 visible
        // visual focus on 21th
        // load-more not displaied
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Scroll to bottom
        await section.evaluate(element => {
          element.scrollTo({
            top: element.scrollHeight,
            behavior: 'instant',
          });
        });

        // popover opened with 25 elements
        // 15 to 25 visible
        // visual focus on 21th
        // hover state on 25th
        // load-more not displaied
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Load more elements
        await page.getByText('20').click();

        // input with 20th element selected and popover closed
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
    test.describe('Keyboard', () => {
      test(`Should navigate throw input values with keyboard down`, async ({ page }) => {
        const componentsProps = {
          ...baseArgs,
          items: initArray(25),
        };
        const html = createHTML(componentsProps);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Take input focus, popover stay closed
        await page.keyboard.down('Tab');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Open popover and take visual focus on first element
        await page.keyboard.down(Keys.ARROWDOWN);
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // repeat on next 9th elements to get focus on "10" value
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.locator('li:nth-of-type(5).mg-c-input__input-list-item--focus-visible').waitFor();
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.locator('li:nth-of-type(10).mg-c-input__input-list-item--focus-visible').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // trigger load-more and take focus on 11th element
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.locator('li:nth-of-type(11).mg-c-input__input-list-item--focus-visible').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // repeat on next 9th elements to get focus on "20" value
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.locator('li:nth-of-type(15).mg-c-input__input-list-item--focus-visible').waitFor();
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.locator('li:nth-of-type(20).mg-c-input__input-list-item--focus-visible').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // trigger load-more and take focus on 21th element
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.locator('li:nth-of-type(21).mg-c-input__input-list-item--focus-visible').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // repeat on next 9th elements to get focus on "5" value
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.locator('li:nth-of-type(25).mg-c-input__input-list-item--focus-visible').waitFor();
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.locator('li:nth-of-type(5).mg-c-input__input-list-item--focus-visible').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // select "5" value and popover closed
        await page.keyboard.down('Enter');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
      test(`Should navigate throw input values with keyboard up`, async ({ page }) => {
        const componentsProps = {
          ...baseArgs,
          items: initArray(25),
        };
        const html = createHTML(componentsProps);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Take input focus, popover stay closed
        await page.keyboard.down('Tab');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Open popover and take visual focus on first element
        await page.keyboard.down(Keys.ARROWDOWN);
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // take focus on "5" value with back navigation
        await page.keyboard.down(Keys.ARROWUP);
        await page.keyboard.down(Keys.ARROWUP);
        await page.keyboard.down(Keys.ARROWUP);
        await page.keyboard.down(Keys.ARROWUP);
        await page.keyboard.down(Keys.ARROWUP);
        await page.keyboard.down(Keys.ARROWUP);
        await page.locator('li:nth-of-type(5).mg-c-input__input-list-item--focus-visible').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // select "5" value and popover closed
        await page.keyboard.down('Enter');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test(`Should update value with keyboard`, async ({ page }) => {
        const componentsProps = {
          ...baseArgs,
          items: initArray(25),
        };
        const html = createHTML(componentsProps);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Take input focus, popover stay closed
        await page.keyboard.down('Tab');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Open popover and take visual focus on first element
        await page.keyboard.down(Keys.ARROWDOWN);
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Filter options
        await page.keyboard.down('Digit2');
        // wait for debounce
        await page.locator('.mg-c-input__input-list-item').first().getByText('2').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // move focus in input before value end set to input to "12"
        await page.keyboard.down(Keys.ARROWLEFT);
        await page.keyboard.down('Digit1');
        // wait for debounce
        await page.locator('.mg-c-input__input-list-item').first().getByText('12').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Open popover and take visual focus on first element
        await page.keyboard.down(Keys.ARROWDOWN);
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // move focus in input after value end set to input to "13"
        await page.keyboard.down(Keys.ARROWRIGHT);
        await page.keyboard.down('Delete');
        await page.keyboard.down('Digit3');
        // wait for debounce
        await page.locator('.mg-c-input__input-list-item').first().getByText('13').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Open popover and take visual focus on first element
        await page.keyboard.down(Keys.ARROWDOWN);
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // select "13" value and popover closed
        await page.keyboard.down('Enter');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test(`Should reset input value with keyboard`, async ({ page }) => {
        const componentsProps = {
          ...baseArgs,
          items: initArray(25),
        };
        const html = createHTML(componentsProps);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentsProps, `[identifier="${componentsProps.identifier}"]`) });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Take input focus, popover stay closed
        await page.keyboard.down('Tab');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Open popover and take visual focus on first element
        await page.keyboard.down(Keys.ARROWDOWN);
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // Filter options
        await page.keyboard.down('Digit2');
        await page.locator('.mg-c-input__input-list-item').first().getByText('2').waitFor();
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 420 } });

        // select "2" value and popover closed
        await page.keyboard.down(Keys.ARROWDOWN);
        await page.keyboard.down('Enter');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Open popover and take visual focus on first element
        await page.keyboard.down(Keys.ARROWDOWN);
        await expect(page).toHaveScreenshot({ clip: { x: 0, y: 0, width: 300, height: 320 } });

        // clear value
        await page.keyboard.down('Escape');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // close popover
        await page.keyboard.down('Escape');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // exit input and input value stay ""
        await page.keyboard.down('Tab');
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
