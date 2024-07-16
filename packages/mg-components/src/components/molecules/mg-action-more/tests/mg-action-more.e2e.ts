import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { createID } from '@mgdis/stencil-helpers';
import { renderAttributes, renderProperties } from '@mgdis/playwright-helpers';
import { Status } from '../../menu/mg-menu-item/mg-menu-item.conf';
import type { MgActionMore } from '../mg-action-more';
import type { MgButton } from '../../../atoms/mg-button/mg-button';

type MgActionMoreType = Partial<MgActionMore>;

const createHTML = (args: MgActionMoreType) => `<mg-action-more ${renderAttributes(args)}></mg-action-more>`;

const renderHTML = async (page, args) => {
  const id = `mg-action-more-${createID()}`;
  await page.setContent(createHTML({ ...args, id }));
  await page.addScriptTag({ content: renderProperties(args, `#${id}`) });
  await page.addStyleTag({ content: 'body{padding-left: 2rem;}' });
};

const mouseEventHandler = () => 'hello batman';

const defaultViewPortSize = { width: 150, height: 270 };

const items: MgActionMore['items'] = [
  {
    label: 'batman',
    mouseEventHandler,
  },
  {
    label: 'robin',
    mouseEventHandler,
    status: Status.HIDDEN,
  },
  {
    isDivider: true,
  },
  {
    label: 'joker',
    mouseEventHandler,
    badge: {
      value: 2,
      label: 'badge',
    },
  },
  {
    label: 'bane',
    mouseEventHandler,
    icon: { icon: 'user' },
    href: '#',
  },
  {
    label: 'robin',
    mouseEventHandler,
    icon: { icon: 'user', variant: 'success', variantStyle: 'icon' },
    href: '#',
  },
  {
    label: "Ra's al Ghul",
    mouseEventHandler,
    href: '/',
    target: '_blank',
  },
];

test.describe('mg-action-more', () => {
  test.describe('render', () => {
    [
      {
        items,
      },
      {
        items,
        button: {
          label: 'dc-comics',
          variant: 'primary' as MgButton['variant'],
          isIcon: false,
        },
        icon: {
          icon: 'plus',
        },
      },
      {
        items,
        displayChevron: true,
        icon: {
          icon: 'ellipsis',
        },
        button: {
          variant: 'flat' as MgButton['variant'],
          isIcon: false,
        },
      },
      {
        items,
        displayChevron: true,
        button: {
          variant: 'flat' as MgButton['variant'],
          isIcon: false,
        },
      },
      {
        items,
        displayChevron: false,
        button: {
          variant: 'flat' as MgButton['variant'],
          isIcon: false,
        },
      },
      {
        items,
        button: {
          variant: 'flat' as MgButton['variant'],
          isIcon: false,
          disabled: true,
        },
      },
      {
        items,
        displayChevron: false,
        icon: {
          icon: 'ellipsis',
        },
        button: {
          variant: 'flat' as MgButton['variant'],
          isIcon: false,
        },
      },
    ].forEach((args, index) => {
      test(`Should render ${renderAttributes(args)} - ${index}`, async ({ page }) => {
        await renderHTML(page, args);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  test.describe('navigation', () => {
    ['mouse', 'keyboard'].forEach(navigation => {
      test(`Should toggle button menu, case ${navigation}`, async ({ page }) => {
        await renderHTML(page, { items });

        await page.setViewportSize(defaultViewPortSize);

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        if (navigation === 'mouse') {
          const mgButton = page.locator('mg-action-more mg-button');
          await mgButton.click();
          await expect(page.locator('body')).toHaveScreenshot();

          const mgMenuItem = page.locator('mg-menu-item:first-of-type');
          await mgMenuItem.click();
          await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
        } else {
          for (const [index, key] of ['Tab', 'Enter', 'Tab', 'Enter'].entries()) {
            await page.keyboard.press(key);
            await expect(page.locator([0, 3].includes(index) ? '.e2e-screenshot' : 'body')).toHaveScreenshot();
          }
        }
      });
    });

    test('Should toggle button chevron menu', async ({ page }) => {
      await renderHTML(page, {
        items,
        displayChevron: true,
        button: {
          isIcon: false,
          variant: 'secondary',
        },
      });

      await page.setViewportSize(defaultViewPortSize);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      const mgButton = page.locator('mg-action-more mg-button');
      await mgButton.click();

      await page.waitForTimeout(300); // wait chevron animation ended

      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
