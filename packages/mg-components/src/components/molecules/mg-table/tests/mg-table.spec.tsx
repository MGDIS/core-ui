import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgTable } from '../mg-table';
import { sizes } from '../mg-table.conf';

const getPage = (args, caption?) =>
  newSpecPage({
    components: [MgTable],
    template: () => (
      <mg-table {...args}>
        <table>
          {caption}
          <thead>
            <tr>
              <th>Dev</th>
              <th>Role</th>
              <th>Test signature</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Simon</th>
              <td>Archi</td>
              <td>Blu / Daron Crew</td>
            </tr>
            <tr>
              <th>Nico</th>
              <td>Dev front-end</td>
              <td>DC Comics (Batman, Jocker, etc.)</td>
            </tr>
            <tr>
              <th>Guirec</th>
              <td>Dev front-end</td>
              <td>Pat'Patrouille</td>
            </tr>
          </tbody>
        </table>
      </mg-table>
    ),
  });

describe('mg-table', () => {
  test.each([{}, { size: 'small' }, { size: 'large' }, { size: 'xlarge' }, { fullWidth: true }])('Should render with args %o:', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each(['', ' '])('Should not render with invalid size property: %s', async size => {
    expect.assertions(1);
    try {
      await getPage({ size });
    } catch (err) {
      expect(err.message).toEqual(`<mg-table> prop "size" must be one of: ${sizes.join(', ')}. Passed value: ${size}.`);
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
});
