import { expect } from '@playwright/test';
import { renderProperties, renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../../utils/playwright.fixture';
import { MgInput } from '../mg-input';
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

const setPageContent = async (page, args?: PropsType, slot?: string) => {
  const props = getProps(args);
  await page.setContent(createHTML(props, slot));
  await page.addScriptTag({ content: renderProperties(props, `[identifier="${props.identifier}"]`) });
  await page.locator('mg-input.hydrated').waitFor();
};

test.describe('mg-input', () => {
  [{}, { class: '' }, { labelHide: true }, { required: true }, { helpText }, { errorMessage }, { helpText, errorMessage }].forEach((args, identifier) => {
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
  [true, false].forEach(labelOnTop => {
    [
      { labelOnTop },
      { labelOnTop, required: true },
      { labelOnTop, tooltipPosition: 'label' as TooltipPosition },
      { labelOnTop, tooltipPosition: 'label' as TooltipPosition, required: true },
      { labelOnTop, tooltipPosition: 'input' as TooltipPosition },
      { labelOnTop, tooltipPosition: 'input' as TooltipPosition, required: true },
    ].forEach((args, identifier) => {
      test(`Render with tooltip ${renderAttributes({ ...args, identifier })}`, async ({ page }) => {
        await setPageContent(page, { tooltip, ...args });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  // tooltip-position
  [true, false].forEach(labelOnTop => {
    test.describe(`label-on-top="${labelOnTop}"`, () => {
      [{ labelOnTop }, { labelOnTop, tooltipPosition: 'label' as MgInput['tooltipPosition'] }, { labelOnTop, tooltipPosition: 'input' as MgInput['tooltipPosition'] }].forEach(
        args => {
          test(`Render tooltip-position with args: ${renderAttributes(args)}`, async ({ page }) => {
            await setPageContent(page, { tooltip, ...args });

            await page.locator('mg-input.hydrated').waitFor();

            await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
          });
        },
      );
    });
  });

  // readonly and required
  [true, false].forEach(required => {
    test.describe(`required="${required}"`, () => {
      [{ required }, { required, helpText }, { required, errorMessage }, { required, helpText, errorMessage }].forEach((args, identifier) => {
        test(`Render readonly and required with args ${renderAttributes({ ...args, identifier })}, case class: ${classReadonly}`, async ({ page }) => {
          await setPageContent(page, { class: classReadonly, readonlyValue: 'batman', ...args });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });
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

  test.describe('non input slot', () => {
    test('Should render with an mg-panel slot', async ({ page }) => {
      await page.addStyleTag({ content: '.size-full{flex: 1;}' });
      await setPageContent(
        page,
        defaultProps,
        `<mg-panel ${renderAttributes({ panelTitle: 'Batman', identidier: 'panel', class: 'size-full', expanded: true })}><p>La colère décuple ta puissance, mais si tu la laisses te dominer, elle va te détruire. Un justicier n'est qu'un homme égaré dans une course effrénée vers son auto-satisfaction. Tu as peur de ta propre force et de ta propre colère. Nous tombons pour mieux apprendre à nous relever.</p></mg-panel>`,
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test('Should render with an mg-message slot', async ({ page }) => {
      await setPageContent(
        page,
        defaultProps,
        `<mg-message ${renderAttributes({ identifier: 'identifier', variant: 'warning' })}><span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></span><span slot="actions"><div class="mg-l-group-elements mg-l-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div></span></mg-message>`,
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
