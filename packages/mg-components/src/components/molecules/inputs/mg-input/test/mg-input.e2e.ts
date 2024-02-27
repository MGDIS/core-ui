import { expect } from '@playwright/test';
import { renderProperties, renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../../utils/playwright.fixture';
import { MgInput } from '../mg-input';
import { ClassList } from '@mgdis/stencil-helpers';

type PropsType = Partial<MgInput>;

const defaultProps: PropsType = {
  identifier: 'identifier',
  label: 'label',
};

const errorMessage = 'This is an error';

const helpText = 'Hello joker';

const tooltip = 'Batman is a DC Comics license';

const getProps = (args: PropsType = {}): PropsType => ({ ...defaultProps, ...args });

const createHTML = (props: PropsType, slot?: string) => {
  return `<mg-input ${renderAttributes(props)}>${slot ? slot : '<input type="file" id="identifier" class="mg-c-input__box"></input>'}</mg-input>`;
};

const setPageContent = async (page, args?: PropsType) => {
  const props = getProps(args);
  await page.setContent(createHTML(props));
  await page.addScriptTag({ content: renderProperties(props, `[identifier="${props.identifier}"]`) });
  await page.locator('mg-input.hydrated').waitFor();
};

test.describe('mg-input', () => {
  [
    undefined,
    { classCollection: new ClassList([]) },
    { ['data-input-type']: 'fieldset' },
    { errorMessage },
    { errorMessage, readonly: true },
    { errorMessage, disabled: true },
    { readonlyValue: ['batman', 'joker', 'bane'], readonly: true },
    { readonly: true },
    { readonly: true, inputVerticalList: true },
    { labelOnTop: true },
    { labelHide: true },
    { inputVerticalList: true },
    { required: true },
    { helpText },
    { required: true, readonly: true, helpText },
    { required: true, disabled: true, helpText },
    { readonly: true, labelOnTop: true, tooltip },
    { disabled: true },
  ].forEach((args, identifier) => {
    test(`Render without tooltip ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
      await setPageContent(page, args);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  // [{ tooltip }, { tooltip, tooltipPosition: 'label' as MgInput['tooltipPosition'] }, { tooltip, tooltipPosition: 'input' as MgInput['tooltipPosition'], labelOnTop: true }].forEach(
  //   args => {
  //     test(`Render with ${renderAttributes(args)}`, async ({ page }) => {
  //       await setPageContent(page, args);

  //       await page.locator('mg-input.hydrated').waitFor();

  //       await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  //     });
  //   },
  // );

  // test.describe('Responsive', () => {
  //   [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' as MgInput['tooltipPosition'] }].forEach(args => {
  //     test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
  //       const props = getProps(args);
  //       await setPageContent(page, props);

  //       // Initial state
  //       await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

  //       await page.setViewportSize({ width: 767, height: 800 });

  //       // Responsive state
  //       await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  //     });
  //   });
  // });

  // TODO test mg-panel
  // TODO test mg-mg-message
});
