import { PageType, describe, describeEach, expect, setPageContent, testEach, test } from '../../../../../utils/playwright.e2e.test.utils';
import { renderAttributes } from '@mgdis/playwright-helpers';

const TIMEOUT = 1000;

describe('mg-input-numeric', () => {
  describeEach([
    `<mg-input-numeric identifier="identifier" label="label"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" label-on-top></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" label-hide></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" type="integer"></mg-input-numeric>`,
  ])('without tooltip', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });
      const input = page.locator('input');

      // Hide caret for screenshots
      await page.$eval('mg-input-numeric', elm => {
        const input = elm.shadowRoot.querySelector('input');
        input.style.caretColor = 'transparent';
      });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await input.press('1');
      await input.press('2');
      await input.press('3');
      await input.press('4');
      await input.press('5');
      await input.press(',');
      await input.press('6');
      await input.press('7');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([true, false])('render with tooltip, case label-on-top %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(page, `<mg-input-numeric identifier="identifier" label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-numeric>`);

    await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) {
      await page.keyboard.down('Tab');
    }

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    `<mg-input-numeric identifier="identifier" label="label" readonly></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" readonly></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" disabled></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" disabled></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" lang="fr"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" lang="fr" type="currency"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" lang="fr" type="currency" currency="EUR"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" readonly lang="fr"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" readonly lang="fr" type="currency"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" readonly lang="fr" type="currency" currency="EUR"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" help-text="HelpText Message" required></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" help-text="HelpText Message" required readonly></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" help-text="HelpText Message" required disabled></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" tooltip="blu" tooltip-position="label"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" value="123,45" tooltip="blu" tooltip-position="input" label-on-top></mg-input-numeric>`,
  ])('Should render with template', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render currency symbol', async ({ page }) => {
    await setPageContent(page, `<mg-input-numeric identifier="identifier" label="label" type="currency"></mg-input-numeric>`);

    await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });
    const input = page.locator('input');

    await page.keyboard.down('Tab');

    await input.press('1');
    await input.press('2');
    await input.press('3');
    await input.press('4');
    await input.press('5');
    await input.press(',');
    await input.press('6');
    await input.press('7');

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    `<mg-input-numeric identifier="identifier" label="label" required></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" required lang="fr"></mg-input-numeric>`,
  ])('%s', (html: string) => {
    test('Should render error when leaving an empty required input', async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-numeric identifier="identifier" label="label" min="120"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" max="100"></mg-input-numeric>`,
    `<mg-input-numeric identifier="identifier" label="label" min="10" max="100"></mg-input-numeric>`,
  ])('Should render error when value does not respect min max attributes', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, html);

      await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });
      const input = page.locator('input');

      await page.keyboard.down('Tab');

      await input.press('1');
      await input.press('1');
      await input.press('0');

      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should not allow invalid characters', async ({ page }) => {
    await setPageContent(page, `<mg-input-numeric identifier="identifier" label="label"></mg-input-numeric>`);

    await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });
    const input = page.locator('input');

    await page.keyboard.down('Tab');

    await input.press('1');
    await input.press('KeyB'); // Should not be included
    await input.press('2');
    await input.press('KeyL'); // Should not be included
    await input.press('3');
    await input.press('KeyU'); // Should not be included
    await input.press('4');
    await input.press('5');
    await input.press('6');
    await input.press('7');
    await input.press('8');
    await input.press('9');
    await input.press('0');
    await input.press('1');
    await input.press('2');
    await input.press('3');
    await input.press('4'); // Should not be included
    await input.press(',');
    await input.press('.'); // Should not be included
    await input.press('4');
    await input.press('5');
    await input.press('6'); // Should not be included

    const value = await input.inputValue();
    expect(value).toEqual('1234567890123,45');
  });

  describeEach([
    '<mg-input-numeric identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message"></mg-input-numeric>',
    '<mg-input-numeric identifier="identifier" label="long label long label long label long label long label long label long label long label long label long label long label" tooltip="tooltip message" label-on-top></mg-input-numeric>',
  ])('inside a div.mg-form-group', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await setPageContent(page, `<div class="mg-form-group">${html}</div>`);

      await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([true, false])('using append-input slot, case readonly %s', readonly => {
    testEach([
      `<mg-button slot="append-input" label="search">
        <mg-icon icon="calculator"></mg-icon> Calculate
      </mg-button>`,
      '<span slot="append-input">km</span>',
    ])('render %s', async (page: PageType, slot: string) => {
      await setPageContent(
        page,
        `
        <mg-input-numeric identifier="identifier" label="label" readonly="${readonly}" value="1">
          ${slot}
        </mg-input-numeric>
      `,
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach(['full', 16, 4, 2])('with custom width: %s', width => {
    testEach([false, true])('with label on top: %s', async (page: PageType, labelOnTop: boolean) => {
      await setPageContent(page, `<mg-input-numeric identifier="identifier" label="label" mg-width="${width}" label-on-top="${labelOnTop}"></mg-input-numeric>`);

      await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([false, true])('Ensure component fit in width 150px with label-on-top: %s', async (page: PageType, labelOnTop: boolean) => {
    await setPageContent(page, `<mg-input-numeric identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-numeric>`, { width: 150, height: 100 });

    await page.locator('mg-input-numeric.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        await setPageContent(page, `<mg-input-numeric identifier="identifier" label="label" ${renderAttributes(args)}></mg-input-numeric>`);

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
