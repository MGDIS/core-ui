import { renderAttributes } from '../../../../../utils/e2e.test.utils';
import { setPageContent, expect, describe, describeEach, testEach, test, PageType, updateScreenshotClass } from '../../../../../utils/playwright.e2e.test.utils';
import { Direction, MenuSizeType, sizes } from '../mg-menu.conf';

enum Position {
  PRESS = 'press',
  DOWN = 'down',
}

enum Key {
  TAB = 'Tab',
  SHIFT = 'Shift',
  ENTER = 'Enter',
}

const TIMEOUT = 1000;

const getSubMenuSize = (size: MenuSizeType): MenuSizeType => {
  if (size === 'large') return 'medium';
  else if (size === 'medium') return 'regular';
  else return 'regular';
};

const numberToPx = (value: number): string => `${value}px`;

const getFrameSize = (direction: Direction, size?: MenuSizeType): { width: number; height: number } =>
  direction === Direction.VERTICAL
    ? { width: 400, height: ['medium', 'large'].includes(size) ? 400 : 250 }
    : { width: ['medium', 'large'].includes(size) ? 1200 : 800, height: 200 };

const createHTML = (args, containerSize?): string => `
  <header class="menu-container menu-container--${containerSize}">
    <mg-menu ${renderAttributes({ label: 'menu', ...args })}>
      <mg-menu-item status="active">
        <span slot="label">1 - head-1</span>
        <mg-menu ${renderAttributes({ label: 'sub-menu 1', direction: Direction.VERTICAL, size: getSubMenuSize(args?.size) })}>
          <mg-menu-item><span slot="label">Batman begins</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
      <mg-menu-item status="disabled"><span slot="label">1 - head-2 long</span></mg-menu-item>
      <mg-menu-item href="#link">
        <span slot="label">1 - head-3 very long</span>
        <mg-icon icon='user' slot='image'></mg-icon>
      </mg-menu-item>
      <mg-menu-item>
        <span slot="label">1 - head-4</span>
        <mg-icon icon='user' slot='image'></mg-icon>
        ${args?.badge ? "<mg-badge value='2' label='hello' slot='information'></mg-badge>" : ''}  
      </mg-menu-item>
      <mg-menu-item>
        <span slot="label">1 - head-5</span>
        <mg-icon icon='user' slot='image'></mg-icon>
        ${args?.badge ? "<mg-badge value='2' label='hello' slot='information'></mg-badge>" : ''} 
        <mg-menu ${renderAttributes({ label: 'sub-menu 2', direction: Direction.VERTICAL, size: getSubMenuSize(args?.size) })}>
          <mg-menu-item><span slot="label">Batman begins with a longer title to go outide screen</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
  </header>
  <style>
    .menu-container.menu-container--vertical-small {
      width: 180px;
    }
  </style>
  `;

describe('mg-menu', () => {
  describeEach([Direction.HORIZONTAL, Direction.VERTICAL])('direction %s', (direction: Direction) => {
    testEach(sizes)(`should renders, case direction ${direction} size %s with large screen`, async (page: PageType, size: MenuSizeType) => {
      await setPageContent(page, createHTML({ direction, size, badge: true }), getFrameSize(direction, size));

      await updateScreenshotClass(page, { width: numberToPx(getFrameSize(direction, size).width) });

      await page.locator('mg-menu.hydrated').first().waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describe('navigation horizontal', () => {
    test(`should success mouse navigation, case direction ${Direction.HORIZONTAL}`, async ({ page }) => {
      await setPageContent(page, createHTML({ direction: Direction.HORIZONTAL }), { width: 800, height: 80 });
      await page.locator('mg-menu.hydrated').first().waitFor({ timeout: TIMEOUT });
      const actions = [
        { position: 0, expanded: 'true' },
        { position: 5, expanded: 'true' },
        { position: 0, expanded: 'true' },
      ];
      for (const { position, expanded } of actions) {
        const item = await page.locator('mg-menu').first().locator('mg-menu-item').nth(position);
        await item.click();
        await page.locator('mg-popover-content[data-show]').waitFor({ timeout: TIMEOUT });
        expect(await item.locator('button').first().getAttribute('aria-expanded')).toEqual(expanded);
      }
      // menu-item close
      await page.$eval('body', elm => {
        elm.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await expect(page.locator('body')).toHaveScreenshot();
    });
    test(`should success keyboard navigation, case direction ${Direction.HORIZONTAL}`, async ({ page }) => {
      await setPageContent(page, createHTML({ direction: Direction.HORIZONTAL }), getFrameSize(Direction.HORIZONTAL));
      await page.locator('mg-menu.hydrated').first().waitFor({ timeout: TIMEOUT });
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      const actions = [
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
        { position: Position.PRESS, key: Key.ENTER, openeItem: 5 },
        { position: Position.PRESS, key: Key.TAB, openeItem: 5 },
        { position: Position.PRESS, key: Key.SHIFT, openeItem: 5 },
        { position: Position.PRESS, key: Key.ENTER, openeItem: null },
        { position: Position.PRESS, key: Key.TAB, openeItem: null },
      ];
      for await (const action of actions) {
        if (action.key === Key.SHIFT) {
          await page.keyboard.down(Key.SHIFT);
          await page.keyboard.press(Key.TAB);
          await page.keyboard.up(Key.SHIFT);
        } else {
          await page.keyboard[action.position](action.key);
        }
        let item;
        if (action.openeItem > 0) {
          item = await page.locator('mg-menu').first().locator('mg-menu-item').nth(action.openeItem).locator('button[aria-expanded="true"]');
          expect(await item.getAttribute('aria-expanded')).toEqual('true');
        } else {
          item = await page.locator('mg-menu').first().locator('mg-menu-item').first().locator('button').first();
          expect(await item.getAttribute('aria-expanded')).toEqual('false');
        }
      }
    });
  });

  describe('navigation vertical', () => {
    test(`should success mouse navigation, case direction ${Direction.VERTICAL}`, async ({ page }) => {
      await setPageContent(page, createHTML({ direction: Direction.VERTICAL }), getFrameSize(Direction.VERTICAL));
      await page.locator('mg-menu.hydrated').first().waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      const positions = [0, 4, 5, 0];
      for await (const position of positions) {
        const item = await page.locator('mg-menu').first().locator('mg-menu-item').nth(position);
        await item.click();
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      }

      await page.$eval('body', elm => {
        elm.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test(`should success keyboard navigation, case direction ${Direction.VERTICAL}`, async ({ page }) => {
      await setPageContent(page, createHTML({ direction: Direction.VERTICAL }), getFrameSize(Direction.VERTICAL));
      await page.locator('mg-menu.hydrated').first().waitFor({ timeout: TIMEOUT });
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      const actions = [
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.ENTER },
        { position: Position.PRESS, key: Key.TAB },
        { position: Position.PRESS, key: Key.SHIFT },
        { position: Position.PRESS, key: Key.ENTER },
        { position: Position.PRESS, key: Key.TAB },
      ];

      for await (const action of actions) {
        if (action.key === Key.SHIFT) {
          await page.keyboard.down(Key.SHIFT);
          await page.keyboard.press(Key.TAB);
          await page.keyboard.up(Key.SHIFT);
        } else {
          await page.keyboard[action.position](action.key);
        }
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      }
    });
  });
});
