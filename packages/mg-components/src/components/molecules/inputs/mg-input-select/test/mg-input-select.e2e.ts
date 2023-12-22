import { renderAttributes } from '@mgdis/stencil-helpers';
import { PageType, describe, describeEach, expect, setPageContent, testEach, test } from '../../../../../utils/playwright.e2e.test.utils';

const TIMEOUT = 1000;
import { widths } from '../../MgInput.conf';

describe('mg-input-select', () => {
  describeEach([true, false])('without tooltip, case label on top %s', labelOnTop => {
    test('render', async ({ page }) => {
      await setPageContent(
        page,
        `
      <mg-input-select ${renderAttributes({ identifier: 'identifier', label: 'label', labelOnTop })}></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`,
      );

      await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Space');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Enter');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([undefined, ...widths])('render with width %s', async (page: PageType, mgWidth) => {
      await setPageContent(
        page,
        `
      <mg-input-select ${renderAttributes({ identifier: 'identifier', label: 'label', mgWidth, labelOnTop })}></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`,
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-select identifier="identifier" label="label" label-on-top></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" label-hide></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-select>`,
  ])('without tooltip', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(
        page,
        `${html}
        <script>
        const mgInputSelect = document.querySelector('mg-input-select');
        mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
        </script>`,
      );

      await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([true, false])('render with tooltip, case label-on-top %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(
      page,
      `<mg-input-select identifier="identifier" label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`,
    );

    await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) {
      // Ensure to display tooltip
      await page.setViewportSize({ width: 600, height: 65 });
      // when label on top tooltip is on fist tab (next to label)
      await page.keyboard.down('Tab');
    }

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    `<mg-input-select identifier="identifier" label="label" readonly></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu"></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" readonly></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" readonly label-on-top></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" disabled></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" disabled></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" required help-text="HelpText Message"></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" required readonly help-text="HelpText Message"></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" value="blu" required disabled help-text="HelpText Message"></mg-input-select>`,
  ])('Should render with template', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(
        page,
        `${html}
        <script>
        const mgInputSelect = document.querySelector('mg-input-select');
        mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
        </script>`,
      );

      await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-select identifier="identifier" label="label" required></mg-input-select>`,
    `<mg-input-select identifier="identifier" label="label" required lang="fr"></mg-input-select>`,
  ])('%s', (html: string) => {
    test('Should render error when leaving an empty required input', async ({ page }) => {
      await setPageContent(
        page,
        `${html}
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`,
      );

      await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render a grouped list', async ({ page }) => {
    await setPageContent(
      page,
      `<mg-input-select identifier="identifier" label="label"></mg-input-select>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = [
        { title: 'blu', value: 'blu', group: 'Le groupe A' },
        { title: 'blu', value: 'blublu', group: 'Le groupe B' },
        { title: 'bli', value: 'bli', group: 'Le groupe A' },
        { title: 'bli', value: 'blibli', group: 'Le groupe B' },
        { title: 'bla', value: 'blabla' },
        { title: 'blo', value: 'bloblo' },
      ];
      </script>`,
    );

    await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

    await page.keyboard.down('Tab');
    await page.keyboard.down('Space');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    '<mg-input-select identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-select>',
    '<mg-input-select identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-select>',
  ])('inside a div.mg-form-group', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(
        page,
        `<div class="mg-form-group">${html}</div>
      <script>
      const mgInputSelect = document.querySelector('mg-input-select');
      mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
      </script>`,
      );

      await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach(['full', 16])('with custom width: %s', width => {
    testEach([false, true])('with label on top: %s', async (page: PageType, labelOnTop: boolean) => {
      await setPageContent(
        page,
        `
        <mg-input-select identifier="identifier" label="label" mg-width="${width}" label-on-top="${labelOnTop}"></mg-input-select>
        <script>
          const mgInputSelect = document.querySelector('mg-input-select');
          mgInputSelect.items = ['blu', 'bli', 'bla', 'blo'];
        </script>
      `,
      );

      await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([false, true])('Ensure component fit in width 300px with label-on-top: %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(
      page,
      `
      <mg-input-select identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-select>
      <script>
        const mgInputSelect = document.querySelector('mg-input-select');
        mgInputSelect.items = ['blu', 'bli', 'bla', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'];
      </script>
    `,
    );

    await page.locator('mg-input-select.hydrated').waitFor({ timeout: TIMEOUT });

    await page.setViewportSize({ width: 300, height: 100 });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
