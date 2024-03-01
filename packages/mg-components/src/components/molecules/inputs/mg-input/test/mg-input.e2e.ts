import { expect } from '@playwright/test';
import { renderProperties, renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../../utils/playwright.fixture';
import { MgInput } from '../mg-input';
import { ClassList } from '@mgdis/stencil-helpers';
// import { TooltipPosition, classDisabled, classFieldset, classReadonly } from '../mg-input.conf';
import { TooltipPosition, classReadonly } from '../mg-input.conf';

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
  [{}, { classCollection: new ClassList([]) }, { labelHide: true }, { required: true }, { helpText }, { errorMessage }, { helpText, errorMessage }].forEach((args, identifier) => {
    test(`Render without tooltip ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
      await setPageContent(page, args);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  // label-on-top
  [
    { labelOnTop: true },
    { labelOnTop: true, required: true },
    { labelOnTop: true, helpText },
    { labelOnTop: true, errorMessage },
    { labelOnTop: true, helpText, errorMessage },
  ].forEach((args, identifier) => {
    test(`Render label on top ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
      await setPageContent(page, args);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  // tooltip
  [true, false]
    .flatMap(labelOnTop => [
      { tooltip, labelOnTop },
      { tooltip, labelOnTop, required: true },
      { tooltip, labelOnTop, tooltipPosition: 'label' as TooltipPosition },
      { tooltip, labelOnTop, tooltipPosition: 'label' as TooltipPosition, required: true },
      { tooltip, labelOnTop, tooltipPosition: 'input' as TooltipPosition },
      { tooltip, labelOnTop, tooltipPosition: 'input' as TooltipPosition, required: true },
    ])
    .forEach((args, identifier) => {
      test(`Render with tooltip ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
        await setPageContent(page, args);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

  // readonly and required
  // [true, false].flatMap(required => [
  //   { classCollection: new ClassList([classReadonly]), required },
  //   { classCollection: new ClassList([classReadonly]),required, helpText  },
  //   { classCollection: new ClassList([classReadonly]),required, errorMessage  },
  //   { classCollection: new ClassList([classReadonly]),required, helpText, errorMessage },
  // ]).forEach((args, identifier) => {
  //   test(`Render without tooltip ${renderAttributes({ ...args, identifier })}, case class: ${classReadonly}`, async ({ page }) => {
  //     await setPageContent(page, args);

  //     await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  //   });
  // });

  // readonly-value
  [
    // { readonlyValue: 'batman' },
    // { readonlyValue: ['batman', 'joker', 'bane'] },
    { errorMessage, classCollection: new ClassList([classReadonly]) },
    // { classCollection: new ClassList([classReadonly]) },
    // { classCollection: new ClassList([classReadonly]), inputVerticalList: true },
    // { required: true, classCollection: new ClassList([classReadonly]), helpText },
    // { classCollection: new ClassList([classReadonly]), labelOnTop: true, tooltip },
  ].forEach((args, identifier) => {
    test.only(`Render without tooltip ${renderAttributes({ ...args, identifier })}, case class: ${classReadonly}`, async ({ page }) => {
      await setPageContent(page, args);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  // // fieldset
  // test(`Render without tooltip classCollection, case class: ${classFieldset}`, async ({ page }) => {
  //   await setPageContent(page, { classCollection: new ClassList([classFieldset]) });

  //   await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  // });

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
