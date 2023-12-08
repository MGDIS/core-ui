import { darkBackground, renderAttributes } from '../../../../utils/e2e.test.utils';
import { PageType, describe, expect, setPageContent, test, testEach } from '../../../../utils/playwright.e2e.test.utils';
import { variants } from '../mg-tag.conf';

describe('mg-tag', () => {
  testEach(
    variants.flatMap(variant =>
      [true, false].flatMap(icon =>
        [
          { outline: false, soft: false },
          { outline: true, soft: false },
          { outline: false, soft: true },
        ].map(({ outline, soft }) =>
          darkBackground(
            variant === 'secondary',
            `<mg-tag style="margin: 0.2rem;" ${renderAttributes({ variant, outline, soft })}>${
              icon ? `<mg-icon ${renderAttributes({ icon: 'user', size: 'small' })}></mg-icon>` : ''
            }${variant}</mg-tag>`,
          ),
        ),
      ),
    ),
  )('Should render %s', async (page: PageType, html: string) => {
    await setPageContent(page, html);

    await page.locator('mg-tag.hydrated').waitFor({ timeout: 1000 });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render a 2 lines tag', async ({ page }) => {
    await setPageContent(page, `<mg-tag>Tag with a<br> two lines text</mg-tag>`);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render a tag in a paragraph', async ({ page }) => {
    await setPageContent(page, `<p>This is a <mg-tag>tag</mg-tag> in a paragraph.</p>`);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
