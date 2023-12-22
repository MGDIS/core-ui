import { renderAttributes, renderProperties } from '@mgdis/stencil-helpers';
import { setPageContent, expect, describe, test, testEach, PageType, updateScreenshotClass, describeEach } from '../../../../../utils/playwright.e2e.test.utils';
import { MgInputText } from '../mg-input-text';

const creatHtml = (props: Partial<MgInputText & { slot: string }>) => {
  const slot = props.slot;
  delete props.slot;
  return `<mg-input-text ${renderAttributes(props)}>${slot}</mg-input-text><script>${renderProperties(props, `[identifier="${props.identifier}"]`)}</script>`;
};

const defaultProps = { identifier: 'identifier', label: 'label' };

describe('mg-input-text', () => {
  describe('render', () => {
    testEach([
      { ...defaultProps },
      { ...defaultProps, labelOnTop: true },
      { ...defaultProps, labelHide: true },
      { ...defaultProps, placeholder: 'placeholder', helpText: 'HelpText Message' },
    ])('without tooltip %s', async (page: PageType, props: MgInputText) => {
      await setPageContent(page, creatHtml(props));

      const element = page.locator('mg-input-text.hydrated');
      await element.waitFor({ timeout: 1000 });
      const input = page.locator('mg-input-text input');

      // Hide caret for screenshots
      await page.locator('mg-input-text input').evaluate(element => (element.style.caretColor = 'transparent'));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await input.press('KeyB');
      await input.press('KeyL');
      await input.press('KeyU');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([true, false])('with tooltip, case label-on-top %s', async (page: PageType, labelOnTop: boolean) => {
      const args: Partial<MgInputText> = { ...defaultProps, tooltip: 'Tooltip message', labelOnTop };
      await setPageContent(page, creatHtml(args));

      const element = page.locator('mg-input-text.hydrated');
      await element.waitFor({ timeout: 1000 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');
      if (!labelOnTop) {
        // Ensure to display tooltip
        await page.setViewportSize({ height: 100, width: 500 });
        await updateScreenshotClass(page, { height: '65px', width: '500px' });
        // when label on top tooltip is on fist tab (next to label)
        await page.keyboard.down('Tab');
      }

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([
      { ...defaultProps, readonly: true },
      { ...defaultProps, value: 'blu' },
      { ...defaultProps, value: 'blu', readonly: true },
      { ...defaultProps, value: 'blu', readonly: true, labelOnTop: true },
      { ...defaultProps, disabled: true },
      { ...defaultProps, value: 'blu', disabled: true },
      { ...defaultProps, value: 'batman', helpText: '<mg-icon icon="user" size="small"></mg-icon> Welcome batman' },
      { ...defaultProps, value: 'blu', helpText: 'HelpText Message', required: true },
      { ...defaultProps, value: 'blu', helpText: 'HelpText Message', required: true, readonly: true },
      { ...defaultProps, value: 'blu', helpText: 'HelpText Message', required: true, disabled: true },
    ])('Should render with template %s', async (page: PageType, args) => {
      await setPageContent(page, creatHtml(args));

      const element = page.locator('mg-input-text.hydrated');
      await element.waitFor({ timeout: 1000 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([
      { ...defaultProps, required: true },
      { ...defaultProps, required: true, lang: 'fr' },
    ])('Should render error when leaving an empty required input %s', async (page: PageType, args) => {
      await setPageContent(page, creatHtml(args));

      const element = page.locator('mg-input-text.hydrated');
      await element.waitFor({ timeout: 1000 });

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([16, 'full'])('Should render error when leaving input with a non matching pattern value, mg-width: %s', async (page: PageType, mgWidth: MgInputText['mgWidth']) => {
      await setPageContent(
        page,
        creatHtml({
          ...defaultProps,
          mgWidth,
          pattern: '[a-z]*',
          patternErrorMessage: 'Vous ne pouvez saisir que des lettres minuscules.',
        }),
      );

      const element = page.locator('mg-input-text.hydrated');
      await element.waitFor({ timeout: 1000 });
      const input = page.locator('mg-input-text input');

      expect(element).toHaveClass('hydrated');

      await page.keyboard.down('Tab');

      await input.press('KeyB');
      await input.press('KeyL');
      await input.press('KeyU');
      await input.press('1');

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([
      {
        ...defaultProps,
        label: 'long label long label long label long label long label long label long label long label long label long label long label',
        tooltip: 'tooltip message',
      },
      {
        ...defaultProps,
        label: 'long label long label long label long label long label long label long label long label long label long label long label',
        tooltip: 'tooltip message',
        labelOnTop: true,
      },
    ])('inside a div.mg-form-group %s', async (page: PageType, args) => {
      await setPageContent(page, `<div class="mg-form-group">${creatHtml(args)}</div>`);

      const element = page.locator('mg-input-text.hydrated');
      await element.waitFor({ timeout: 1000 });

      await page.setViewportSize({ height: 100, width: 500 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    describeEach([true, false])('using append-input slot, case readonly %s', (readonly: boolean) => {
      testEach([
        {
          ...defaultProps,
          type: 'search',
          slot: `<mg-button slot="append-input" label="search">
          <mg-icon icon="magnifying-glass"></mg-icon> Search
        </mg-button>`,
          icon: 'magnifying-glass',
        },
        {
          ...defaultProps,
          type: 'text',
          slot: '<span slot="append-input">@dc.comics</span>',
        },
        {
          ...defaultProps,
          type: 'text',
          slot: `<mg-button is-icon slot="append-input" label="cancel" variant="secondary">
          <mg-icon icon="cross"></mg-icon>
        </mg-button>
        <mg-button is-icon slot="append-input" label="validate" variant="secondary">
          <mg-icon icon="check"></mg-icon>
        </mg-button>
        `,
        },
      ])('render slot %s', async (page: PageType, props: Record<string, unknown>) => {
        await setPageContent(
          page,
          creatHtml({
            ...props,
            placeholder: 'placeholder',
            value: 'bruce',
            readonly,
          }),
        );

        const element = page.locator('mg-input-text.hydrated');
        await element.waitFor({ timeout: 1000 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

    describeEach([16, 4, 2])('with custom width: %s', (mgWidth: MgInputText['mgWidth']) => {
      testEach([false, true])('with label on top: %s', async (page: PageType, labelOnTop: MgInputText['labelOnTop']) => {
        await setPageContent(
          page,
          creatHtml({
            ...defaultProps,
            value: 'bruce',
            mgWidth,
            labelOnTop,
          }),
        );

        const element = page.locator('mg-input-text.hydrated');
        await element.waitFor({ timeout: 1000 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });

    testEach([false, true])('Ensure component fit in width 200px with label-on-top: %s', async (page: PageType, labelOnTop: MgInputText['labelOnTop']) => {
      await setPageContent(
        page,
        creatHtml({
          ...defaultProps,
          labelOnTop,
        }),
      );

      const element = page.locator('mg-input-text.hydrated');
      await element.waitFor({ timeout: 1000 });

      await page.setViewportSize({ height: 100, width: 200 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describe('datalist', () => {
    test('Should display datalist', async ({ page }) => {
      const props = { identifier: 'identifier', label: 'label', datalistoptions: ['batman', 'robin'] };
      await setPageContent(page, creatHtml(props));

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
