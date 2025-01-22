import { newSpecPage } from '@stencil/core/testing';
import { MgTable } from '../mg-table';

describe('mg-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MgTable],
      html: `<mg-table></mg-table>`,
    });
    expect(page.root).toEqualHtml(`
      <mg-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mg-table>
    `);
  });
});
