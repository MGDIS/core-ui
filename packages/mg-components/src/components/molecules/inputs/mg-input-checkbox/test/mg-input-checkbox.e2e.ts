import { createID } from '../../../../../utils/components.utils';
import { renderAttributes, renderProperties } from '../../../../../utils/e2e.test.utils';
import { createPage } from '../../../../../utils/stencil.e2e.test.utils';
import { checkboxTypes } from '../mg-input-checkbox.conf';

const baseArgs = {
  label: 'legend',
  value: [
    { title: 'Batman', value: false },
    { title: 'Robin', value: false },
    { title: 'Joker', value: false },
    { title: 'Bane', value: false },
  ],
};

const createHTML = (args, identifier = createID()) =>
  `<mg-input-checkbox ${renderAttributes({ ...args, identifier })}></mg-input-checkbox><script>${renderProperties(args, `[identifier="${identifier}"]`)} </script>`;

describe('mg-input-checkbox', () => {
  test('Should render with template', async () => {
    const html = [
      { ...baseArgs, readonly: true },
      { ...baseArgs, readonly: true, labelOnTop: true },
      { ...baseArgs, disabled: true },
      { ...baseArgs, inputVerticalList: true, helpText: 'HelpText Message' },
      { ...baseArgs, inputVerticalList: true, helpText: 'HelpText Message', labelOnTop: true },
      { ...baseArgs, helpText: `<mg-icon icon='user' size='small'></mg-icon> Welcome batman` },
      { ...baseArgs, helpText: 'HelpText Message', required: true },
      { ...baseArgs, helpText: 'HelpText Message', required: true, readonly: true },
      { ...baseArgs, helpText: 'HelpText Message', required: true, disabled: true },
    ]
      .map(
        args =>
          `<div class="mg-grid">${checkboxTypes
            .map(
              type =>
                `<div class="mg-grid__col mg-grid__col-6">${createHTML({
                  ...args,
                  type,
                  value: [
                    { title: 'Batman', value: true },
                    { title: 'Robin', value: false },
                    { title: 'Joker', value: null },
                    { title: 'Bane', value: true, disabled: true },
                  ],
                })}</div>`,
            )
            .join('')}</div>`,
      )
      .join('');

    const header = `<header class="mg-grid">${checkboxTypes.map(type => `<h2 class="mg-grid__col mg-grid__col-6">${type}</h2>`).join('')}</header>`;

    const page = await createPage(header + html);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  describe.each(checkboxTypes)('type %s', type => {
    test.each([true, false])('render with tooltip, case label-on-top %s', async labelOnTop => {
      const page = await createPage(
        createHTML({
          ...baseArgs,
          tooltip: 'Tooltip message',
          labelOnTop,
          type,
        }),
      );

      const element = await page.find('mg-input-checkbox');
      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      await page.keyboard.down('Tab');

      // when label on top tooltip is on first tab (next to label)
      if (!labelOnTop) {
        // Ensure to display tooltip
        await page.setViewport({ width: 600, height: 65 });

        // when type is 'multi' the tooltip is on second tab
        await page.keyboard.down('Tab');

        if (type !== 'multi') {
          await page.keyboard.down('Tab');
          await page.keyboard.down('Tab');
          await page.keyboard.down('Tab');
        }
      }

      await page.waitForChanges();

      const screenshotTooltip = await page.screenshot();
      expect(screenshotTooltip).toMatchImageSnapshot();
    });
    test.each([
      { ...baseArgs, type },
      { ...baseArgs, type, labelOnTop: true },
      { ...baseArgs, type, labelHide: true },
      { ...baseArgs, type, helpText: 'HelpText Message' },
    ])('Should render without tooltip', async args => {
      const page = await createPage(createHTML(args));

      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();

      // when multi open checkbox in popover
      if (type === 'multi') {
        await page.setViewport({ width: 300, height: 200 });
        await page.keyboard.down('Tab');
        await page.keyboard.down('Enter');
      }

      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshotFocus = await page.screenshot();
      expect(screenshotFocus).toMatchImageSnapshot();

      let checkbox = await page.find('mg-input-checkbox >>> .mg-input__input-group input');
      await checkbox.press('Space');

      await page.keyboard.down('Tab');
      checkbox = await page.find('mg-input-checkbox >>> .mg-input__input-group:nth-of-type(2) input');
      await checkbox.press('Space');

      await page.keyboard.down('Tab');
      checkbox = await page.find('mg-input-checkbox >>> .mg-input__input-group:nth-of-type(3) input');
      await checkbox.press('Space');

      await page.keyboard.down('Tab');
      checkbox = await page.find('mg-input-checkbox >>> .mg-input__input-group:nth-of-type(4) input');
      await checkbox.press('Space');

      await page.waitForChanges();

      const screenshotChecked = await page.screenshot();
      expect(screenshotChecked).toMatchImageSnapshot();
    });

    test.each([
      { ...baseArgs, helpText: 'HelpText Message', required: true, type },
      { ...baseArgs, helpText: "Message d'aide", lang: 'fr', required: true, type },
    ])('Should render error when leaving an empty required input', async args => {
      const page = await createPage(createHTML(args));
      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      // when multi open checkbox in popover
      if (type === 'multi') {
        await page.setViewport({ width: 300, height: 200 });
        await page.keyboard.down('Tab');
        await page.keyboard.down('Enter');
      }

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await page.waitForChanges();

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([
      { label: 'long label long label long label long label long label long label long label long label long label long label long label', type, tooltip: 'tooltip message' },
      {
        label: 'long label long label long label long label long label long label long label long label long label long label long label',
        type,
        tooltip: 'tooltip message',
        labelOnTop: true,
      },
    ])('render long label in .mg-form-group', async args => {
      const page = await createPage(
        `<div class="mg-form-group">${createHTML({
          ...baseArgs,
          ...args,
          value: [
            { title: 'Batman', value: true },
            { title: 'Robin', value: false },
            { title: 'Joker', value: null },
            { title: 'Bane', value: true, disabled: true },
          ],
        })}</div>`,
      );
      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });

    test.each([false, true])('Ensure component fit in width 200px with label-on-top: %s', async labelOnTop => {
      const page = await createPage(createHTML({ ...baseArgs, labelOnTop, type }));
      const element = await page.find('mg-input-checkbox');

      expect(element).toHaveClass('hydrated');

      await page.setViewport({ width: 200, height: 100 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
