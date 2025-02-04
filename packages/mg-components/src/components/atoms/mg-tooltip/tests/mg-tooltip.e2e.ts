import { expect } from '@playwright/test';
import { renderAttributes } from '@mgdis/playwright-helpers';
import { test } from '../../../../utils/playwright.fixture';
import { placements } from '../mg-tooltip.conf';

const createHTML = (args, slot = '') => `<mg-tooltip ${renderAttributes(args)}>${slot}</mg-tooltip>`;

test.describe('mg-tooltip', () => {
  placements.forEach(placement => {
    test(`placement ${placement}`, async ({ page }) => {
      page.addStyleTag({ content: '.e2e-screenshot{display:block}mg-icon{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}' });
      await page.setViewportSize({ width: 400, height: 400 });

      const html = createHTML({ placement, message: 'this is a tooltip message' }, '<mg-icon icon="info-circle"></mg-icon>');
      await page.setContent(html);

      const mgIcon = page.locator('mg-icon');
      await mgIcon.waitFor();

      await mgIcon.focus();

      const tooltip = page.locator('mg-tooltip-content');
      await tooltip.waitFor();

      expect(await tooltip.getAttribute('data-show')).toEqual('');

      await expect(page.locator('body')).toHaveScreenshot();

      await mgIcon.blur();

      expect(await tooltip.getAttribute('data-show')).toEqual(null);

      await page.mouse.move(200, 200);

      expect(await tooltip.getAttribute('data-show')).toEqual('');

      await page.mouse.move(0, 0);
      await page.waitForTimeout(100);

      expect(await tooltip.getAttribute('data-show')).toEqual(null);
    });
  });

  ['<span>coucou</span>', '<mg-icon icon="info-circle"></mg-icon>', '<mg-button>mg-button</mg-button>', '<button>native button</button>'].forEach(slot => {
    test.describe(`slot ${slot}`, () => {
      test('Should NOT navigate with keyboard', async ({ page }) => {
        const html = createHTML({ message: 'message' }, slot);
        await page.setContent(html);

        await page.locator('mg-tooltip.hydrated').waitFor();

        await page.keyboard.down('Tab');

        const tooltip = page.locator('mg-tooltip-content');
        await tooltip.waitFor();

        expect(await tooltip.getAttribute('data-show')).toEqual('');

        await page.keyboard.down('Enter');

        expect(await tooltip.getAttribute('data-show')).toEqual('');

        await page.keyboard.down('Space');

        expect(await tooltip.getAttribute('data-show')).toEqual('');
      });

      test('Should navigate with keyboard, case key "Escape"', async ({ page }) => {
        const html = createHTML({ message: 'message' }, slot);
        await page.setContent(html);

        await page.locator('mg-tooltip.hydrated').waitFor();

        await page.keyboard.down('Tab');

        const tooltip = page.locator('mg-tooltip-content');
        await tooltip.waitFor();

        expect(await tooltip.getAttribute('data-show')).toEqual('');

        await page.keyboard.down('Escape');

        expect(await tooltip.getAttribute('data-show')).toEqual(null);
      });
    });
  });

  test('Should keep tooltip displayed when hover with mouse after focus event', async ({ page }) => {
    const html = createHTML({ message: 'message' }, '<mg-icon icon="user"></mg-icon>');
    await page.setContent(html);

    const mgIcon = page.locator('mg-icon');
    await mgIcon.waitFor();

    const tooltip = page.locator('mg-tooltip-content');
    await mgIcon.waitFor();

    // 1. take focus on mgIcon and display tooltip
    await mgIcon.focus();

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    // 2. mouseenter on mgIcon and tooltip stay displayed
    await mgIcon.hover();

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    // 3. mouseleave on mgIcon and tooltip stay displayed
    await page.mouse.move(0, 0);

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    // 4. presse tab key and tooltip is hidden
    await mgIcon.blur();

    expect(await tooltip.getAttribute('data-show')).toEqual(null);
  });

  test('Should keep tooltip displayed when mg-button is disableOnClick', async ({ page }) => {
    const html = createHTML({ message: 'disable on click', position: 'top' }, '<mg-button disable-on-click>disable on click</mg-button>');
    await page.setContent(html);
    await page.addScriptTag({
      content: `document.querySelector('mg-button').addEventListener('click', (event) => {
      setTimeout(() => {
        event.target.disabled = false;
      }, 1000)
    })`,
    });
    await page.setViewportSize({ width: 500, height: 100 });

    const mgButton = page.locator('mg-button');
    await mgButton.waitFor();

    const tooltip = page.locator('mg-tooltip-content');
    await mgButton.waitFor();

    // 1. take focus on mgButton and display tooltip
    await mgButton.click();

    expect(await tooltip.getAttribute('data-show')).toEqual('');

    // 2. wait loading mock with timeout ending while disable on click
    await page.locator('mg-button[aria-disabled="false"]').waitFor();
    expect(await tooltip.getAttribute('data-show')).toEqual('');

    await expect(page.locator('body')).toHaveScreenshot();

    // 3. presse tab key and tooltip is hidden
    await mgButton.blur();

    expect(await tooltip.getAttribute('data-show')).toEqual(null);
    await expect(page.locator('body')).toHaveScreenshot();
  });

  test('Should keep tooltip arrow when update message', async ({ page }) => {
    page.addStyleTag({ content: '.e2e-screenshot{display:block}' });
    const html = createHTML({ message: 'Batman tooltip' }, '<mg-icon icon="user"></mg-icon>');
    await page.setContent(html);
    await page.setViewportSize({ width: 110, height: 50 });

    await page.keyboard.down('Tab');

    await expect(page.locator('body')).toHaveScreenshot();

    await page.locator('mg-tooltip').evaluate((elm: HTMLMgTooltipElement) => {
      elm.message = 'Joker is here';
    });

    await expect(page.locator('body')).toHaveScreenshot();
  });

  test('Should position tooltip where it have enough place', async ({ page }) => {
    page.addStyleTag({ content: '.e2e-screenshot{display:block}' });
    const html = createHTML(
      {
        message: 'Batman tooltip',
        display: true,
      },
      '<mg-icon icon="user"></mg-icon>',
    );
    await page.setContent(html);

    await page.addStyleTag({ content: 'mg-icon{position:fixed;left:0;bottom:0}' });
    await page.setViewportSize({ width: 150, height: 50 });

    await expect(page.locator('body')).toHaveScreenshot();
  });

  test('Should display long tooltip with max width', async ({ page }) => {
    const html = createHTML(
      {
        message: 'my very long content should return to line because of the max-width set to 400px in the design specification',
        display: true,
      },
      '<mg-icon icon="user"></mg-icon>',
    );
    await page.setContent(html);
    await page.setViewportSize({ width: 500, height: 100 });

    await expect(page.locator('body')).toHaveScreenshot();
  });

  test('Should keep tooltip center when update "message" prop', async ({ page }) => {
    page.addStyleTag({ content: '.e2e-screenshot{display:block}mg-icon{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}' });
    const html = createHTML(
      {
        message: 'short tooltip',
        display: true,
      },
      '<mg-icon icon="user"></mg-icon>',
    );
    await page.setContent(html);
    await page.setViewportSize({ width: 400, height: 400 });

    await expect(page.locator('body')).toHaveScreenshot();

    await page.locator('mg-tooltip').evaluate((elm: HTMLMgTooltipElement) => {
      elm.message = 'my very long content should return to line because of the max-width set to 400px in the design specification';
    });

    await expect(page.locator('body')).toHaveScreenshot();
  });

  test('Should display content with the specified style', async ({ page }) => {
    const tooltipHtml = createHTML(
      {
        message: 'short tooltip',
        display: true,
      },
      '<mg-icon icon="info-circle"></mg-icon>',
    );
    await page.setContent(`<h1>Title${tooltipHtml}</h1>`);
    await page.setViewportSize({ width: 110, height: 90 });

    await expect(page.locator('body')).toHaveScreenshot();
  });
});
