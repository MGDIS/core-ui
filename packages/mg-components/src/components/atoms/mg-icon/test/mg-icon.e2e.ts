import { createPage } from '../../../../utils/stencil.e2e.test.utils';
import { renderAttributes } from '../../../../utils/e2e.test.utils';
import { MgIcon } from '../mg-icon';
import { icons, sizes, variantStyles, variants } from '../mg-icon.conf';

const getIconWidth = (size: MgIcon['size']): number => {
  switch (size) {
    case 'small':
      return 12;
    case 'medium':
      return 20;
    case 'large':
      return 24;
    case 'extra-large':
      return 32;
    default:
      return 16;
  }
};

const style = `<style>[variant='app']{ --mg-color-app-h: 250; }</style>`;

describe('mg-icon', () => {
  test('renders icons', async () => {
    const html = Object.keys(icons)
      .map(icon => `<mg-icon icon="${icon}"></mg-icon>`)
      .join('');
    const page = await createPage(html);

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test('renders sizes', async () => {
    const html = sizes.map(size => `<mg-icon ${renderAttributes({ icon: 'thumb-up', size })}></mg-icon>`).join('');
    const page = await createPage(html);

    await page.setViewport({ width: 120, height: getIconWidth('extra-large') });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });

  test.each(variantStyles)('renders variants, with variantStyle %s', async variantStyle => {
    let width = 0;
    const variantStyleIsIcon = variantStyle !== 'icon';

    const html = variants
      .map(variant =>
        sizes
          .map(size => {
            width += variantStyleIsIcon ? getIconWidth(size) * 2 : getIconWidth(size);
            return `<mg-icon ${renderAttributes({ icon: 'check-circle', variant: variant, variantStyle, size })}></mg-icon>`;
          })
          .join(''),
      )
      .join('');

    const page = await createPage(html + style);

    await page.setViewport({ width, height: variantStyleIsIcon ? getIconWidth('extra-large') * 2 : getIconWidth('extra-large') });

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
