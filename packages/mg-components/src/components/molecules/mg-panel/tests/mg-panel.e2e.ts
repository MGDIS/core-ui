import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { createID } from '@mgdis/core-ui-helpers/dist/utils';
import { renderAttributes } from '@mgdis/core-ui-helpers/dist/playwright';
import { MgPanel } from '../mg-panel';

const baseArgs = {
  panelTitle: 'panel title',
};

const renderSlotHeader = (content: string): string => `<div slot="header-right" style="width:100%; align-items:center;">${content}</div>`;
const mgBadge = '<mg-badge variant="primary" value="1" label="label"></mg-badge>';
const mgButtonUpload = `
  <mg-button variant="secondary" style="margin-left: auto">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  `;
const mgButtonTrash = `
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>`;
const slotPanelTitleWithTextAndBadge = `<div slot="panel-title">very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title very long panel title ${mgBadge}</div>`;
const slotHeaderWithButtons = renderSlotHeader([mgButtonUpload, mgButtonTrash].join(''));

const slotContent = '<div>Content</div>';

const createHTML = (args: Partial<MgPanel & { slot: string }>): string => {
  const identifier = createID();
  const slots = args.slot;
  delete args.slot;

  return `
  <style>
  .e2e-screenshot {
    width: 465px;
  }
  </style>
  <mg-panel ${renderAttributes({ ...args, identifier })}>
    ${slots === undefined ? [slotContent, renderSlotHeader([mgButtonUpload, mgButtonTrash].join(''))].join('') : slots}
  </mg-panel>
  `;
};

test.describe('mg-panel', () => {
  [
    {},
    { titlePosition: 'left' as MgPanel['titlePosition'] },
    { titlePosition: 'right' as MgPanel['titlePosition'] },
    { titlePosition: 'right' as MgPanel['titlePosition'], titleEditable: true },
    { expandToggleDisplay: 'text' as MgPanel['expandToggleDisplay'] },
    { expandToggleDisplay: 'icon' as MgPanel['expandToggleDisplay'] },
    { expandToggleDisplay: 'icon' as MgPanel['expandToggleDisplay'], titleEditable: true },
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
    { slot: [slotPanelTitleWithTextAndBadge, slotHeaderWithButtons, slotContent].join('') },
    { expanded: true, style: '--mg-c-panel-content-spacing: 0', slot: '<div>Content without padding.</div>' },
    { expanded: true, style: '--mg-c-panel-color-background: none; --mg-c-panel-border-radius: 0; --mg-c-panel-box-shadow: none', slot: '<div>Transparent mg-panel</div>' },
    {
      expanded: true,
      slot: '<div>header right items should be vertically aligned</div><div slot="header-right"><mg-tag>Label</mg-tag><mg-icon size="small" icon="check-circle" variant="success"></mg-icon></div>',
    },
    { expanded: true, style: '--mg-c-panel-color-background:var(--mg-b-color-danger)', slot: '<mg-card>Content with child card.</mg-card>' },
    { slot: '<mg-message>message</mg-message>' },
    { slot: '<div><mg-message>message</mg-message></div>' },
    { slot: '<mg-card>card</mg-card>' },
    { slot: '<div><mg-card>card</mg-card></div>' },
    { slot: '<div slot="panel-title">required mark in title <span style="color:red">*</span></div><div>Content</div>' },
  ].forEach(args => {
    test(`Should render with template ${renderAttributes(args)}`, async ({ page }) => {
      const html = createHTML({ ...baseArgs, ...args });
      await page.setContent(html);

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
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

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

        await page.locator('.mg-c-panel__header-title mg-button:last-of-type').click();

        // Hide caret for screenshots
        await page.locator('mg-panel input').evaluate(elm => (elm.style.caretColor = 'transparent'));

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

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

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
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

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

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

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
