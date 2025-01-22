import { newE2EPage } from '@stencil/core/testing';

describe('mg-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mg-table></mg-table>');

    const element = await page.find('mg-table');
    expect(element).toHaveClass('hydrated');
  });
});
