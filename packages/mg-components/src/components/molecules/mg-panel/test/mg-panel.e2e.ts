import { setPageContent, expect, describe, testEach, updateScreenshotClass, PageType, test } from '../../../../utils/playwright.e2e.test.utils';
import { createID } from '@mgdis/stencil-helpers';
import { renderAttributes, renderProperties } from '@mgdis/playwright-helpers';
import { type MgPanel } from '../mg-panel';

type ArgsType = Partial<MgPanel> & { slot?: SlotType };
const slots = ['default', 'flex'] as const;
type SlotType = (typeof slots)[number] | string;

const baseArgs = {
  panelTitle: 'panel title',
};

const createHTML = (args: ArgsType): string => {
  const identifier = createID();
  const slot: SlotType = Boolean(args.slot) ? args.slot : slots[0];
  delete args.slot;

  const flexSlotContainer = (content: string): string => '<mg-badge variant="primary" value="1" label="label"></mg-badge><div>' + content + '</div>';
  const slotContent = `
  <mg-button variant="secondary" style="margin-left: 200px;">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>
  `;

  return `
    <mg-panel ${renderAttributes({ ...args, identifier })}>
      ${
        slots.includes(slot as (typeof slots)[number])
          ? `
          <div>Content</div>
          <div slot="header-right" ${slot === 'flex' ? 'style="display:flex; justify-content:space-between; align-items:center; width:100%;"' : ''}>
            ${slot === 'flex' ? flexSlotContainer(slotContent) : slotContent}
          </div>`
          : slot
      }
    </mg-panel>
    <script>${renderProperties(args, `[identifier="${identifier}"]`)}</script>`;
};

describe('mg-panel', () => {
  testEach([
    { ...baseArgs },
    { ...baseArgs, titlePosition: 'left' },
    { ...baseArgs, titlePosition: 'right' },
    { ...baseArgs, titlePosition: 'right', titleEditable: true },
    { ...baseArgs, expandToggleDisplay: 'text' },
    { ...baseArgs, expandToggleDisplay: 'icon' },
    { ...baseArgs, expandToggleDisplay: 'icon', titleEditable: true },
    { ...baseArgs, expanded: true },
    { ...baseArgs, titleEditable: true },
    {
      ...baseArgs,
      panelTitle:
        'very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title',
    },
    {
      ...baseArgs,
      titleEditable: true,
      panelTitle:
        'very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title',
    },
    { ...baseArgs, slot: 'flex' },
    {
      ...baseArgs,
      slot: 'flex',
      panelTitle:
        'very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title',
    },
    { ...baseArgs, expanded: true, style: '--mg-panel-content-padding: 0', slot: '<div>Content without padding.</div>' },
    { ...baseArgs, expanded: true, style: '--mg-panel-background: none; --mg-panel-border-radius: 0; --mg-panel-box-shadow: none', slot: '<div>Transparent mg-panel</div>' },
    {
      ...baseArgs,
      expanded: true,
      slot: '<div>header right items should be vertically aligned</div><div slot="header-right"><mg-tag>Label</mg-tag><mg-icon size="small" icon="check-circle" variant="success"></mg-icon></div>',
    },
    { ...baseArgs, expanded: true, style: '--mg-panel-background: var(--color-danger)', slot: '<mg-card>Content with child card.</mg-card>' },
  ])('Should render with template %s', async (page: PageType, args: ArgsType) => {
    await setPageContent(
      page,
      createHTML({
        ...args,
      }),
    );

    await updateScreenshotClass(page, { width: '500px', height: '100%' });

    await expect(page.locator('mg-panel')).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator('mg-panel')).toHaveScreenshot();
  });

  describe('navigation', () => {
    testEach([
      { ...baseArgs, titleEditable: true },
      {
        ...baseArgs,
        titleEditable: true,
        panelTitle:
          'very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title',
      },
    ])('Should navigate throw editabled panel %s', async (page: PageType, args: ArgsType) => {
      await setPageContent(
        page,
        createHTML({
          ...args,
        }),
      );

      await expect(page.locator('mg-panel')).toHaveScreenshot();

      await page.locator('.mg-c-panel__header-title mg-button:last-of-type').click();

      // Hide caret for screenshots
      await page.locator('mg-panel input').evaluate(element => (element.style.caretColor = 'transparent'));

      await expect(page.locator('mg-panel')).toHaveScreenshot();

      const input = page.locator('mg-panel mg-input-text input');

      await input.press('Space');
      await input.press('KeyU');
      await input.press('KeyP');
      await input.press('KeyD');
      await input.press('KeyA');
      await input.press('KeyT');
      await input.press('KeyE');
      await input.press('KeyD');

      await page.locator('mg-panel mg-input-text mg-button:last-of-type').click();

      await expect(page.locator('mg-panel')).toHaveScreenshot();
    });

    test('Should NOT update panel title, case input new value does NOT match pattern', async ({ page }) => {
      const args = {
        ...baseArgs,
        titleEditable: true,
        titlePattern: '^((?!joker).)*$',
        titlePatternErrorMessage: "You can't enter a bad guy !",
      };

      await setPageContent(page, createHTML(args));

      await page.locator('.mg-c-panel__header-title mg-button:last-of-type').click();

      // Hide caret for screenshots
      await page.locator('mg-panel input').evaluate(element => (element.style.caretColor = 'transparent'));

      await expect(page.locator('mg-panel')).toHaveScreenshot();

      const input = page.locator('mg-panel mg-input-text input');

      await input.press('Backspace');
      await input.press('Backspace');
      await input.press('Backspace');
      await input.press('Backspace');
      await input.press('Backspace');
      await input.press('KeyJ');
      await input.press('KeyO');
      await input.press('KeyK');
      await input.press('KeyE');
      await input.press('KeyR');

      await page.locator('mg-panel mg-input-text mg-button:last-of-type').click();

      await expect(page.locator('mg-panel')).toHaveScreenshot();
    });
  });
});
