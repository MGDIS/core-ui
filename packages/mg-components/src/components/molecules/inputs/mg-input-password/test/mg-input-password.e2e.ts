import { PageType, describe, describeEach, expect, testEach, test } from '../../../../../utils/playwright.e2e.test.utils';
import { renderAttributes } from '@mgdis/playwright-helpers';

describe('mg-input-password', () => {
  describeEach([
    `<mg-input-password identifier="identifier" label="label"></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" label-on-top></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" label-hide></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" placeholder="placeholder" help-text="HelpText Message"></mg-input-password>`,
  ])('without tooltip', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await page.setContent(html);

      page.locator('mg-input-password.hydrated');
      const input = page.locator('input');

      // Hide caret for screenshots
      await page.$eval('mg-input-password', elm => {
        const input = elm.shadowRoot.querySelector('input');
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
    await page.setContent(`<mg-input-password identifier="identifier" label="label" tooltip="Tooltip message" label-on-top="${labelOnTop}"></mg-input-password>`);

    page.locator('mg-input-password.hydrated');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.keyboard.down('Tab');
    if (!labelOnTop) {
      await page.keyboard.down('Tab');
    }

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    `<mg-input-password identifier="identifier" label="label" readonly></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu"></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" readonly></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" readonly label-on-top></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" disabled></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" disabled></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="batman" help-text='<mg-icon icon="user" size="small"></mg-icon> Welcome batman'></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" help-text="HelpText Message" required></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" help-text="HelpText Message" required readonly></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" help-text="HelpText Message" required disabled></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" tooltip="blu" tooltip-position="label"></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" value="blu" tooltip="blu" tooltip-position="input" label-on-top></mg-input-password>`,
  ])('Should render with template', (html: string) => {
    test(`render ${html}`, async ({ page }) => {
      await page.setContent(html);

      page.locator('mg-input-password.hydrated');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([
    `<mg-input-password identifier="identifier" label="label" required></mg-input-password>`,
    `<mg-input-password identifier="identifier" label="label" required lang="fr"></mg-input-password>`,
  ])('%s', (html: string) => {
    test('Should render error when leaving an empty required input', async ({ page }) => {
      await page.setContent(html);

      page.locator('mg-input-password.hydrated');

      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describeEach([16])('with custom width: %s', width => {
    testEach([false, true])('with label on top: %s', async (page: PageType, labelOnTop: boolean) => {
      await page.setContent(`<mg-input-password identifier="identifier" label="label" mg-width="${width}" label-on-top="${labelOnTop}"></mg-input-password>`);

      page.locator('mg-input-password.hydrated');

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  testEach([false, true])('Ensure component fit in width 200px with label-on-top: %s', async (page: PageType, labelOnTop: boolean) => {
    await page.setContent(`<mg-input-password identifier="identifier" label="label" label-on-top="${labelOnTop}"></mg-input-password>`);
    await page.setViewportSize({ width: 200, height: 100 });

    await page.locator('mg-input-password.hydrated');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test.describe('Responsive', () => {
    [{}, { tooltip: 'blu' }, { tooltip: 'blu', tooltipPosition: 'label' }].forEach(args => {
      test(`Should display label on top on responsive breakpoint with tooltip message: ${renderAttributes(args)}`, async ({ page }) => {
        await page.setContent(`<mg-input-password identifier="identifier" label="label" ${renderAttributes(args)}></mg-input-password>`);

        // Initial state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.setViewportSize({ width: 767, height: 800 });

        // Responsive state
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
