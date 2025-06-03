import { renderAttributes, renderProperties } from '@mgdis/core-ui-helpers/dist/playwright';
import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { tableWithHeaderCellsInTheTopRowOnly, tableSortable, tables, tableWithHeadersSpanningMultipleRowsOrColumns } from './mg-table.e2e.template';

const createHTML = (args, slot) => `<mg-table ${renderAttributes(args)}>${slot}</mg-table>`;

test.describe('mg-table', () => {
  [{}, { size: 'small' }, { size: 'large' }, { size: 'xlarge' }, { fullWidth: true }, { columns: { 2: { align: 'center' } } }, { columns: { 3: { datatype: 'numeric' } } }].forEach(
    args => {
      test(`Should render with args ${JSON.stringify(args)}`, async ({ page }) => {
        const html = createHTML(args, tableWithHeaderCellsInTheTopRowOnly);
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

  tables.forEach((table, index) => {
    test(`Should render w3c table ${index}`, async ({ page }) => {
      const html = createHTML({}, table);
      await page.setContent(html);
      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test(`Should render table with links`, async ({ page }) => {
    const table = tableWithHeadersSpanningMultipleRowsOrColumns
      .replace('Sizes available', '<a href="/">Sizes available</a>')
      .replace('Zodiac', '<a href="/">Zodiac</a>')
      .replace('A5', '<a href="/">A5</a>');
    const html = createHTML({}, table);
    await page.setContent(html);
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should render sortable table', async ({ page }) => {
    const args = { columns: { 1: { sortable: true }, 2: { datatype: 'date', sortable: true }, 3: { datatype: 'numeric', sortable: true } } };

    const html = createHTML(args, tableSortable);
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

  test('Should render a 2 lines sortable header', async ({ page }) => {
    const args = { columns: { 1: { sortable: true }, 2: { datatype: 'date', sortable: true, align: 'center' }, 3: { datatype: 'numeric', sortable: true } } };
    const table = tableSortable.replace('Name', 'Employee first name');

    const html = createHTML(args, table);
    await page.setContent(html);
    await page.addScriptTag({ content: renderProperties(args, 'mg-table') });
    await page.addStyleTag({ content: '.e2e-screenshot{padding:0.5rem}' }); // Add padding to prevent hover effect to be visible
    await page.setViewportSize({ width: 400, height: 800 }); // ensure header goes on 2 lines
    // Initial state
    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
