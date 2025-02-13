import { renderAttributes, renderProperties } from '@mgdis/playwright-helpers';
import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';

const createHTML = (args, slot) => `<mg-table ${renderAttributes(args)}>${slot}</mg-table>`;

const table = `<table>
  <thead>
    <tr>
      <th>Dev</th>
      <th>Role</th>
      <th>Test signature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Simon</th>
      <td>Archi front-end</td>
      <td>Blu / Daron Crew</td>
    </tr>
    <tr>
      <th>Nico</th>
      <td>Dev front-end</td>
      <td>DC Comics (Batman, Jocker, etc.)</td>
    </tr>
    <tr>
      <th>Guirec</th>
      <td>Dev front-end</td>
      <td>Pat'Patrouille</td>
    </tr>
  </tbody>
</table>`;

test.describe('mg-table', () => {
  [
    {},
    { size: 'small' },
    { size: 'large' },
    { size: 'xlarge' },
    { fullWidth: true },
    { columnsAlignment: 'left' },
    { columnsAlignment: 'center' },
    { columnsAlignment: 'right' },
    { columnsAlignment: ['left', 'center', 'right'] },
    { columnsAlignment: { 2: 'center' } },
  ].forEach(args => {
    test(`Should render with args ${JSON.stringify(args)}`, async ({ page }) => {
      const html = createHTML(args, table);
      await page.setContent(html);
      if (typeof args.columnsAlignment !== 'string') {
        await page.addScriptTag({ content: renderProperties(args, 'mg-table') });
      }
      if (args.fullWidth) {
        await page.addStyleTag({ content: '.e2e-screenshot{display:block}' });
      }
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });
});
