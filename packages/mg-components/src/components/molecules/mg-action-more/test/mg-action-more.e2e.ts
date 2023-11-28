import { setPageContent, expect, describe, testEach, PageType, test } from '../../../../utils/playwright.e2e.test.utils';
import { renderAttributes, renderProperties } from '../../../../utils/e2e.test.utils';
import { createID } from '../../../../utils/components.utils';
import { Status } from '../../menu/mg-menu-item/mg-menu-item.conf';
import { MgActionMore } from '../mg-action-more';

const createHTML = (args: MgActionMoreType, id = `mg-action-more-${createID()}`) =>
  `<style>body {padding-left: 2rem;} </style><mg-action-more ${renderAttributes(args)} id="${id}"></mg-action-more><script>${renderProperties(args, `#${id}`)}</script>`;

const mouseEventHandler = () => 'hello batman';

export type MgActionMoreType = Partial<MgActionMore>;

const items: MgActionMoreType['items'] = [
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
    icon: 'user',
    href: '#',
  },
];

describe('mg-action-more', () => {
  describe('render', () => {
    testEach([
      {
        items,
      },
      {
        items,
        button: {
          label: 'dc-comics',
          variant: 'primary',
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
          variant: 'flat',
          isIcon: false,
        },
      },
      {
        items,
        displayChevron: true,
        button: {
          variant: 'flat',
          isIcon: false,
        },
      },
      {
        items,
        displayChevron: false,
        button: {
          variant: 'flat',
          isIcon: false,
        },
      },
      {
        items,
        button: {
          variant: 'flat',
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
          variant: 'flat',
          isIcon: false,
        },
      },
    ])('Should render %s', async (page: PageType, args: MgActionMoreType) => {
      await setPageContent(page, createHTML(args));

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describe('navigation', () => {
    testEach(['mouse', 'keyboard'])('should toggle button menu, case %s', async (page: PageType, navigation) => {
      await setPageContent(page, createHTML({ items }), { width: 130, height: 200 });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      if (navigation === 'mouse') {
        const mgButton = await page.locator('mg-action-more mg-button');
        await mgButton.click();
        await expect(page.locator('body')).toHaveScreenshot();

        const mgMenuItem = await page.locator('mg-menu-item:first-of-type');
        await mgMenuItem.click();
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      } else {
        for (const [index, key] of ['Tab', 'Enter', 'Tab', 'Enter'].entries()) {
          await page.keyboard.press(key);
          await expect(page.locator([0, 3].includes(index) ? '.e2e-screenshot' : 'body')).toHaveScreenshot();
        }
      }
    });

    test('should toggle button chevron menu', async ({ page }) => {
      await setPageContent(
        page,
        createHTML({
          items,
          displayChevron: true,
          button: {
            isIcon: false,
            variant: 'secondary',
          },
        }),
        { width: 130, height: 200 },
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      const mgButton = await page.locator('mg-action-more mg-button');
      await mgButton.click();

      await page.waitForTimeout(300); // wait chevron animation ended

      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
