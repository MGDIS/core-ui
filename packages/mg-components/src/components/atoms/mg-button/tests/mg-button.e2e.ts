import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { sizes, variants } from '../mg-button.conf';

test.describe('mg-button', () => {
  variants.forEach(variant => {
    test.describe(variant, () => {
      test(`Should render`, async ({ page }) => {
        await page.setContent(`<div>
  <mg-button variant="${variant}">${variant}</mg-button>
  <mg-button variant="${variant}" is-icon><mg-icon icon="check-circle"></mg-icon></mg-button>
  <mg-button variant="${variant}" disabled>disabled</mg-button>
  <mg-button variant="${variant}" is-icon disabled label="disabled"><mg-icon icon="check-circle"></mg-icon></mg-button>
</div>`);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test(`Should render focused and hover button`, async ({ page }) => {
        const html = [`<mg-button variant="${variant}">${variant}:focus</mg-button>`, `<mg-button variant="${variant}" class="hover">${variant}:hover</mg-button>`].join('');
        await page.setContent(html);

        await page.keyboard.down('Tab');

        await page.locator('mg-button.hover').hover();

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  [
    '<mg-button disable-on-click>Message action</mg-button>',
    '<mg-button disable-on-click label="test" is-icon><mg-icon icon="info-circle"></mg-icon></mg-button>',
    '<mg-button disable-on-click><mg-icon icon="info-circle"></mg-icon> Message action</mg-button>',
  ].forEach(template => {
    test(`Should disable button after keyUp "Space" with template ${template}`, async ({ page }) => {
      await page.setContent(template);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.locator('mg-button.hydrated').press('Space');

      // Remove spinner annimation for screenshot
      const svg = page.locator('svg').first();
      await svg.evaluate(elm => {
        elm.classList.remove('mg-c-icon--spin');
      });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  sizes.forEach(size => {
    test.describe(`size="${size}"`, () => {
      test('Should render', async ({ page }) => {
        await page.setContent(`<div>
  <mg-button size="${size}">${size}</mg-button>
  <mg-button size="${size}" is-icon><mg-icon icon="check-circle"></mg-icon></mg-button>
  <mg-button size="${size}" disabled>disabled</mg-button>
  <mg-button size="${size}" is-icon disabled label="disabled"><mg-icon icon="check-circle"></mg-icon></mg-button>
  </div>`);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test('Should render a full-width button', async ({ page }) => {
        await page.addStyleTag({ content: '.e2e-screenshot{display:block}' });

        const html = ['batman', '<mg-icon icon="check-circle"></mg-icon>batman'].map(slot => `<mg-button size="${size}" full-width>${slot}</mg-button>`).join('');

        await page.setViewportSize({ width: 600, height: 100 });
        await page.setContent(html);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test('Should render with icon slot', async ({ page }) => {
        const html = ['<mg-icon icon="trash"></mg-icon>Text button', '<mg-icon icon="trash"></mg-icon>Text button<mg-badge value="1" label="label"></mg-badge>']
          .map(slot => `<div><mg-button size="${size}">${slot}</mg-button></div>`)
          .join('');

        await page.setContent(html);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });

      test('Should render a 2 lines button', async ({ page }) => {
        await page.setContent(`<mg-button size="${size}">Button with a<br> two lines text</mg-button>`);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test('Should render a button in a paragraph', async ({ page }) => {
    const html = [`<p>This is a <mg-button>button</mg-button> in a paragraph.</p>`, `<p>This is a <mg-button variant="link">button</mg-button> in a paragraph.</p>`].join('');

    await page.setContent(html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
