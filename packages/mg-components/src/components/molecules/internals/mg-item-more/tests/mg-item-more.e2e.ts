import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
import { test } from '../../../../../utils/playwright.fixture';
import { Status } from '../../../menus/mg-menu-item/mg-menu-item.conf';
import { directions } from '../../../menus/mg-menu/mg-menu.conf';

const verticalFrameSize = {
  height: 200,
  width: 180,
};

const createHTML = args => `
  <header class="menu-container menu-container--${args.direction}-small">
    <mg-menu ${renderAttributes({ label: 'menu', ...args })}>
      <mg-menu-item>
        <span slot="label">1 - head-1</span>
        <mg-menu ${renderAttributes({ label: 'sub-menu 1', direction: directions.VERTICAL })}>
          <mg-menu-item status="active"><span slot="label">Batman begins</span></mg-menu-item>
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
        <mg-menu ${renderAttributes({ label: 'sub-menu 2', direction: directions.VERTICAL })}>
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

const setPageContent = async (page, args, viewPortSize = verticalFrameSize) => {
  await page.setContent(createHTML(args));
  await page.addStyleTag({ content: 'body{padding-left: 2rem;}' });
  await page.setViewportSize(viewPortSize);
  await page.locator('mg-menu.hydrated').first().waitFor();
};

test.describe('mg-item-more', () => {
  test.describe('mg-menu', () => {
    test(`should renders, case direction ${directions.VERTICAL} with small screen`, async ({ page }) => {
      await setPageContent(page, { direction: directions.VERTICAL });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });

    [true, false].forEach(badge => {
      test(`should renders with overflow, case badge="${badge}"`, async ({ page }) => {
        await setPageContent(page, { direction: directions.HORIZONTAL, badge }, { width: 400, height: 250 });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page
          .getByText(`Batman begins`)
          .first()
          .evaluate((elm, status) => {
            elm.closest('mg-menu-item').setAttribute('status', status as string);
          }, Status.VISIBLE);

        await page
          .getByText(`1 - head-4`)
          .first()
          .evaluate((elm, status) => {
            elm.closest('mg-menu-item').setAttribute('status', status as string);
          }, Status.ACTIVE);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });
});
