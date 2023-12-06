import { PageType, describe, describeEach, expect, setPageContent, testEach, updateScreenshotClass, test } from '../../../../utils/playwright.e2e.test.utils';

const TIMEOUT = 1000;
const style = '<style>mg-tooltip{display:contents}mg-icon{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}</style>';

describe('mg-tooltip', () => {
  testEach([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ])('placement %s', async (page: PageType, placement: string) => {
    await setPageContent(page, `${style}<mg-tooltip message="this is a tooltip message" placement="${placement}"><mg-icon icon="info-circle"></mg-icon></mg-tooltip>`, {
      width: 400,
      height: 400,
    });
    await updateScreenshotClass(page, { width: '400px', height: '400px' });

    await page.locator('mg-tooltip.hydrated').waitFor({ timeout: TIMEOUT });

    const mgIcon = page.locator('mg-icon');
    await mgIcon.waitFor({ timeout: TIMEOUT });

    await mgIcon.focus();

    const tooltip = await page.$('mg-tooltip-content');

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await mgIcon.blur();

    expect(await tooltip.getAttribute('data-show')).toEqual(null);

    await page.mouse.move(200, 200);

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);

    expect(await tooltip.getAttribute('data-show')).toEqual(null);
  });

  describeEach([
    '<mg-tooltip message="my tooltip coucou"><span>coucou</span></mg-tooltip>',
    `<mg-tooltip message="this is a tooltip message"><mg-icon icon="info-circle"></mg-icon></mg-tooltip>`,
    '<mg-tooltip message="my tooltip mg-button"><mg-button>mg-button</mg-button></mg-tooltip>',
    '<mg-tooltip message="my tooltip native button"><button>native button</button></mg-tooltip>',
  ])('Keyboard navigation with template %s', (template: string) => {
    test('Should NOT navigate with keyboard', async ({ page }) => {
      await setPageContent(page, template);

      await page.locator('mg-tooltip.hydrated').waitFor({ timeout: TIMEOUT });

      await page.keyboard.down('Tab');

      const tooltip = await page.$('mg-tooltip-content');

      expect(await tooltip.getAttribute('data-show')).toEqual('');

      await page.keyboard.down('Enter');

      expect(await tooltip.getAttribute('data-show')).toEqual('');

      await page.keyboard.down('Space');

      expect(await tooltip.getAttribute('data-show')).toEqual('');
    });

    test('Should navigate with keyboard, case key "Escape"', async ({ page }) => {
      await setPageContent(page, template);

      await page.locator('mg-tooltip.hydrated').waitFor({ timeout: TIMEOUT });

      await page.keyboard.down('Tab');

      const tooltip = await page.$('mg-tooltip-content');

      expect(await tooltip.getAttribute('data-show')).toEqual('');

      await page.keyboard.down('Escape');

      expect(await tooltip.getAttribute('data-show')).toEqual(null);
    });
  });

  test('Should keep tooltip displaied when hover with mouse after focus event', async ({ page }) => {
    await setPageContent(page, '<mg-tooltip identifier="identifier" message="Batman tooltip"><mg-icon icon="user"></mg-icon></mg-tooltip>');

    const mgIcon = page.locator('mg-icon');
    await mgIcon.waitFor({ timeout: TIMEOUT });

    const tooltip = await page.$('mg-tooltip-content');

    // 1. take focus on mgIcon and display tooltip
    await mgIcon.focus();

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    // 2. mouseenter on mgIcon and tooltip stay displaied
    await mgIcon.hover();

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    // 3. mouseleave on mgIcon and tooltip stay displaied
    await page.mouse.move(0, 0);

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    // 4. presse tab key and tooltip is hidden
    await mgIcon.blur();

    expect(await tooltip.getAttribute('data-show')).toEqual(null);
  });

  test('Should keep tooltip arrow when update message', async ({ page }) => {
    await setPageContent(page, '<mg-tooltip message="Batman tooltip"><mg-icon icon="user"></mg-icon></mg-tooltip>', { width: 100, height: 50 });

    await updateScreenshotClass(page, { width: '100px', height: '50px' });

    await page.keyboard.down('Tab');

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.$eval('mg-tooltip', elm => {
      (elm as HTMLMgTooltipElement).message = 'Joker is here';
    });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test(`should position tooltip where it have enough place`, async ({ page }) => {
    await setPageContent(
      page,
      `<style>mg-icon{position:fixed;left:0;bottom:0}</style>
      <mg-tooltip message="Batman tooltip" display><mg-icon icon="user"></mg-icon></mg-tooltip>`,
      { width: 150, height: 50 },
    );

    await updateScreenshotClass(page, { width: '150px', height: '50px' });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should display long tooltip with max width', async ({ page }) => {
    await setPageContent(
      page,
      '<mg-tooltip identifier="identifier" message="my very long content should return to line because of the max-width set to 400px in the design specification"><mg-icon icon="user"></mg-icon></mg-tooltip>',
      { width: 500, height: 100 },
    );
    await updateScreenshotClass(page, { width: '500px', height: '100px' });

    const mgIcon = page.locator('mg-icon');
    await mgIcon.waitFor({ timeout: TIMEOUT });

    await mgIcon.focus();

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should keep tooltip center when update "message" prop', async ({ page }) => {
    await setPageContent(page, `${style}<mg-tooltip identifier="identifier" message="short tooltip" display><mg-icon icon="user"></mg-icon></mg-tooltip>`, {
      width: 400,
      height: 400,
    });
    await updateScreenshotClass(page, { width: '400px', height: '400px' });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();

    await page.$eval('mg-tooltip', (mgTooltip: HTMLMgTooltipElement) => {
      mgTooltip.message = 'my very long content should return to line because of the max-width set to 400px in the design specification';
    });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
