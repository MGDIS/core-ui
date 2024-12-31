import { expect } from '@playwright/test';
import { test } from '../../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { Direction, sizes } from '../../mg-menu/mg-menu.conf';
import { Status, targets } from '../mg-menu-item.conf';

const slotContent = '<div><h3>Demo title</h3><p>some content</p></div>';
const slotMenuItem = '<mg-menu label="submenu"><mg-menu-item><span slot="label">Batman begins</span></mg-menu-item></mg-menu>';
const slotImage = '<mg-icon icon="user" slot="image"></mg-icon>';
const slotInformation = '<mg-badge value="2" label="hello" slot="information"></mg-badge>';
const slotMetadata = '<span slot="metadata">is a hero</span>';
const defaultViewPortSize = { width: 130, height: 200 };
const createHTML = (args, slot = '', direction = Direction.HORIZONTAL) => `
<mg-menu ${renderAttributes({ label: 'batmenu', direction, ...args })}">
  <mg-menu-item ${renderAttributes(args)}>
    <span slot="label">${args.label ? args.label : 'batman'} ${args.href ? 'link' : ''}</span>
    ${slot}
  </mg-menu-item>
</mg-menu>
`;

test.describe('mg-menu-item', () => {
  [Direction.HORIZONTAL, Direction.VERTICAL].forEach(direction => {
    test.describe(`render direction="${direction}"`, () => {
      [Status.ACTIVE, Status.VISIBLE, Status.HIDDEN, Status.DISABLED].forEach(status => {
        test.describe(`status="${status}"`, () => {
          [undefined, '#link'].forEach(href => {
            test.describe(`href="${href}"`, () => {
              [true, false].forEach(submenu => {
                test(`submenu="${submenu}"`, async ({ page }) => {
                  await page.setContent(createHTML({ status, href }, submenu ? slotMenuItem : '', direction));
                  await page.setViewportSize({ width: 100, height: 38 });

                  await expect(page.locator(status === Status.HIDDEN ? 'body' : '.e2e-screenshot')).toHaveScreenshot();
                });
              });
            });
          });
        });
      });

      [
        { label: 'submenu', slot: slotMenuItem },
        { label: 'image', slot: slotImage },
        { label: 'information', slot: slotInformation },
        { label: 'information AND image', slot: slotInformation + slotImage },
      ].forEach(({ label, slot }) => {
        test.describe(label, () => {
          [slotMenuItem, '']
            .flatMap(submenu => [slotMetadata, ''].map(metadata => ({ label, slot, submenu, metadata })))
            .forEach(({ label, slot, submenu, metadata }) => {
              test(`Should render with slots, props: ${renderAttributes({ slot, submenu, metadata })}`, async ({ page }) => {
                await page.setContent(createHTML({ label, size: metadata !== '' ? 'large' : 'medium' }, [slot, metadata, submenu].join(''), direction));
                await page.setViewportSize(defaultViewPortSize);

                await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
              });
            });
        });
      });

      sizes.forEach(size => {
        test(`Should renders with prop size="${size}"`, async ({ page }) => {
          await page.setContent(createHTML({ size }, [slotInformation, slotImage, slotMenuItem].join(''), direction));
          await page.setViewportSize(defaultViewPortSize);

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      targets.forEach(target => {
        test(`Should renders with prop target="${target}"`, async ({ page }) => {
          await page.setContent(createHTML({ target, href: '/' }, undefined, direction));
          await page.setViewportSize(defaultViewPortSize);

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });

      [true, false].forEach(expanded => {
        test(`Should renders with props expanded="${expanded}"`, async ({ page }) => {
          await page.setContent(createHTML({ expanded }, `<mg-menu direction="${Direction.VERTICAL}" label="submenu"><mg-menu-item status="active"><span slot="label">Batman begins</span></mg-menu-item></mg-menu>`, direction));
          await page.setViewportSize(defaultViewPortSize);

          await expect(page.locator(expanded ? 'body' : '.e2e-screenshot')).toHaveScreenshot();
        });
      });

      test('Should render content slot', async ({ page }) => {
        await page.setContent(createHTML({ }, slotContent, direction));
        await page.setViewportSize(defaultViewPortSize);

        await page.locator('mg-menu-item').first().click();

        await expect(page.locator('body')).toHaveScreenshot();
      });

      test('Should render slot image only with submenu', async ({ page }) => {
        await page.setContent(createHTML({ size: 'xlarge' }, slotContent + slotImage, direction));
        await page.setViewportSize({ ...defaultViewPortSize, width: 170 });
        await page.locator('mg-menu-item').first().click();

        await expect(page.locator('body')).toHaveScreenshot();

        // update css variables
        await page.addStyleTag({
          content: `
          mg-menu {
            --mg-c-menu-item-chevron-display: none;
            --mg-menu-item-navigation-button-column-gap: 0;
          }
          [slot="label"] {
            display: none;
          }
        `,
        });

        await expect(page.locator('body')).toHaveScreenshot();
      });

      [Status.ACTIVE, Status.VISIBLE, Status.HIDDEN, Status.DISABLED].forEach(status => {
        test(`Should manage keyboard navigation, case status="${status}"`, async ({ page }) => {
          await page.setContent(createHTML({ status }, slotMenuItem, direction));
          await page.setViewportSize(defaultViewPortSize);

          await expect(page.locator(status === Status.HIDDEN ? 'body' : '.e2e-screenshot')).toHaveScreenshot();

          for await (const key of ['Tab', 'Enter']) {
            await page.keyboard.press(key);
            await page.waitForTimeout(200);
            await expect(page.locator('body')).toHaveScreenshot();
          }
        });
      });
    });
  });
});
