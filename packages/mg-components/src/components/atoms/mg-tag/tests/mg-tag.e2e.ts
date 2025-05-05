import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/playwright';
import { test } from '../../../../utils/playwright.fixture';
import { variants } from '../mg-tag.conf';

test.describe('mg-tag', () => {
  variants.forEach(variant => {
    test.describe(variant, () => {
      [
        // { icon: true, outline: true, soft: true },
        { icon: true, outline: true, soft: false },
        { icon: true, outline: false, soft: true },
        { icon: true, outline: false, soft: false },
        // { icon: false, outline: true, soft: true },
        { icon: false, outline: true, soft: false },
        { icon: false, outline: false, soft: true },
        { icon: false, outline: false, soft: false },
      ].forEach(args => {
        test(`Should render with icon ${args.icon.toString()}, outline ${args.outline.toString()}, soft ${args.soft.toString()}`, async ({ page }) => {
          const html = `<mg-tag ${renderAttributes({ ...args, variant })}>${
            args.icon ? `<mg-icon ${renderAttributes({ icon: 'user', size: 'small' })}></mg-icon>` : ''
          }${variant}</mg-tag>`;

          await page.setContent(html);
          page.addStyleTag({ content: '.e2e-screenshot{padding:.1rem}' });

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });
    });
  });

  test('Should render a 2 lines tag', async ({ page }) => {
    await page.setContent(`<mg-tag>Tag with a<br> two lines text</mg-tag>`);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render a tag in a paragraph', async ({ page }) => {
    await page.setContent(`<p>This is a <mg-tag>tag</mg-tag> in a paragraph.</p>`);

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
