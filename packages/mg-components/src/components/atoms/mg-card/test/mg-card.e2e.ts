import { createPage } from '../../../../utils/stencil.e2e.test.utils';
import { renderAttributes } from '../../../../utils/e2e.test.utils';
import { variantStyles, variants } from '../mg-card.conf';

const style = `<style>.margin-y { margin: 1rem 0; } .d-block { display: block; } [variant='app'] { --mg-color-app-h: 250 }</style>`;

describe('mg-card', () => {
  test('Should render', async () => {
    const props = [undefined, ...variants.flatMap(variant => variantStyles.map(variantStyle => ({ variant, variantStyle })))];
    const html = [
      'short text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ]
      .map(slot => props.map(prop => `<mg-card class="margin-y d-block" ${renderAttributes(prop)}>${slot}</mg-card>`).join(''))
      .join('');

    const page = await createPage(html + style);

    const element = await page.find('mg-card');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('Should render with custom card', async () => {
    const html = [
      'short text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      '<mg-card>Content with child card.</mg-card>',
      '<mg-card class="custom-card--info">Content with child info card.</mg-card>',
    ]
      .map(slot => `<mg-card class="${slot.includes('</mg-card>') ? 'custom-card--danger' : ''} d-block margin-y">${slot}</mg-card>`)
      .join('');
    const page = await createPage(
      html + '<style>.custom-card--danger {--mg-card-background: hsl(var(--color-danger));} .custom-card--info {--mg-card-background: hsl(var(--color-info));}</style>' + style,
    );

    const element = await page.find('mg-card');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
