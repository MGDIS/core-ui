import { setPageContent, expect, describe, describeEach, testEach, PageType, test } from '../../../../utils/playwright.e2e.test.utils';
import { renderAttributes } from '../../../../utils/e2e.test.utils';

const TIMEOUT = 1000;

const mgButtonVerticalCenter = 'mg-button{position:fixed;left:50%;transform:translateX(-50%)}';

describe('mg-popover', () => {
  describeEach([
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
  ])('placement %s', placement => {
    testEach([true, false])('Should render, case hide arrow %s', async (page: PageType, arrowHide) => {
      await setPageContent(
        page,
        `<mg-popover ${renderAttributes({ placement, arrowHide })}>
        <mg-button>Button</mg-button>
        <h2 slot="title">Blu bli blo bla</h2>
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        </mg-popover>`,
        { height: 900, width: 900 },
      );

      await page.addStyleTag({ content: 'mg-button{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%)}</style>' });

      const mgPopover = page.locator('mg-popover');
      const mgButton = page.locator('mg-button');
      const mgPopoverContent = page.locator('mg-popover-content');

      await mgPopover.waitFor({ timeout: TIMEOUT });

      // display popover on click on slotted element
      await mgButton.click();

      await mgPopoverContent.waitFor({ timeout: TIMEOUT });

      expect(await mgPopoverContent.getAttribute('data-show')).toEqual('');

      await expect(page.locator('body')).toHaveScreenshot();

      // hide popover on click on slotted element
      await mgButton.click();

      expect(await mgPopoverContent.getAttribute('data-show')).toEqual(null);

      // display popover on keyboad click event on slotted element
      await page.keyboard.down('Tab');
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');

      await mgPopoverContent.waitFor({ timeout: TIMEOUT });
      expect(await mgPopoverContent.getAttribute('data-show')).toEqual('');

      // hide popover on keyboad escape key
      await page.keyboard.down('Escape');

      expect(await mgPopoverContent.getAttribute('data-show')).toEqual(null);
    });
  });

  describeEach([
    '',
    '<h2 slot="title">Titre un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long</h2>',
  ])('with or without title %s', title => {
    test('Should render with close button', async ({ page }) => {
      await setPageContent(
        page,
        `<mg-popover display close-button>
        <mg-button>Button</mg-button>
        ${title}
        <p slot="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        </mg-popover>`,
        { width: 400, height: 350 },
      );

      await page.locator('mg-popover.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('body')).toHaveScreenshot();
    });
  });

  describe('re-position', () => {
    testEach(['title', 'content'])('should re-position when slot %s size change', async (page: PageType, slot) => {
      const tagName = slot === 'title' ? 'h2' : 'p';
      await setPageContent(
        page,
        `<mg-popover ${renderAttributes({ placement: 'bottom-start' })}>
        <mg-button>Button</mg-button>
        <${tagName} slot="${slot}">
          Lorem ipsum
        </${tagName}>
        </mg-popover>`,
        { width: 400, height: 130 },
      );

      await page.addStyleTag({ content: mgButtonVerticalCenter });

      await page.locator('mg-button').click();
      await page.locator('mg-popover-content').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('body')).toHaveScreenshot();

      await page.$eval(`mg-popover-content [slot="${slot}"]`, el => {
        el.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
      });

      await expect(page.locator('body')).toHaveScreenshot();
    });

    test('Should re-position when interactive element size change', async ({ page }) => {
      await setPageContent(
        page,
        `<mg-popover ${renderAttributes({ placement: 'bottom-start' })}>
        <mg-button>Button</mg-button>
        <p slot="content">
          Lorem ipsum
        <p>
        </mg-popover>`,
        { width: 400, height: 130 },
      );

      await page.addStyleTag({ content: mgButtonVerticalCenter });

      await page.locator('mg-button').click();

      await page.locator('mg-popover-content').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('body')).toHaveScreenshot();

      await page.$eval(`mg-button`, el => {
        el.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
      });

      await expect(page.locator('body')).toHaveScreenshot();
    });
  });

  test(`should position popover where it have enough place`, async ({ page }) => {
    await setPageContent(
      page,
      `<mg-popover>
      <mg-button>Button</mg-button>
      <p slot="content">
        Lorem ipsum
      </p>
      </mg-popover>`,
      { width: 400, height: 100 },
    );

    await page.addStyleTag({ content: 'mg-button{position:fixed;left:0;bottom:0}' });

    await page.locator('mg-button').click();
    await page.locator('mg-popover-content').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('body')).toHaveScreenshot();
  });

  describe('style', () => {
    test('Should render with child mg-card', async ({ page }) => {
      await setPageContent(
        page,
        `<mg-popover display close-button class="custom-popover-card">
        <mg-button>Button</mg-button>
        <mg-card slot="content">
          My custom card
        </mg-card>
        </mg-popover>
        `,
        { width: 150, height: 180 },
      );

      await page.addStyleTag({
        content: `
    .custom-popover-card {
      --mg-popover-background-color: var(--color-danger);
    }`,
      });

      await page.locator('mg-popover.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('body')).toHaveScreenshot();
    });

    testEach(['content', 'title'])('Should render with --mg-popover-max-width %s', async (page: PageType, slot) => {
      await setPageContent(
        page,
        `<mg-popover display close-button class="custom-popover">
        <mg-button>Button</mg-button>
        <h2 slot="${slot}">Titre un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long un peu plus long</h2>
        </mg-popover>
        `,
        { width: 300, height: 300 },
      );

      await page.addStyleTag({
        content: `
      .custom-popover {
        --mg-popover-max-width: 10rem;
      }`,
      });

      await page.locator('mg-popover.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('body')).toHaveScreenshot();
    });
  });
});
