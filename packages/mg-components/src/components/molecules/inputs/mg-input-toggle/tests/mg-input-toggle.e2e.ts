import { expect } from '@playwright/test';
import { renderProperties, renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../../utils/playwright.fixture';
import { MgInputToggle } from '../mg-input-toggle';
import { ToggleValue } from '../mg-input-toggle.conf';

const getItemsFromStrings = (items: string[]): ToggleValue[] => items.map((item, index) => ({ title: item, value: index === 1 }));

const defaultItems = getItemsFromStrings(['Choix A', 'Choix B']);

const defaultProps = {
  identifier: 'identifier',
  label: 'label',
  items: defaultItems,
};

const getProps = args => ({ ...defaultProps, ...args });

const renderSlot = (title: string, index: number) => `<span slot="item-${index + 1}">${title}</span>`;

const createHTML = props => {
  return `<mg-input-toggle ${renderAttributes(props)}>${
    props.isIcon
      ? ['cross', 'check'].map(
          (icon, index) =>
            `<span slot="item-${index + 1}">
        <mg-icon icon="${icon}"></mg-icon>
      </span>`,
        )
      : props.items.map((item, index) => renderSlot(item.title, index))
  }}</mg-input-toggle>`;
};

const setPageContent = async (page, args?) => {
  const props = getProps(args);
  await page.setContent(createHTML(props));
  await page.addScriptTag({ content: renderProperties(props, `[identifier="${props.identifier}"]`) });
  await page.locator('mg-input-toggle.hydrated').waitFor();
};

test.describe('mg-input-toggle', () => {
  [
    {},
    { isOnOff: true, items: getItemsFromStrings(['Non', 'Oui']) },
    { isIcon: true, isOnOff: true, items: getItemsFromStrings(['Non', 'Oui']) },
    {
      items: getItemsFromStrings([
        'Choix A très long long long long long long long long long long long long long',
        'Choix B très long long long long long long long long long long long long long',
      ]),
    },
  ].forEach(args => {
    test(`Keyboard navigation ${JSON.stringify(args)}`, async ({ page }) => {
      await setPageContent(page, args);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      for (const key of ['Tab', 'Space', 'Tab']) {
        if (key === 'Space') await page.locator('mg-input-toggle button').press('Space');
        else await page.keyboard.down(key);
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      }
    });
  });

  [
    { labelOnTop: true, helpText: 'HelpText Message' },
    { inputVerticalList: true, helpText: 'HelpText Message' },
    { labelOnTop: true, inputVerticalList: true, helpText: 'HelpText Message' },
    {
      items: getItemsFromStrings([
        'Choix A très long long long long long long long long long long long long long',
        'Choix B très long long long long long long long long long long long long long',
      ]),
    },
    { readonly: true, items: getItemsFromStrings(['Choix A avec text long long', 'Choix B avec text long long']) },
    { labelHide: true },
    { isOnOff: true, readonly: true, items: getItemsFromStrings(['Off', 'On']) },
    { placeholder: 'placeholder', helpText: 'HelpText Message' },
    { helpText: '<mg-icon icon="user" size="small"></mg-icon> Welcome batman' },
  ].forEach(args => {
    test(`Render without tooltip ${renderAttributes(args)}`, async ({ page }) => {
      await setPageContent(page, args);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [
    { tooltip: 'blu', tooltipPosition: 'label' as MgInputToggle['tooltipPosition'] },
    { tooltip: 'blu', tooltipPosition: 'input' as MgInputToggle['tooltipPosition'], labelOnTop: true },
    { readonly: true, tooltip: 'tooltip', tooltipPosition: 'input' },
  ].forEach(args => {
    test(`Render with ${renderAttributes(args)}`, async ({ page }) => {
      await setPageContent(page, args);

      await page.locator('mg-input-toggle.hydrated').waitFor();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [undefined, false, true].forEach(value => {
    test(`Render and toggle value with reverse checked logic value="${value}"`, async ({ page }) => {
      await setPageContent(page, {
        items: defaultItems.map((item, index) => ({ ...item, value: index === 0 })),
        value,
      });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.locator('mg-input-toggle button').click();

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false].forEach(labelOnTop => {
    test(`render with tooltip, case label-on-top ${labelOnTop}`, async ({ page }) => {
      await setPageContent(page, { tooltip: 'Tooltip message', labelOnTop });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');
      if (!labelOnTop) {
        await page.keyboard.down('Tab');
      }

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  [true, false]
    .flatMap(value => [true, false].flatMap(readonly => [true, false].flatMap(labelOnTop => [true, false].map(disabled => ({ value, labelOnTop, readonly, disabled })))))
    .forEach(args => {
      test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
        await setPageContent(page, args);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

  test('render with error', async ({ page }) => {
    await setPageContent(page);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.$eval('mg-input-toggle', async el => {
      await el.setError(false, 'This is an error Batman');
    });

    page.locator('.mg-c-input__input--has-error');
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' as MgInputToggle['tooltipPosition'] }].forEach(args => {
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
});
