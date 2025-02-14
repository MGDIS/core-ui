import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgDetails } from '../mg-details';

const getPage = args =>
  newSpecPage({
    components: [MgDetails],
    template: () => (
      <mg-details {...args}>
        {args.slotSummary ? (
          args.slotSummary
        ) : (
          <span slot="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
        )}
        <p slot="details">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </mg-details>
    ),
  });

describe('mg-details', () => {
  test.each([
    { toggleClosed: 'Show details', toggleOpened: 'Hide details' },
    { toggleClosed: 'Show details', toggleOpened: 'Hide details', expanded: true },
    { toggleClosed: 'Show details', toggleOpened: 'Hide details', hideSummary: true },
  ])('with args %s', async args => {
    const { root } = await getPage(args);
    expect(root).toMatchSnapshot();
  });

  test.each([
    {},
    { toggleClosed: 'Show details' },
    { toggleOpened: 'Hide details' },
    { toggleClosed: ' ', toggleOpened: 'Hide details' },
    { toggleClosed: 'Show details', toggleOpened: ' ' },
  ])('Should throw error when missing toggle messages: %s', async args => {
    expect.assertions(1);
    try {
      await getPage(args);
    } catch (err) {
      expect(err.message).toEqual(
        `<mg-details> prop "toggleClosed" and "toggleOpened" is required and must be a valid string. Passed value: "toggleClosed='${args.toggleClosed}'" and "toggleOpened='${args.toggleOpened}'".`,
      );
    }
  });

  test('Should toggle details on click', async () => {
    const page = await getPage({ toggleClosed: 'Show details', toggleOpened: 'Hide details' });

    const element = page.doc.querySelector('mg-details');
    const summary = element.shadowRoot.querySelector('summary');

    jest.spyOn(page.rootInstance.expandedChange, 'emit');

    summary.dispatchEvent(new CustomEvent('toggle', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.expandedChange.emit).toHaveBeenCalledTimes(1);
  });

  test.each([
    <span slot="summary">
      <mg-button>button</mg-button>
    </span>,
    <mg-button slot="summary">button</mg-button>,
  ])('Should prevent toggle details toggled on mg-button click %s', async slotSummary => {
    const page = await getPage({ toggleClosed: 'Show details', toggleOpened: 'Hide details', slotSummary });

    const element = page.doc.querySelector('mg-details');
    const mgButton = element.querySelector('mg-button');

    jest.spyOn(page.rootInstance.expandedChange, 'emit');

    mgButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.expandedChange.emit).toHaveBeenCalledTimes(0);
    expect(page.rootInstance.expanded).toEqual(false);
  });
});
