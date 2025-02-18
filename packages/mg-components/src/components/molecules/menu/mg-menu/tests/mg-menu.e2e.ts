import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../../utils/playwright.fixture';
import { directions, MenuSizeType, sizes } from '../mg-menu.conf';
import { Direction } from '../../../../../types';

enum Position {
  PRESS = 'press',
  DOWN = 'down',
}

enum Key {
  TAB = 'Tab',
  SHIFT = 'Shift',
  ENTER = 'Enter',
}

const getSubMenuSize = (size: MenuSizeType): MenuSizeType => (size === 'large' ? 'large' : 'medium');

const getViewportSize = (direction: Direction, size?: MenuSizeType): { width: number; height: number } =>
  direction === directions.VERTICAL
    ? { width: 400, height: ['large', 'xlarge'].includes(size) ? 400 : 250 }
    : { width: ['large', 'xlarge'].includes(size) ? 1200 : 800, height: 200 };

const createHTML = (args, containerSize?): string => `
  <header class="menu-container menu-container--${containerSize}">
    <mg-menu ${renderAttributes({ label: 'menu', ...args })}>
      <mg-menu-item status="active">
        <span slot="label">1 - head-1</span>
        <mg-menu ${renderAttributes({ label: 'sub-menu 1', direction: directions.VERTICAL, size: getSubMenuSize(args?.size) })}>
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
        <mg-menu ${renderAttributes({ label: 'sub-menu 2', direction: directions.VERTICAL, size: getSubMenuSize(args?.size) })}>
          <mg-menu-item><span slot="label">Batman begins with a longer title to go outide screen</span></mg-menu-item>
        </mg-menu>
      </mg-menu-item>
    </mg-menu>
  </header>
  `;

const setPageContent = async (page, args, viewport) => {
  await page.setContent(createHTML(args));
  await page.setViewportSize(viewport);
  await page.locator('mg-menu.hydrated').first().waitFor();
};

test.describe('mg-menu', () => {
  [directions.HORIZONTAL, directions.VERTICAL].forEach(direction => {
    test.describe(`direction="${direction}"`, () => {
      sizes.forEach(size => {
        test(`should renders size="${size}" with large screen`, async ({ page }) => {
          await setPageContent(page, { direction, size, badge: true }, getViewportSize(direction, size));

          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        });
      });
    });
  });

  test.describe('navigation horizontal', () => {
    test(`should success mouse navigation`, async ({ page }) => {
      await setPageContent(page, { direction: directions.HORIZONTAL }, { width: 800, height: 80 });

      const actions = [
        { position: 0, expanded: 'true' },
        { position: 5, expanded: 'true' },
        { position: 0, expanded: 'true' },
      ];
      for (const { position, expanded } of actions) {
        const item = page.locator('mg-menu').first().locator('mg-menu-item').nth(position);
        await item.click();
        await page.locator('mg-popover-content[data-show]').waitFor();
        expect(await item.locator('button').first().getAttribute('aria-expanded')).toEqual(expanded);
      }

      const body = page.locator('body');
      // menu-item close
      await body.evaluate(elm => {
        elm.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      await expect(body).toHaveScreenshot();
    });
    test(`should success keyboard navigation, case direction ${directions.HORIZONTAL}`, async ({ page }) => {
      await setPageContent(page, { direction: directions.HORIZONTAL }, getViewportSize(directions.HORIZONTAL));

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
          item = page.locator('mg-menu').first().locator('mg-menu-item').nth(action.openeItem).locator('button[aria-expanded="true"]');
          expect(await item.getAttribute('aria-expanded')).toEqual('true');
        } else {
          item = page.locator('mg-menu').first().locator('mg-menu-item').first().locator('button').first();
          expect(await item.getAttribute('aria-expanded')).toEqual('false');
        }
      }
    });
  });

  test.describe('navigation vertical', () => {
    test(`should success mouse navigation`, async ({ page }) => {
      await setPageContent(page, { direction: directions.VERTICAL }, getViewportSize(directions.VERTICAL));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      const positions = [0, 4, 5, 0];
      for await (const position of positions) {
        const item = page.locator('mg-menu').first().locator('mg-menu-item').nth(position);
        await item.click();
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      }

      await page.locator('body').evaluate(elm => {
        elm.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    test(`should success keyboard navigation, case direction ${directions.VERTICAL}`, async ({ page }) => {
      await setPageContent(page, { direction: directions.VERTICAL }, getViewportSize(directions.VERTICAL));
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
