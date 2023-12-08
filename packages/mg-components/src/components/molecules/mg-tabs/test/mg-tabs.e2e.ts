import { setPageContent, expect, describe, describeEach, testEach, PageType, test } from '../../../../utils/playwright.e2e.test.utils';
import { createID } from '../../../../utils/components.utils';
import { sizes } from '../mg-tabs.conf';
import { MgTabs } from '../mg-tabs';
import { renderAttributes, renderProperties } from '../../../../utils/e2e.test.utils';

const defaultArgs = {
  label: 'label',
};

const createSlot = (items: unknown[]) => {
  const defaultSlotContents = [
    "Le héros peut être en chacun, même en celui qui fait une chose aussi simple et rassurante que mettre un manteau sur les épaules d'un garçon et ainsi lui faire comprendre que le monde ne s'est pas écroulé.",
    "La seule façon raisonnable de vivre en ce bas monde, c'est en dehors des règles.",
    'Bane have an hidden content',
  ];
  return items.map((_, i) => `<div slot="tab_content-${i + 1}">${i + 1 <= defaultSlotContents.length ? defaultSlotContents[i] : defaultSlotContents[0]}</div>`).join('');
};

enum Key {
  NEXT = 'ArrowRight',
  PREV = 'ArrowLeft',
  TAB = 'Tab',
  ENTER = 'Enter',
}

const createHTML = args => {
  const id = createID();
  return `<mg-tabs id="${id}" ${renderAttributes({ ...args })}">${createSlot(args.items)}</mg-tabs><script>${renderProperties(args, `#${id}`)}</script>`;
};

describe('mg-tabs', () => {
  describeEach(sizes)('size %s', async size => {
    testEach([
      { items: ['Batman', 'Joker', 'Bane'] },
      {
        items: [
          { label: 'Batman', icon: 'check' },
          { label: 'Joker', icon: 'cross', status: 'disabled' },
          { label: 'Bane', icon: 'cross', status: 'hidden' },
        ],
      },
      {
        items: [
          { label: 'Batman', badge: { label: 'count', value: 1 } },
          { label: 'Joker', badge: { label: 'count', value: 1 }, status: 'disabled' },
          { label: 'Bane', icon: 'cross', status: 'hidden' },
        ],
      },
      {
        items: [
          { label: 'Batman', icon: 'check', badge: { label: 'count', value: 99 } },
          { label: 'Joker', icon: 'cross', badge: { label: 'count', value: 99 }, status: 'disabled' },
          { label: 'Bane', icon: 'cross', status: 'hidden' },
        ],
      },
      {
        items: [
          { label: 'Batman', icon: 'check', badge: { label: 'count', value: 99, role: 'notification' } },
          { label: 'Joker', icon: 'cross', badge: { label: 'count', value: 99, role: 'information' }, status: 'disabled' },
          { label: 'Bane', icon: 'cross', status: 'hidden' },
        ],
      },
    ])(`render %s`, async (page: PageType, args: Partial<MgTabs>) => {
      await setPageContent(
        page,
        createHTML({
          ...defaultArgs,
          ...args,
          size,
        }),
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  describe('navigation', () => {
    test('should go to next tab on click event', async ({ page }) => {
      await setPageContent(
        page,
        createHTML({
          ...defaultArgs,
          items: ['Batman', 'Joker', 'Bane'],
        }),
      );

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.down('Tab');

      for (const key of [Key.NEXT, Key.NEXT, Key.PREV, Key.ENTER, Key.TAB]) {
        await page.keyboard.down(key);
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      }
    });
  });
});
