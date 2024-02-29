import { PageType, describe, describeEach, expect, testEach, test } from '../../../../../utils/playwright.e2e.test.utils';
import { renderAttributes } from '@mgdis/playwright-helpers';

describe('mg-input-radio', () => {
  describeEach([`<mg-input-radio identifier="identifier" label="legend"></mg-input-radio>`])('without tooltip', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await page.setContent(html);

      await page.addScriptTag({ content: "document.querySelector('mg-input-radio').items = ['batman', 'robin', 'joker', 'bane']" });

      page.locator('mg-input-radio.hydrated');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      const radio = page.locator('.mg-c-input__input-group input').first();

      await radio.press('Space');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-radio identifier="identifier" label="legend" label-on-top help-text="HelpText Message"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" input-vertical-list help-text="HelpText Message"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" label-on-top input-vertical-list help-text="HelpText Message"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" label-hide></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" placeholder="placeholder" help-text="HelpText Message"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" placeholder="placeholder" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" placeholder="placeholder" required help-text="HelpText Message" value="batman"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" placeholder="placeholder" required readonly help-text="HelpText Message" value="batman"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" placeholder="placeholder" required disabled help-text="HelpText Message" value="batman"></mg-input-radio>`,
  ])('without tooltip', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await page.setContent(html);
      await page.addScriptTag({ content: "document.querySelector('mg-input-radio').items = ['batman', 'robin', 'joker', 'bane']" });

      page.locator('mg-input-radio.hydrated');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([true, false])('render with tooltip, case label-on-top %s', async (page: PageType, labelOnTop: boolean) => {
    await page.setContent(`<mg-input-radio identifier="identifier" label="legend" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-radio>`);

    await page.addScriptTag({ content: "document.querySelector('mg-input-radio').items = ['batman', 'robin', 'joker', 'bane']" });

    page.locator('mg-input-radio.hydrated');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) {
      await page.keyboard.down('Tab');
    }

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('render longer intems list inline', async ({ page }) => {
    await page.setContent(`<mg-input-radio identifier="identifier" label="legend"></mg-input-radio>`);

    await page.addScriptTag({
      content:
        "document.querySelector('mg-input-radio').items = ['batman', 'robin', 'joker', 'bane', 'ironman', 'spiderman', 'captain america', 'thor', 'vision', 'antman', 'black widow', 'black panther']",
    });

    page.locator('mg-input-radio.hydrated');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    `<mg-input-radio identifier="identifier" label="legend" readonly></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" readonly></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" readonly label-on-top></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" disabled></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" disabled></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" tooltip="blu" tooltip-position="label"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" tooltip="blu" tooltip-position="input" label-on-top></mg-input-radio>`,
  ])('Should render with template', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await page.setContent(html);

      await page.addScriptTag({
        content: "document.querySelector('mg-input-radio').items = ['batman', 'robin', 'joker', 'bane']",
      });

      page.locator('mg-input-radio.hydrated');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-radio identifier="identifier" label="legend" required></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" required lang="fr"></mg-input-radio>`,
  ])('%s', (html: string) => {
    test('Should render error when leaving an empty required input', async ({ page }) => {
      await page.setContent(html);

      await page.addScriptTag({
        content: "document.querySelector('mg-input-radio').items = ['batman', 'robin', 'joker', 'bane']",
      });

      page.locator('mg-input-radio.hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([false, true])('Ensure component fit in width 200px with label-on-top: %s', async (page: PageType, labelOnTop: boolean) => {
    await page.setContent(`<mg-input-radio identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-radio>`);

    await page.addScriptTag({
      content: "document.querySelector('mg-input-radio').items = ['batman', 'robin', 'joker', 'bane']",
    });

    await page.setViewportSize({ width: 200, height: 100 });

    page.locator('mg-input-radio.hydrated');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        await page.setContent(`<mg-input-radio identifier="identifier" label="label" ${renderAttributes(args)}></mg-input-radio>`);

        await page.addScriptTag({
          content: "document.querySelector('mg-input-radio').items = ['batman', 'robin', 'joker', 'bane']",
        });

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
