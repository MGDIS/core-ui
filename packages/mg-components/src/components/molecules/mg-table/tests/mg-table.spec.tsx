import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTable } from '../mg-table';
import { sizes } from '../mg-table.conf';
import { toString } from '@mgdis/core-ui-helpers/dist/stencil';
import messages from '../../../../locales/en/messages.json';

const getPage = (args, caption?) =>
  newSpecPage({
    components: [MgTable],
    template: () => (
      <mg-table {...args}>
        <table>
          {caption}
          <thead>
            <tr>
              <th>Name</th>
              <th>Birthday</th>
              <th>Age</th>
              <th>Role</th>
              <th>Test signature</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Simon</th>
              <td data-sort="1982-06-02">02/06/1982</td>
              <td>42</td>
              <td>Archi</td>
              <td>Blu / Daron Crew</td>
            </tr>
            <tr>
              <th>Nico</th>
              <td data-sort="1990-10-31">31/10/1990</td>
              <td>35</td>
              <td>Dev front-end</td>
              <td>DC Comics (Batman, Jocker, etc.)</td>
            </tr>
            <tr>
              <th>Guirec</th>
              <td data-sort="1985-12-30">30/12/1985</td>
              <td>39</td>
              <td>Dev front-end</td>
              <td>Pat'Patrouille</td>
            </tr>
          </tbody>
        </table>
      </mg-table>
    ),
  });

describe('mg-table', () => {
  test.each([
    {},
    { size: 'small' },
    { size: 'large' },
    { size: 'xlarge' },
    { fullWidth: true },
    { columns: { 2: { align: 'center' } } },
    { columns: { 2: { datatype: 'numeric' } } },
  ])('Should render with args %o:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' ', 'blu'])('Should not render with invalid size property: %s', async size => {
    expect.assertions(1);
    try {
      await getPage({ size });
    } catch (err) {
      expect(err.message).toEqual(`<mg-table> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${size}.`);
    }
  });

  test.each([
    '',
    ' ',
    'blu',
    ['center', 'left'],
    { a: 'left' },
    { 2: 'blu' },
    { 2: ['blu'] },
    { 2: { a: 'blu' } },
    { 2: { align: 'blu' } },
    { 2: { sortable: 'blu' } },
    { 2: { datatype: 'blu' } },
    { 2: { align: 'left', a: 'blu' } },
  ])('Should not render with invalid columns property: %o', async columns => {
    expect.assertions(1);
    try {
      await getPage({ columns });
    } catch (err) {
      expect(err.message).toEqual(`<mg-table> prop "columns" must be a ColumnsType object. Passed value: ${toString(columns)}.`);
    }
  });

  test('Should update mg-table classes on props change', async () => {
    const page = await getPage({ size: 'small' });
    const mgTable = page.doc.querySelector('mg-table');

    expect(page.root).toMatchSnapshot();

    // Change size
    mgTable.size = 'xlarge';
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    // Change size
    mgTable.fullWidth = true;
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  test('Should link table to caption', async () => {
    const caption = <caption id="blu">Test caption</caption>;
    const { root } = await getPage({}, caption);
    expect(root).toMatchSnapshot();
  });

  test('Should add caption id if not set', async () => {
    const caption = <caption>Test caption</caption>;
    const page = await getPage({}, caption);

    // Get the caption element from the document
    const captionElement = page.doc.querySelector('mg-table').shadowRoot.querySelector('caption');

    // Ensure an id has been added
    expect(captionElement).toHaveAttribute('id');
    const generatedId = captionElement.getAttribute('id');

    // Define the expected ID format
    const idRegex = /^mg-c-table-caption-[a-z0-9]{10}$/;
    expect(generatedId).toMatch(idRegex);

    // Ensure the wrapper div references the caption id
    const tableWrapper = page.doc.querySelector('mg-table').shadowRoot.querySelector('div');
    expect(tableWrapper).toHaveAttribute('aria-labelledby', generatedId);
  });

  describe('Sort', () => {
    test('Should sort table on column click', async () => {
      const page = await getPage(
        { columns: { 1: { sortable: true }, 2: { datatype: 'date', sortable: true }, 3: { datatype: 'numeric', sortable: true } } },
        <caption id="blu">Sortable table</caption>,
      );
      const sortButtons = page.doc.querySelector('mg-table').shadowRoot.querySelectorAll('th button');

      // Sort is undefined
      expect(page.root).toMatchSnapshot();

      for (const sortButton of Array.from(sortButtons)) {
        // Click on the sortable column
        sortButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
        // Sort is ascending
        expect(page.root).toMatchSnapshot();

        // Click on the sortable column
        sortButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
        // Sort is descending
        expect(page.root).toMatchSnapshot();

        // Click on the sortable column
        sortButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
        // Sort is none
        expect(page.root).toMatchSnapshot();
      }
    });

    test('Should add caption if not set', async () => {
      const page = await getPage({ columns: { 1: { sortable: true } } });

      // Get the caption element from the document
      const captionElement = page.doc.querySelector('mg-table').shadowRoot.querySelector('caption');

      // Ensure caption is added
      expect(captionElement.innerHTML).toEqual(messages.table.sortableCaption);
    });
  });
});
