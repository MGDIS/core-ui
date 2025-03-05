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

const tableWithLinks = `<table>
  <thead>
    <tr>
      <th>
        <a href="/">Dev</a>
      </th>
      <th>Role</th>
      <th>Test signature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>
        <a href="/">Simon</a>
      </th>
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

const sortableTable = `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Birthday</th>
      <th>Age</th>
      <th>Test signature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Simon</th>
      <td data-sort="1982-06-02">02/06/1982</td>
      <td>42</td>
      <td>Blu / Daron Crew</td>
    </tr>
    <tr>
      <th>Nico</th>
      <td data-sort="1990-10-31">31/10/1990</td>
      <td>35</td>
      <td>DC Comics (Batman, Jocker, etc.)</td>
    </tr>
    <tr>
      <th>Guirec</th>
      <td data-sort="1985-12-30">30/12/1985</td>
      <td>39</td>
      <td>Pat'Patrouille</td>
    </tr>
  </tbody>
</table>`;

test.describe('mg-table', () => {
  [{}, { size: 'small' }, { size: 'large' }, { size: 'xlarge' }, { fullWidth: true }, { columns: { 2: { align: 'center' } } }, { columns: { 3: { datatype: 'number' } } }].forEach(
    args => {
      test(`Should render with args ${JSON.stringify(args)}`, async ({ page }) => {
        const html = createHTML(args, table);
        await page.setContent(html);
        if (args.columns !== undefined) {
          await page.addScriptTag({ content: renderProperties(args, 'mg-table') });
        }
        if (args.fullWidth) {
          await page.addStyleTag({ content: '.e2e-screenshot{display:block}' });
        }
        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    },
  );

  [undefined, '#BADA55'].forEach(colorApp => {
    test(`Should render table with links in table based on app color: ${colorApp}`, async ({ page }) => {
      const html = createHTML({}, tableWithLinks);
      await page.setContent(html);
      if (colorApp !== undefined) {
        await page.addStyleTag({ content: `mg-table{--mg-b-color-app:${colorApp}}` });
      }
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render sortable table', async ({ page }) => {
    const args = { columns: { 1: { sortable: true }, 2: { datatype: 'date', sortable: true }, 3: { datatype: 'numeric', sortable: true } } };
    const html = createHTML(args, sortableTable);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(args, 'mg-table') });
    await page.addStyleTag({ content: '.e2e-screenshot{padding:0.5rem}' }); // Add padding to prevent hover effect to be visible

    // Initial state
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by name ascending
    await page.locator('th').nth(0).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by name descending
    await page.locator('th').nth(0).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by name none
    await page.locator('th').nth(0).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by birthday ascending
    await page.locator('th').nth(1).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by birthday descending
    await page.locator('th').nth(1).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by birthday none
    await page.locator('th').nth(1).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by age ascending
    await page.locator('th').nth(2).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by age descending
    await page.locator('th').nth(2).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    // Sort by age none
    await page.locator('th').nth(2).click();
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
