import { renderAttributes, renderProperties } from '../../../../../utils/e2e.test.utils';
import { setPageContent, describe, testEach, expect, PageType, test } from '../../../../../utils/playwright.e2e.test.utils';
import { MgInputToggle } from '../mg-input-toggle';

type PropsType = Partial<MgInputToggle>;

const TIMEOUT = 1000;

const defaultSlots = '<span slot="item-1">Choix A</span><span slot="item-2">Choix B</span>';

const defaultProps = {
  identifier: 'identifier',
  label: 'label',
  items: [
    { title: 'batman', value: false },
    { title: 'joker', value: true },
  ],
};

const createHTML = (args: PropsType = {}, slots = defaultSlots) => {
  const props = { ...defaultProps, ...args };
  return `<mg-input-toggle ${renderAttributes(props)}>${slots}</mg-input-toggle><script>${renderProperties(props, `[identifier="${props.identifier}"]`)}</script>`;
};

describe('mg-input-toggle', () => {
  testEach([
    {},
    { args: { isOnOff: true }, slots: '<span slot="item-1">Non</span><span slot="item-2">Oui</span>' },
    { args: { isIcon: true, isOnOff: true }, slots: '<mg-icon icon="cross" slot="item-1"></mg-icon><mg-icon icon="check" slot="item-2"></mg-icon>' },
    {
      slots:
        '<span slot="item-1">Choix A très long long long long long long long long long long long long long</span><span slot="item-2">Choix B très long long long long long long long long long long long long long</span>',
    },
  ])('Keyboard navigation %s', async (page: PageType, { args, slots }: { args: PropsType; slots: string }) => {
    await setPageContent(page, createHTML(args, slots));

    await page.locator('mg-input-toggle.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    for (const key of ['Tab', 'Space', 'Tab']) {
      if (key === 'Space') await page.locator('mg-input-toggle button').press('Space');
      else await page.keyboard.down(key);
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    }
  });

  testEach([
    { args: { labelOnTop: true, helpText: 'HelpText Message' } },
    { args: { inputVerticalList: true, helpText: 'HelpText Message' } },
    { args: { labelOnTop: true, inputVerticalList: true, helpText: 'HelpText Message' } },
    {
      slots:
        '<span slot="item-1">Choix A très long long long long long long long long long long long long long</span><span slot="item-2">Choix B très long long long long long long long long long long long long long</span>',
    },
    { args: { readonly: true }, slots: '<span slot="item-1">Choix A avec text long long</span><span slot="item-2">Choix B avec text long long</span>' },
    { args: { labelHide: true } },
    { args: { isOnOff: true, readonly: true }, slots: '<span slot="item-1">Off</span><span slot="item-2">On</span>' },
    { args: { placeholder: 'placeholder', helpText: 'HelpText Message' } },
    { args: { helpText: '<mg-icon icon="user" size="small"></mg-icon> Welcome batman' } },
  ])('Render without tooltip %s', async (page: PageType, { args, slots }: { args: PropsType; slots: string }) => {
    await setPageContent(page, createHTML(args, slots));

    await page.locator('mg-input-toggle.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  testEach([undefined, false, true])('Render and toggle value with reverse checked logic %s', async (page: PageType, value) => {
    await setPageContent(
      page,
      createHTML({
        items: [
          { title: 'batman', value: true },
          { title: 'joker', value: false },
        ],
        value,
      }),
    );

    await page.locator('mg-input-toggle.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.locator('mg-input-toggle button').click();

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  testEach([true, false])('render with tooltip, case label-on-top %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(page, createHTML({ tooltip: 'Tooltip message', labelOnTop }), { width: 250, height: 65 });

    await page.locator('mg-input-toggle.hydrated').waitFor({ timeout: TIMEOUT });
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  testEach(
    [true, false].flatMap(value =>
      [true, false].flatMap(readonly => [true, false].flatMap(labelOnTop => [true, false].map(disabled => ({ value, labelOnTop, readonly, disabled })))),
    ),
  )('Should render with template %s', async (page: PageType, args) => {
    await setPageContent(page, createHTML(args));

    await page.locator('mg-input-toggle.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  testEach(
    [true, false].map(labelOnTop => ({
      label: 'long label long label long label long label long label long label long label long label long label long label long label',
      tooltip: 'tooltip message',
      labelOnTop,
    })),
  )('render inside a div.mg-form-group %s', async (page: PageType, args) => {
    await setPageContent(page, `<div class="mg-form-group">${createHTML(args)}</div>`);

    await page.locator('mg-input-toggle.hydrated').waitFor({ timeout: TIMEOUT });
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('render with error', async ({ page }) => {
    await setPageContent(page, createHTML({}));

    await page.locator('mg-input-toggle.hydrated').waitFor({ timeout: TIMEOUT });
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.$eval('mg-input-toggle', async el => {
      await el.setError(false, 'This is an error Batman');
    });

    page.locator('.mg-c-input__input--has-error');
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
