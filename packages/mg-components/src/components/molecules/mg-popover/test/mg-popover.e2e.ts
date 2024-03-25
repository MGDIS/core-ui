import { expect } from '@playwright/test';
import { test } from '../../../../utils/playwright.fixture';
import { renderAttributes } from '@mgdis/playwright-helpers';

const mgButtonVerticalCenter = 'mg-button{position:fixed;left:50%;transform:translateX(-50%)}';

const createHTML = (args, slot): string => `<mg-popover ${renderAttributes(args)}>${slot}</mg-popover>`;

test.describe('mg-popover', () => {
  [
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
  ].forEach(placement => {
    test.describe(`placement ${placement}`, () => {
      [true, false].forEach(arrowHide => {
        test(`Should render, case arrowHide: ${arrowHide}`, async ({ page }) => {
          const html = createHTML(
            { placement, arrowHide },
            `<mg-button>Button</mg-button>
            <h2 slot="title">Blu bli blo bla</h2>
            <p slot="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>`,
          );
          await page.setContent(html);

          page.setViewportSize({ height: 900, width: 900 });

          await page.addStyleTag({ content: 'mg-button{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}' });

          const mgPopover = page.locator('mg-popover');
          const mgButton = page.locator('mg-button');
          const mgPopoverContent = page.locator('mg-popover-content');

          await mgPopover.waitFor();

          // display popover on click on slotted element
          await mgButton.click();

          await mgPopoverContent.waitFor();

          expect(await mgPopoverContent.getAttribute('data-show')).toEqual('');

          await expect(page.locator('body')).toHaveScreenshot();

          // hide popover on click on slotted element
          await mgButton.click();

          expect(await mgPopoverContent.getAttribute('data-show')).toEqual(null);

          // display popover on keyboad click event on slotted element
          await page.keyboard.down('Tab');
          await page.keyboard.down('Tab');
          await page.keyboard.down('Enter');

          await mgPopoverContent.waitFor();
          expect(await mgPopoverContent.getAttribute('data-show')).toEqual('');

          // hide popover on keyboad escape key
          await page.keyboard.down('Escape');

          expect(await mgPopoverContent.getAttribute('data-show')).toEqual(null);
        });
      });
    });
  });

  [
    '',
    '<h2 slot="title">Titre un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long</h2>',
  ].forEach(title => {
    test(`Should render with title ${title} and close button`, async ({ page }) => {
      const html = createHTML(
        { display: true, closeButton: true },
        `<mg-button>Button</mg-button>
        ${title}
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>`,
      );
      await page.setContent(html);

      page.setViewportSize({ width: 400, height: 350 });

      await page.locator('mg-popover.hydrated').waitFor();

      await expect(page.locator('body')).toHaveScreenshot();
    });
  });

  test.describe('re-position', () => {
    ['title', 'content'].forEach(slot => {
      test(`should re-position when slot ${slot} size change`, async ({ page }) => {
        const tagName = slot === 'title' ? 'h2' : 'p';
        const html = createHTML(
          { placement: 'bottom-start' },
          `<mg-button>Button</mg-button>
          <${tagName} slot="${slot}">
            Lorem ipsum
          </${tagName}>`,
        );
        await page.setContent(html);
        await page.setViewportSize({ width: 400, height: 130 });
        await page.addStyleTag({ content: mgButtonVerticalCenter });

        await page.locator('mg-button').click();
        await page.locator('mg-popover-content').waitFor();

        await expect(page.locator('body')).toHaveScreenshot();

        await page.locator(`mg-popover-content [slot="${slot}"]`).evaluate(elm => {
          elm.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
        });

        await expect(page.locator('body')).toHaveScreenshot();
      });
    });

    test('should re-position when interactive element size change', async ({ page }) => {
      const html = createHTML(
        { placement: 'bottom-start' },
        `<mg-button>Button</mg-button>
        <p slot="content">
          Lorem ipsum
        <p>`,
      );
      await page.setContent(html);
      await page.addStyleTag({ content: mgButtonVerticalCenter });
      await page.setViewportSize({ width: 400, height: 130 });

      await page.locator('mg-button').click();

      await page.locator('mg-popover-content').waitFor();

      await expect(page.locator('body')).toHaveScreenshot();

      await page.locator(`mg-button`).evaluate(elm => {
        elm.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
      });

      await expect(page.locator('body')).toHaveScreenshot();
    });
  });

  test(`should position popover where it have enough place`, async ({ page }) => {
    const html = createHTML(
      {},
      `<mg-button>Button</mg-button>
      <p slot="content">
        Lorem ipsum
      </p>`,
    );
    await page.setContent(html);
    await page.setViewportSize({ width: 400, height: 100 });
    await page.addStyleTag({ content: 'mg-button{position:fixed;left:0;bottom:0}' });

    await page.locator('mg-button').click();
    await page.locator('mg-popover-content').waitFor();

    await expect(page.locator('body')).toHaveScreenshot();
  });

  test.describe('style', () => {
    test('Should render with child mg-card', async ({ page }) => {
      const html = createHTML(
        { closeButton: true, display: true },
        `<mg-button>Button</mg-button>
        <mg-card slot="content">
          My custom card
        </mg-card>`,
      );
      await page.setContent(html);
      await page.setViewportSize({ width: 150, height: 180 });
      await page.addStyleTag({
        content: `mg-popover:has(mg-card){--mg-popover-background-color:var(--color-danger)}`,
      });

      await page.locator('mg-popover.hydrated').waitFor();

      await expect(page.locator('body')).toHaveScreenshot();
    });

    ['content', 'title'].forEach(slot => {
      test(`Should render with --mg-popover-max-width, slot ${slot}`, async ({ page }) => {
        const html = createHTML(
          { closeButton: true, display: true },
          `<mg-button>Button</mg-button>
          <h2 slot="${slot}">Titre un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long</h2>`,
        );
        await page.setContent(html);
        await page.setViewportSize({ width: 300, height: 300 });

        await page.addStyleTag({
          content: `mg-popover{--mg-popover-max-width:10rem}`,
        });

        await page.locator('mg-popover.hydrated').waitFor();

        await expect(page.locator('body')).toHaveScreenshot();
      });
    });
  });
});
