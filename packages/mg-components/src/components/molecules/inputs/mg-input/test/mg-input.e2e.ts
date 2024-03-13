import { expect } from '@playwright/test';
import { renderProperties, renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../../utils/playwright.fixture';
import { MgInput } from '../mg-input';
import { ClassList } from '@mgdis/stencil-helpers';
// import { TooltipPosition, classDisabled, classFieldset, classReadonly } from '../mg-input.conf';
import { TooltipPosition, classFieldset, classReadonly, classVerticalList } from '../mg-input.conf';

type PropsType = Partial<MgInput & { class: string }>;

const defaultProps: PropsType = {
  identifier: 'identifier',
  label: 'label',
};

const errorMessage = 'This is an error';

const helpText = 'Hello joker';

const tooltip = 'Batman is a DC Comics license';

const getProps = (args: PropsType = {}): PropsType => ({ ...defaultProps, ...args });

const createHTML = (props: PropsType, slot?: string) => {
  return `<mg-input ${renderAttributes(props)}>${slot ? slot : `<input type="file" id="identifier" class="mg-c-input__box" ${props.class?.includes(classReadonly) ? 'hidden' : ''}></input>`}`;
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
  [{}, { required: true }, { helpText }, { errorMessage }, { helpText, errorMessage }].forEach((args, identifier) => {
    test(`Render label on top ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
      await setPageContent(page, { labelOnTop: true, ...args });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  // tooltip
  [true, false]
    .flatMap(labelOnTop => [
      { labelOnTop },
      { labelOnTop, required: true },
      { labelOnTop, tooltipPosition: 'label' as TooltipPosition },
      { labelOnTop, tooltipPosition: 'label' as TooltipPosition, required: true },
      { labelOnTop, tooltipPosition: 'input' as TooltipPosition },
      { labelOnTop, tooltipPosition: 'input' as TooltipPosition, required: true },
    ])
    .forEach((args, identifier) => {
      test(`Render with tooltip ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
        await setPageContent(page, { tooltip, ...args });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

  // tooltip-position
  [true, false]
    .flatMap(labelOnTop => [
      { labelOnTop },
      { labelOnTop, tooltipPosition: 'label' as MgInput['tooltipPosition'] },
      { labelOnTop, tooltipPosition: 'input' as MgInput['tooltipPosition'] },
    ])
    .forEach(args => {
      test(`Render tooltip-position with args: ${renderAttributes(args)}`, async ({ page }) => {
        await setPageContent(page, { tooltip, ...args });

        await page.locator('mg-input.hydrated').waitFor();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

  // readonly and required
  [true, false]
    .flatMap(required => [{ required }, { required, helpText }, { required, errorMessage }, { required, helpText, errorMessage }])
    .forEach((args, identifier) => {
      test(`Render readonly and required with args ${renderAttributes({ ...args, identifier })}, case class: ${classReadonly}`, async ({ page }) => {
        await setPageContent(page, { class: classReadonly, readonlyValue: 'batman', ...args });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

  // readonly-value
  [undefined, classVerticalList].map(className =>
    [
      { class: className },
      { class: className, readonlyValue: 'batman' },
      { class: className, readonlyValue: ['batman', 'joker', 'bane'] },
      { class: className, readonlyValue: 'batman', errorMessage },
      { class: className, readonlyValue: ['batman', 'joker', 'bane'], labelOnTop: true, tooltip },
    ].forEach((args, identifier) => {
      test(`Render readonly-value with args ${renderAttributes({ ...args, identifier })}, case class: ${classReadonly}`, async ({ page }) => {
        await setPageContent(page, { ...args, class: [classReadonly, args.class].join(' ') });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    }),
  );

  // fieldset
  [undefined, classReadonly].forEach(className => {
    test(`Render fieldset, case className ${className}`, async ({ page }) => {
      await setPageContent(page, { class: [classFieldset, className].join(' '), readonlyValue: className ? 'batman' : undefined });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' as MgInput['tooltipPosition'] }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        const props = getProps(args);
        await setPageContent(page, props);

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  // TODO test mg-panel
  // TODO test mg-mg-message
});
