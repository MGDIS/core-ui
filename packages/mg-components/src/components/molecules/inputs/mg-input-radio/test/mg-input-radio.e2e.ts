import { PageType, describe, describeEach, expect, setPageContent, testEach, test } from '../../../../../utils/playwright.e2e.test.utils';

const TIMEOUT = 1000;

describe('mg-input-radio', () => {
  describeEach([`<mg-input-radio identifier="identifier" label="legend"></mg-input-radio>`])('without tooltip', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(
        page,
        `${html}
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
      </script>`,
      );

      await page.locator('mg-input-radio.hydrated').waitFor({ timeout: TIMEOUT });

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
      await setPageContent(
        page,
        `${html}
        <script>
        const mgInputRadio = document.querySelector('mg-input-radio');
        mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
        </script>`,
      );

      await page.locator('mg-input-radio.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([true, false])('render with tooltip, case label-on-top %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(
      page,
      `<mg-input-radio identifier="identifier" label="legend" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-radio>
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
      </script>`,
    );

    await page.locator('mg-input-radio.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('render longer intems list inline', async ({ page }) => {
    await setPageContent(
      page,
      `<mg-input-radio identifier="identifier" label="legend"></mg-input-radio>
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane', 'ironman', 'spiderman', 'captain america', 'thor', 'vision', 'antman', 'black widow', 'black panther'];
      </script>`,
    );

    await page.locator('mg-input-radio.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    `<mg-input-radio identifier="identifier" label="legend" readonly></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman"></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" readonly></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" readonly label-on-top></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" disabled></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" value="batman" disabled></mg-input-radio>`,
  ])('Should render with template', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(
        page,
        `${html}
        <script>
        const mgInputRadio = document.querySelector('mg-input-radio');
        mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
        </script>`,
      );

      await page.locator('mg-input-radio.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-radio identifier="identifier" label="legend" required></mg-input-radio>`,
    `<mg-input-radio identifier="identifier" label="legend" required lang="fr"></mg-input-radio>`,
  ])('%s', (html: string) => {
    test('Should render error when leaving an empty required input', async ({ page }) => {
      await setPageContent(
        page,
        `${html}
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
      </script>`,
      );

      await page.locator('mg-input-radio.hydrated').waitFor({ timeout: TIMEOUT });

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    '<mg-input-radio identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-radio>',
    '<mg-input-radio identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-radio>',
  ])('inside a div.mg-form-group', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(
        page,
        `<div class="mg-form-group">${html}</div>
      <script>
      const mgInputRadio = document.querySelector('mg-input-radio');
      mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
      </script>`,
      );

      await page.locator('mg-input-radio.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([false, true])('Ensure component fit in width 200px with label-on-top: %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(
      page,
      `<mg-input-radio identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-radio>
        <script>
        const mgInputRadio = document.querySelector('mg-input-radio');
        mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
        </script>
      `,
      { width: 200, height: 100 },
    );

    await page.locator('mg-input-radio.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('Responsive', () => {
    [undefined, 'Tooltip message'].forEach((tooltip: string) => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${tooltip}`, async ({ page }) => {
        await setPageContent(
          page,
          `<mg-input-radio identifier="identifier" label="label" ${tooltip ? `tooltip=${tooltip}` : ''}></mg-input-radio>
        <script>
        const mgInputRadio = document.querySelector('mg-input-radio');
        mgInputRadio.items = ['batman', 'robin', 'joker', 'bane'];
        </script>`,
        );

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
