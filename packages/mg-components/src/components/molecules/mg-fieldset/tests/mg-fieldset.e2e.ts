import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
import { test } from '../../../../utils/playwright.fixture';
import { MgFieldset } from '../mg-fieldset';
import { labelHeading } from '../../inputs/mg-input/mg-input.conf';

type PropsType = Partial<MgFieldset>;

type SlotType = {
  html: string;
  script: string;
};

const defaultProps: PropsType = {
  identifier: 'identifier',
  legend: 'legend',
};

const errorMessage = 'Joker catch you';

const helpText = 'Hello joker';

const tooltip = 'Batman is a DC Comics license';

const legendHeading = 'h3' as labelHeading;

const inputs = `
  <mg-input-text identifier="mg-input-text" label="mg-input-text label" value="batman"></mg-input-text>
  <mg-input-checkbox identifier="mg-input-checkbox" label="mg-input-checkbox label"></mg-input-checkbox>
`;

const inputsScript = `
  const mgInputCheckbox = document.querySelector('mg-input-checkbox');
  mgInputCheckbox.value = [
    { title: 'oui', value: true },
    { title: 'non', value: false },
  ];
`;

const getProps = (args: PropsType = {}): PropsType => ({ ...defaultProps, ...args });

const getSlot = (html, script): SlotType => ({ html, script });

const createHTML = (props: PropsType, slot: SlotType['html']) => `<mg-fieldset ${renderAttributes(props)}>${slot}</fieldset>`;

const setPageContent = async (page, args: PropsType, slot: SlotType) => {
  const props = getProps(args);
  await page.setContent(createHTML(props, slot.html));
  await page.addScriptTag({ content: slot.script });

  // Wait for component to be rendered
  await page.locator('mg-input-checkbox.hydrated').waitFor();
  await page.locator('mg-input-text.hydrated').waitFor();
  await page.locator('mg-fieldset.hydrated').waitFor();
};

test.describe('mg-fieldset', () => {
  [
    {},
    { legendHide: true },
    { legendHeading },
    { legendHeading, legendBorderDisplay: true },
    { legendHeading, legendBorderDisplay: true, helpText },
    { readonly: true },
    { readonly: true, legendHeading },
    { readonly: true, legendHeading, legendBorderDisplay: true },
    { readonly: true, legendHeading, legendBorderDisplay: true, helpText },
    { disabled: true },
    { tooltip },
    { tooltip, legendHeading, legendBorderDisplay: true },
    { tooltip, legendHeading, legendBorderDisplay: true, helpText },
  ].forEach((args, identifier) => {
    test(`Render template ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
      await setPageContent(page, args, getSlot(inputs, inputsScript));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('errors', () => {
    [{}, { legendHide: true }, { legendHeading }, { legendHeading, legendBorderDisplay: true }].forEach((args, identifier) => {
      test(`Render template ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
        await setPageContent(page, { ...args }, getSlot(inputs, inputsScript));

        // Display error
        await page.locator('mg-fieldset').evaluate(async (elm: HTMLMgFieldsetElement) => {
          await elm.setCustomValidity('Joker catch you');
          await elm.displayError();
        });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test.describe('help-text', () => {
    [{}, { legendHide: true }, { legendHeading }, { legendHeading, legendBorderDisplay: true }].forEach((args, identifier) => {
      test(`Render template ${renderAttributes({ ...args, identifier, helpText })}`, async ({ page }) => {
        await setPageContent(page, { ...args, helpText }, getSlot(inputs, inputsScript));

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        // Display error
        await page.locator('mg-fieldset').evaluate(async (elm: HTMLMgFieldsetElement, errorMessage) => {
          await elm.setCustomValidity(errorMessage);
          await elm.displayError();
        }, errorMessage);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
