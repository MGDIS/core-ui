import { PageType, describe, describeEach, expect, setPageContent, testEach, test } from '../../../../../utils/playwright.e2e.test.utils';

const TIMEOUT = 1000;

describe.only('mg-input-date', () => {
  describeEach([
    `<mg-input-date identifier="identifier" label="label"></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" label-on-top></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" label-hide></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-date>`,
  ])('without tooltip', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-date.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('0');
      await page.keyboard.down('2');
      await page.keyboard.down('0');
      await page.keyboard.down('6');
      await page.keyboard.down('1');
      await page.keyboard.down('9');
      await page.keyboard.down('8');
      await page.keyboard.down('2');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([true, false])('render with tooltip, case label-on-top %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(page, `<mg-input-date identifier="identifier" label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-date>`);

    await page.locator('mg-input-date.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');

    if (!labelOnTop) {
      // Ensure to display tooltip
      await page.setViewportSize({ width: 600, height: 65 });
      // when label on top tooltip is on fist tab (next to label)
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
    }

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    `<mg-input-date identifier="identifier" label="label" readonly></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" value="1982-06-02"></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" value="1982-06-02" readonly></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" disabled></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" value="1982-06-02" disabled></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" value="1982-06-02" readonly lang="fr"></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" value="1982-06-02" help-text='My help text' required></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" value="1982-06-02" help-text='My help text' required readonly></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" value="1982-06-02" help-text='My help text' required disabled></mg-input-date>`,
  ])('Should render with template', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-date.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-date identifier="identifier" label="label" required></mg-input-date>`,
    `<mg-input-date identifier="identifier" label="label" lang="fr" required></mg-input-date>`,
  ])('%s', (html: string) => {
    test('Should render error when leaving an empty required input', async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-date.hydrated').waitFor({ timeout: TIMEOUT });

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render error when leaving input with a wrong date', async ({ page }) => {
    await setPageContent(page, `<mg-input-date identifier="identifier" label="label"></mg-input-date>`);

    await page.locator('mg-input-date.hydrated').waitFor({ timeout: TIMEOUT });

    await page.keyboard.down('Tab');

    await page.keyboard.down('0');
    await page.keyboard.down('2');
    await page.keyboard.down('0');
    await page.keyboard.down('6');

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    '<mg-input-date identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-date>',
    '<mg-input-date identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-date>',
  ])('inside a div.mg-form-group', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, `<div class="mg-form-group">${html}</div>`);

      await page.locator('mg-input-date.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([false, true])('Ensure component fit in width 200px with label-on-top: %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(page, `<mg-input-date identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-date>`, { width: 200, height: 100 });

    await page.locator('mg-input-date.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
