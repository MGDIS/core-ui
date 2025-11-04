import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes, renderProperties } from '@mgdis/core-ui-helpers/dist/playwright';
import { widths } from '../../mg-input/mg-input.conf';

const baseArgs = {
  identifier: 'identifier',
  label: 'label',
  items: ['blu', 'bli', 'bla', 'blo'],
};

const createHTML = args => `<mg-input-select ${renderAttributes(args)}></mg-input-select>`;

test.describe('mg-input-select', () => {
  [true, false].forEach(labelOnTop => {
    test.describe(`labelOnTop: ${labelOnTop}`, () => {
      test(`Should render with template`, async ({ page }) => {
        const componentArgs = { ...baseArgs, labelOnTop };
        const html = createHTML(componentArgs);

        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.locator('mg-input-select.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.keyboard.down('Tab');
        await page.keyboard.down('Space');
        await page.keyboard.down('ArrowDown');
        await page.keyboard.down('ArrowDown');
        await page.keyboard.down('Enter');

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      [undefined, ...widths].forEach(mgWidth => {
        test(`render with width=${mgWidth}`, async ({ page }) => {
          const componentArgs = { ...baseArgs, labelOnTop, mgWidth };
          const html = createHTML(componentArgs);
          await page.setContent(html);
          await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      test('render with tooltip', async ({ page }) => {
        const componentArgs = { ...baseArgs, labelOnTop, tooltip: 'Tooltip message' };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.locator('mg-input-select.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.keyboard.down('Tab');
        if (!labelOnTop) {
          await page.keyboard.down('Tab');
        }

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test('Ensure component fit in width 300px', async ({ page }) => {
        const componentArgs = {
          ...baseArgs,
          labelOnTop,
          items: ['blu', 'bli', 'bla', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'],
        };
        const html = createHTML(componentArgs);
        await page.setContent(html);
        await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

        await page.setViewportSize({ width: 300, height: 100 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [{ labelHide: true }, { placeholder: 'placeholder', helpText: 'HelpText Message' }].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, ...args };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [
    { readonly: true },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: 'blu', readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
    { value: 'blu', readonly: true, tooltip: 'tooltip', tooltipPosition: 'label' },
    { value: 'blu' },
    { value: 'blu', readonly: true },
    { value: 'blu', readonly: true, labelOnTop: true },
    { disabled: true },
    { value: 'blu', disabled: true },
    {
      helpText: `<p>hello <a href="h">batman<mg-icon icon="user"></mg-icon></a></p>`,
    },
    { value: 'batman', helpText: '<mg-icon icon="user" size="small"></mg-icon> Welcome batman' },
    { value: 'blu', required: true, helpText: 'HelpText Message' },
    { value: 'blu', required: true, readonly: true, helpText: 'HelpText Message' },
    { value: 'blu', required: true, disabled: true, helpText: 'HelpText Message' },
    { value: 'blu', tooltip: 'blu', tooltipPosition: 'label' },
    { value: 'blu', tooltip: 'blu', tooltipPosition: 'input', labelOnTop: true },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, ...args };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [{}, { lang: 'fr' }].forEach(args => {
    test(`Should render error when leaving an empty input ${renderAttributes(args)}`, async ({ page }) => {
      const componentArgs = { ...baseArgs, ...args, required: true };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await page.locator('mg-input-select.hydrated').waitFor();

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render a grouped list', async ({ page }) => {
    const componentArgs = {
      ...baseArgs,
      items: [
        { title: 'blu', value: 'blu', group: 'Le groupe A' },
        { title: 'blu', value: 'blublu', group: 'Le groupe B' },
        { title: 'bli', value: 'bli', group: 'Le groupe A' },
        { title: 'bli', value: 'blibli', group: 'Le groupe B' },
        { title: 'bla', value: 'blabla' },
        { title: 'blo', value: 'bloblo' },
      ],
    };
    const html = createHTML(componentArgs);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

    await page.locator('mg-input-select.hydrated').waitFor();

    await page.keyboard.down('Tab');
    await page.keyboard.down('Space');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('Enter');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test(`Should fit with a very long items`, async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 100 });
    const componentArgs = {
      ...baseArgs,
      items: [
        'batman',
        'joker',
        'bane',
        'Voici un exemple de libellé extrêmement long, qui dépasse largement la largeur normale prévue pour le champ mg-input-select et qui va mettre à l’épreuve la capacité du composant à gérer des contenus hors de sa zone de confort habituelle, tout en testant l’affichage, la gestion du texte tronqué et l’accessibilité de la sélection dans des cas extrêmes.',
      ],
    };
    const html = createHTML(componentArgs);
    await page.addStyleTag({ content: '.e2e-screenshot{width: 300px;}' });
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

    await page.locator('mg-input-select.hydrated').waitFor();

    // mg-input-select sizing should be based on the e2e-screenshot container rather than the body element
    await expect(page.locator('body')).toHaveScreenshot();
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        const componentArgs = { ...baseArgs, ...args, items: ['blu', 'bli', 'bla', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'] };
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

  [true, false].forEach(lock => {
    test(`Should reset value and error when calling reset method, lock: ${lock}`, async ({ page }) => {
      const componentArgs = {
        ...baseArgs,
        required: true,
        items: ['Chase', 'Marshall', 'Rubble', 'Rocky'],
      };
      const html = createHTML(componentArgs);
      await page.setContent(html);
      await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

      await page.locator('mg-input-select.hydrated').waitFor();

      // Set an error message
      await page.evaluate(lock => {
        document.querySelector('mg-input-select').setError(false, "Message d'erreur de test", lock);
      }, lock);

      // Verify the state with custom error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // render required error
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      // Verify the state with required error
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Select a value
      await page.selectOption('mg-input-select select', 'Marshall');

      // Set an error message
      await page.evaluate(lock => {
        document.querySelector('mg-input-select').setError(false, "Message d'erreur de test", lock);
      }, lock);

      // Verify the state with custom error message
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      // Call the reset method
      await page.evaluate(() => {
        document.querySelector('mg-input-select').reset();
      });

      // Verify that the value has been reset and the error has been removed
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should udpate error with displayError() after value update with props', async ({ page }) => {
    const componentArgs = {
      ...baseArgs,
      required: true,
      items: ['Batman', 'Joker', 'Bane'],
      value: 'Batman',
    };
    const html = createHTML(componentArgs);

    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(componentArgs, `[identifier="${componentArgs.identifier}"]`) });

    await page.locator('mg-input-select.hydrated').waitFor();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Programaticaly remove value to display required error message
    await page.locator('mg-input-select').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = '';
      await elm.displayError();
    });

    // Check state
    // - without any selected value
    // - with error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Enter a new value from JS and remove required error
    await page.locator('mg-input-select').evaluate(async (elm: HTMLMgInputTextElement) => {
      elm.value = 'Joker';
      await elm.displayError();
    });

    // Check state
    // - with selected value
    // - without error message
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
