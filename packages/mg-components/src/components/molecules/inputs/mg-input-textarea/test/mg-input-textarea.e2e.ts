import { PageType, describe, describeEach, expect, setPageContent, testEach, test } from '../../../../../utils/playwright.e2e.test.utils';

const TIMEOUT = 1000;

describe('mg-input-textarea', () => {
  describeEach([
    `<mg-input-textarea identifier="identifier" label="label"></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" label-on-top></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" label-hide></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-textarea>`,
  ])('without tooltip', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-textarea.hydrated').waitFor({ timeout: TIMEOUT });
      const input = page.locator('textarea');

      // Hide caret for screenshots
      await page.$eval('mg-input-textarea', elm => {
        const input = elm.shadowRoot.querySelector('textarea');
        input.style.caretColor = 'transparent';
      });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await input.press('KeyB');
      await input.press('KeyL');
      await input.press('KeyU');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([true, false])('render with tooltip, case label-on-top %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(page, `<mg-input-textarea identifier="identifier" label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-textarea>`);

    await page.locator('mg-input-textarea.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) {
      await page.keyboard.down('Tab');
    }

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    `<mg-input-textarea identifier="identifier" label="label" readonly></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu"></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" readonly></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" readonly label-on-top></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" disabled></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" disabled></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="resizable" resizable="both"></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" help-text="HelpText Message" required></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" help-text="HelpText Message" required readonly></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" help-text="HelpText Message" required disabled></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" tooltip="blu" tooltip-position="label"></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" value="blu" tooltip="blu" tooltip-position="input" label-on-top></mg-input-textarea>`,
  ])('Should render with template', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-textarea.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-textarea identifier="identifier" label="label" required></mg-input-textarea>`,
    `<mg-input-textarea identifier="identifier" label="label" required lang="fr"></mg-input-textarea>`,
  ])('%s', (html: string) => {
    test('Should render error when leaving an empty required input', async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-textarea.hydrated').waitFor({ timeout: TIMEOUT });

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render error when leaving input with a non matching pattern value', async ({ page }) => {
    await setPageContent(
      page,
      `<mg-input-textarea identifier="identifier" label="label" pattern="[a-z]*" pattern-error-message="Vous ne pouvez saisir que des lettres minuscules."></mg-input-textarea>`,
    );

    await page.locator('mg-input-textarea.hydrated').waitFor({ timeout: TIMEOUT });
    const input = page.locator('textarea');

    await page.keyboard.down('Tab');

    await input.press('KeyB');
    await input.press('KeyL');
    await input.press('KeyU');
    await input.press('1');

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    '<mg-input-textarea identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-textarea>',
    '<mg-input-textarea identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-textarea>',
  ])('inside a div.mg-form-group', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, `<div class="mg-form-group">${html}</div>`);

      await page.locator('mg-input-textarea.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([16])('with custom width: %s', width => {
    testEach([false, true])('with label on top: %s', async (page: PageType, labelOnTop: boolean) => {
      await setPageContent(page, `<mg-input-textarea identifier="identifier" label="label" mg-width="${width}" label-on-top="${labelOnTop}"></mg-input-textarea>`);

      await page.locator('mg-input-textarea.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([false, true])('Ensure component fit in width 200px with label-on-top: %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(page, `<mg-input-textarea identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-textarea>`);

    await page.locator('mg-input-textarea.hydrated').waitFor({ timeout: TIMEOUT });

    await page.setViewportSize({ width: 200, height: 100 });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
