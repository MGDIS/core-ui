import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { createID } from '@mgdis/stencil-helpers';
import { renderAttributes } from '@mgdis/playwright-helpers';

const slots = ['default', 'flex'] as const;
type SlotType = (typeof slots)[number] | string;

const baseArgs = {
  panelTitle: 'panel title',
};

const createHTML = (args): string => {
  const identifier = createID();
  const slot: SlotType = Boolean(args.slot) ? args.slot : slots[0];
  delete args.slot;

  const flexSlotContainer = (content: string): string => `<mg-badge variant="primary" value="1" label="label"></mg-badge><div>${content}</div>`;

  const slotContent = `<mg-button variant="secondary" style="margin-left: 200px;">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>`;

  return `<mg-panel ${renderAttributes({ ...args, identifier })}>
      ${
        slots.includes(slot as (typeof slots)[number])
          ? `
          <div>Content</div>
          <div slot="header-right" ${slot === 'flex' ? 'style="display:flex; justify-content:space-between; align-items:center; width:100%;"' : ''}>
            ${slot === 'flex' ? flexSlotContainer(slotContent) : slotContent}
          </div>`
          : slot
      }
    </mg-panel>`;
};

test.describe('mg-panel', () => {
  [
    {},
    { titlePosition: 'left' },
    { titlePosition: 'right' },
    { titlePosition: 'right', titleEditable: true },
    { expandToggleDisplay: 'text' },
    { expandToggleDisplay: 'icon' },
    { expandToggleDisplay: 'icon', titleEditable: true },
    { expanded: true },
    { titleEditable: true },
    {
      panelTitle:
        'very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title',
    },
    {
      titleEditable: true,
      panelTitle:
        'very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title',
    },
    { slot: 'flex' },
    {
      slot: 'flex',
      panelTitle:
        'very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title',
    },
    { expanded: true, style: '--mg-c-panel-content-spacing: 0', slot: '<div>Content without padding.</div>' },
    { expanded: true, style: '--mg-c-panel-color-background: none; --mg-c-panel-border-radius: 0; --mg-c-panel-box-shadow: none', slot: '<div>Transparent mg-panel</div>' },
    {
      expanded: true,
      slot: '<div>header right items should be vertically aligned</div><div slot="header-right"><mg-tag>Label</mg-tag><mg-icon size="small" icon="check-circle" variant="success"></mg-icon></div>',
    },
    { expanded: true, style: '--mg-c-panel-color-background:var(--mg-b-color-danger)', slot: '<mg-card>Content with child card.</mg-card>' },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await page.setViewportSize({ width: 500, height: 100 });

      await expect(page.locator('mg-panel')).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('mg-panel')).toHaveScreenshot();
    });
  });

  test.describe('navigation', () => {
    [
      { titleEditable: true },
      {
        titleEditable: true,
        panelTitle:
          'very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title',
      },
    ].forEach(args => {
      test(`Should navigate throw editabled panel ${renderAttributes(args)}`, async ({ page }) => {
        const html = createHTML({ ...baseArgs, ...args });
        await page.setContent(html);

        await expect(page.locator('mg-panel')).toHaveScreenshot();

        await page.locator('.mg-c-panel__header-title mg-button:last-of-type').click();

        // Hide caret for screenshots
        await page.locator('mg-panel input').evaluate(elm => (elm.style.caretColor = 'transparent'));

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
    });

    test('Should NOT update panel title, case input new value does NOT match pattern', async ({ page }) => {
      const html = createHTML({
        ...baseArgs,
        titleEditable: true,
        titlePattern: '^((?!joker).)*$',
        titlePatternErrorMessage: "You can't enter a bad guy !",
      });
      await page.setContent(html);

      await page.locator('.mg-c-panel__header-title mg-button:last-of-type').click();

      // Hide caret for screenshots
      await page.locator('mg-panel input').evaluate(elm => (elm.style.caretColor = 'transparent'));

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
