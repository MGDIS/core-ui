import { PageType, describe, describeEach, expect, setPageContent, test, testEach } from '../../../../utils/playwright.e2e.test.utils';
import { variants } from '../mg-message.conf';

const TIMEOUT = 1000;

const getContent = (contentSize: string, withAction: boolean) => {
  let content = '<strong>Strong</strong> content!';
  let actions = '';
  if (contentSize === 'long') {
    content =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  }
  if (withAction) {
    actions = `<div slot="actions" class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>`;
  }
  return `<p>${content}</p>${actions}`;
};

describe('mg-message', () => {
  describeEach(variants)('Should render with variant %s', async variant => {
    testEach([
      { contentSize: 'short', withAction: false, closeButton: false },
      { contentSize: 'long', withAction: false, closeButton: false },
      { contentSize: 'short', withAction: true, closeButton: false },
      { contentSize: 'long', withAction: true, closeButton: false },
      { contentSize: 'short', withAction: false, closeButton: true },
      { contentSize: 'long', withAction: false, closeButton: true },
    ])('with props %s', async (page: PageType, { contentSize, withAction, closeButton }: { contentSize: string; withAction: boolean; closeButton: boolean }) => {
      await setPageContent(page, `<mg-message variant="${variant}" close-button="${closeButton}">${getContent(contentSize, withAction)}</mg-message>`);

      await page.locator('mg-message.hydrated').waitFor({ timeout: TIMEOUT });

      await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
    });
  });

  test('Should render with child mg-card', async ({ page }) => {
    await setPageContent(
      page,
      `<mg-message class="custom-message-card">
        <mg-card>child card</mg-card>
      </mg-message>
      <style>
        .custom-message-card {
          --mg-c-card-background: hsl(var(--mg-b-color-danger));
        }
      </style>`,
    );

    await page.locator('mg-message.hydrated').waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });

  test('Should hide message on close button click', async ({ page }) => {
    await setPageContent(page, `<mg-message close-button><p>Blu</p></mg-message>`);

    const mgMessage = page.locator('mg-message.hydrated');

    expect(await mgMessage.getAttribute('hidden')).toBeNull();

    const mgButton = mgMessage.locator('mg-button');
    await mgButton.click();

    const mgMessageHideProp = await mgMessage.evaluate(e => (e as HTMLMgMessageElement).hidden);

    expect(mgMessageHideProp).toEqual(true);

    await expect(mgMessage).not.toBeVisible();
  });
});
