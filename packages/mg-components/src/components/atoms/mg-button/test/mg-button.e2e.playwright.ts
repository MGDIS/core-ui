import { PageType, describe, describeEach, expect, setPageContent, testEach, test } from '../../../../utils/playwright.e2e.test.utils';
import { variants } from '../mg-button.conf';

const TIMEOUT = 1000;
const buttonHeight = 35;

describe('mg-button', () => {
  testEach(variants)('Should render with varint %s', async (page: PageType, variant: string) => {
    await setPageContent(
      page,
      `<div>
    <mg-button variant="${variant}">${variant}</mg-button>
    <mg-button variant="${variant}" is-icon><mg-icon icon="check-circle"></mg-icon></mg-button>
    <mg-button variant="${variant}" disabled>disabled</mg-button>
    <mg-button variant="${variant}" is-icon disabled label="disabled"><mg-icon icon="check-circle"></mg-icon></mg-button>
  </div>`,
      { width: 250, height: variants.length * buttonHeight },
    );

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render with icon slot', async ({ page }) => {
    const slots = ['<mg-icon icon="trash"></mg-icon>Text button', '<mg-icon icon="trash"></mg-icon>Text button<mg-badge value="1" label="label"></mg-badge>'];
    const html = slots.map(slot => `<div><mg-button>${slot}</mg-button></div>`).join('');
    await setPageContent(page, html, { width: 150, height: slots.length * buttonHeight });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render a 2 lines button', async ({ page }) => {
    await setPageContent(page, `<mg-button>Button with a<br> two lines text</mg-button>`);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render a button in a paragraph', async ({ page }) => {
    const paragraphs = [`<p>This is a <mg-button>button</mg-button> in a paragraph.</p>`, `<p>This is a <mg-button variant="link">button</mg-button> in a paragraph.</p>`];
    const html = paragraphs.join('');
    await setPageContent(page, html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  testEach(variants)('Should render focused and hover %s button', async (page: PageType, variant: string) => {
    await setPageContent(
      page,
      `<mg-button variant="${variant}">${variant}:focus</mg-button>
      <mg-button variant="${variant}" class="hover">${variant}:hover</mg-button>`,
    );

    await page.keyboard.down('Tab');

    const button = page.locator('mg-button.hover');
    button.hover();

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render a full-width button', async ({ page }) => {
    const slots = ['batman', '<mg-icon icon="check-circle"></mg-icon>batman'];
    const html = slots.map(slot => `<mg-button full-width>${slot}</mg-button>`).join('');

    await setPageContent(page, html);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  describeEach([
    '<mg-button disable-on-click>Message action</mg-button>',
    '<mg-button disable-on-click label="test" is-icon><mg-icon icon="info-circle"></mg-icon></mg-button>',
    '<mg-button disable-on-click><mg-icon icon="info-circle"></mg-icon> Message action</mg-button>',
  ])('template %s', (template: string) => {
    test('should disable button after keyUp "Space"', async ({ page }) => {
      await setPageContent(page, template);

      const button = page.locator('mg-button.hydrated');
      await button.waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await button.press('Space');

      // Remove spinner annimation for screenshot
      const svg = page.locator('svg').first();
      await svg.evaluate(element => {
        element.classList.remove('mg-c-icon--spin');
      });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('should render a link like a button', async ({ page }) => {
    const links = [
      '<a href="#" class="mg-c-button mg-c-button--primary">a.mg-button</a>',
      '<a href="#" class="mg-c-button mg-c-button--primary"><mg-icon icon="check-circle"></mg-icon>a.mg-button w/ icon</a>',
      '<a href="#" class="mg-c-button mg-c-button--primary mg-c-button--icon"><mg-icon icon="check-circle"></mg-icon></a>',
    ];
    const html = links.map(link => `<div>${link}</div>`).join('');
    await setPageContent(page, `<link rel="stylesheet" href="http://localhost:3333/build/mg-components.css" />${html}`, { width: 200, height: links.length * buttonHeight });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
