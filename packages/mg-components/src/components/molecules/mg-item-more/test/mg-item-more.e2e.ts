import { OverflowBehaviorElements } from '../../../../utils/behaviors.utils';
import { expect, describe, testEach, PageType } from '../../../../utils/playwright.e2e.test.utils';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { Status } from '../../menu/mg-menu-item/mg-menu-item.conf';
import { Direction, MenuSizeType, sizes } from '../../menu/mg-menu/mg-menu.conf';

const verticalFrameSizes = {
  regular: {
    height: 200,
    width: 180,
  },
  medium: {
    height: 300,
    width: 180,
  },
  large: {
    height: 400,
    width: 180,
  },
};

const getSubMenuSize = (size: MenuSizeType) => {
  if (size === 'large') return 'medium';
  else if (size === 'medium') return 'regular';
  else return 'regular';
};

const createHTML = args => `
  <header class="menu-container menu-container--${args.direction}-small">
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
    .menu-container.menu-container--horizontal-small {
      width: 200px;
    }
  </style>
  `;

describe('mg-item-more', () => {
  describe('mg-menu', () => {
    testEach(sizes)(`should renders, case direction ${Direction.VERTICAL} size %s with small screen`, async (page: PageType, size: string) => {
      await page.setContent(createHTML({ direction: Direction.VERTICAL, size }), verticalFrameSizes[size]);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    testEach([true, false])('should renders with overflow, case badge %s', async (page: PageType, badge) => {
      await page.setContent(createHTML({ direction: Direction.HORIZONTAL, badge }));
      await page.setViewportSize({ width: 400, height: 250 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.$eval(
        `[${OverflowBehaviorElements.BASE_INDEX}="0"]`,
        (elm, status) => {
          elm.setAttribute('status', status as string);
        },
        Status.VISIBLE,
      );

      await page.$eval(
        `[${OverflowBehaviorElements.BASE_INDEX}="2"]`,
        (elm, status) => {
          elm.setAttribute('status', status as string);
        },
        Status.ACTIVE,
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
