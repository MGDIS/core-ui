import { renderAttributes } from '@mgdis/stencil-helpers';
import { Direction, sizes } from '../../mg-menu/mg-menu.conf';
import { Status } from '../mg-menu-item.conf';
import { PageType, describe, describeEach, expect, setPageContent, test, testEach } from '../../../../../utils/playwright.e2e.test.utils';

const TIMEOUT = 1000;
const slotContent = '<div><h3>Demo title</h3><p>some content</p></div>';
const slotMenuItem = '<mg-menu label="submenu"><mg-menu-item><span slot="label">Batman begins</span></mg-menu-item></mg-menu>';
const slotImage = '<mg-icon icon="user" slot="image"></mg-icon>';
const slotInformation = '<mg-badge value="2" label="hello" slot="information"></mg-badge>';
const slotMetadata = '<span slot="metadata">is a hero</span>';

const createHTML = (args, slot = '', direction = Direction.HORIZONTAL) => `
<mg-menu ${renderAttributes({ label: 'batmenu', direction, ...args })}">
  <mg-menu-item ${renderAttributes(args)}>
    <span slot="label">${args.label ? args.label : 'batman'} ${args.href ? 'link' : ''}</span>
    ${slot}
  </mg-menu-item>
</mg-menu>
`;

describe('mg-menu-item', () => {
  describeEach([Direction.HORIZONTAL, Direction.VERTICAL])('render %s', (direction: Direction) => {
    testEach(
      [Status.ACTIVE, Status.VISIBLE, Status.HIDDEN, Status.DISABLED].flatMap(status =>
        [undefined, '#link'].flatMap(href => [true, false].map(submenu => createHTML({ status, href }, submenu && slotMenuItem, direction))),
      ),
    )('should render with status %s', async (page: PageType, html: string) => {
      await setPageContent(page, html, { width: 100, height: 38 });

      if (!html.includes('status="hidden"')) {
        await page.locator('mg-menu-item.hydrated').first().waitFor({ timeout: TIMEOUT });
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      } else {
        await expect(page.locator('body')).toHaveScreenshot();
      }
    });

    testEach(
      [
        { label: 'submenu', slot: slotMenuItem },
        { label: 'image', slot: slotImage },
        { label: 'information', slot: slotInformation },
        { label: 'information AND image', slot: slotInformation + slotImage },
      ].flatMap(({ label, slot }) =>
        [slotMenuItem, ''].flatMap(submenu =>
          [slotMetadata, ''].map(metadata => createHTML({ label, size: metadata !== '' ? 'medium' : 'regular' }, [slot, metadata, submenu].join(''), direction)),
        ),
      ),
    )('should render with slots %s', async (page: PageType, html: string) => {
      await setPageContent(page, html, { width: 130, height: 60 });

      await page.locator('mg-menu-item.hydrated').first().waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach(sizes)(`should renders direction=${direction}, props size=%s`, async (page: PageType, size) => {
      await setPageContent(page, createHTML({ size }, [slotInformation, slotImage, slotMenuItem].join(''), direction), { width: 130, height: 110 });

      await page.locator('mg-menu-item.hydrated').first().waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([true, false])(`should renders direction=${direction}, props expanded=%s`, async (page: PageType, expanded: boolean) => {
      await setPageContent(page, createHTML({ expanded }, slotMenuItem, direction), { width: 130, height: 110 });

      await page.locator('mg-menu-item.hydrated').first().waitFor({ timeout: TIMEOUT });

      await expect(page.locator(expanded ? 'body' : '.e2e-screenshot')).toHaveScreenshot();
    });

    test('should render content slot', async ({ page }) => {
      await setPageContent(page, createHTML({ expanded: true }, slotContent, direction), { width: 100, height: 150 });

      await page.locator('mg-menu-item.hydrated').first().waitFor({ timeout: TIMEOUT });

      await expect(page.locator('body')).toHaveScreenshot();
    });

    testEach([Status.ACTIVE, Status.VISIBLE, Status.HIDDEN, Status.DISABLED])('shoud manage keyboard navigation %s', async (page: PageType, status) => {
      await setPageContent(page, createHTML({ status }, slotMenuItem, direction), { width: 120, height: 200 });

      if (status !== Status.HIDDEN) {
        await page.locator('mg-menu-item.hydrated').first().waitFor({ timeout: TIMEOUT });
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      } else {
        await expect(page.locator('body')).toHaveScreenshot();
      }

      for await (const key of ['Tab', 'Enter']) {
        await page.keyboard.press(key);
        await page.waitForTimeout(200);
        await expect(page.locator('body')).toHaveScreenshot();
      }
    });
  });
});
