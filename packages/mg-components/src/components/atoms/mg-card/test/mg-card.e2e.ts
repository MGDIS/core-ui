import { PageType, describe, describeEach, expect, setPageContent, testEach } from '../../../../utils/playwright.e2e.test.utils';
import { variantStyles, variants } from '../mg-card.conf';

const TIMEOUT = 1000;

const style = `<style>.margin-y { margin: 1rem 0; } .d-block { display: block; } [variant='app'] { --mg-color-app-h: 250 }</style>`;

describe('mg-card', () => {
  describeEach(variants)('Should render with variant %s', async variant => {
    describeEach(variantStyles)('variant style %s', async variantStyle => {
      testEach([
        'short text',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      ])('slot %s', async (page: PageType, slot: string) => {
        await setPageContent(page, `<mg-card class="margin-y d-block" variant="${variant}" variant-style="${variantStyle}">${slot}</mg-card>${style}`);

        await page.locator('mg-card.hydrated').waitFor({ timeout: TIMEOUT });

        await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
      });
    });
  });

  testEach([
    'short text',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    '<mg-card>Content with child card.</mg-card>',
    '<mg-card class="custom-card--info">Content with child info card.</mg-card>',
  ])('Should render with slot %s', async (page: PageType, slot: string) => {
    await setPageContent(
      page,
      `<mg-card class="${
        slot.includes('</mg-card>') ? 'custom-card--danger' : ''
      } d-block margin-y">${slot}</mg-card><style>.custom-card--danger {--mg-card-background: hsl(var(--color-danger));} .custom-card--info {--mg-card-background: hsl(var(--color-info));}</style>${style}`,
    );

    await page.locator('mg-card.hydrated').first().waitFor({ timeout: TIMEOUT });

    await expect(page.locator('.e2e-screenshot')).toHaveScreenshot();
  });
});
