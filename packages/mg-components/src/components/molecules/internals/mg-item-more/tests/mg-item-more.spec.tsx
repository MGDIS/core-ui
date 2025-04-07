import { h } from '@stencil/core/internal';
import { newSpecPage } from '@stencil/core/testing';
import { setupMutationObserverMock, setupResizeObserverMock, toString } from '@mgdis/stencil-helpers';
import { MgItemMore } from '../mg-item-more';
import { forcePopoverId, mockWindowFrames } from '../../../../../utils/unit.test.utils';
import { MgMenu } from '../../../menus/mg-menu/mg-menu';
import { MgMenuItem } from '../../../menus/mg-menu-item/mg-menu-item';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { MgPopoverContent } from '../../../mg-popover/mg-popover-content/mg-popover-content';

mockWindowFrames();

const udpateItemMorePopoverId = page => {
  const moreMenuItem = page.doc.querySelector('mg-item-more').shadowRoot.querySelector('mg-menu-item');
  forcePopoverId(moreMenuItem, `mg-popover-test_more-item`);
};

let id;
/**
 * set id if param is true
 * @param hasId - true if need a generated id
 * @returns genereted id
 */
const setId = (hasId: boolean): string => (hasId ? `my-id-${id++}` : undefined);

const getPage = async args => {
  const page = await newSpecPage({
    components: [MgMenu, MgMenuItem, MgItemMore, MgPopover, MgPopoverContent],
    template: () => (
      <mg-menu {...args}>
        <mg-menu-item href={args.isHref ? '#' : undefined} id={setId(args.hasId)} identifier="identifier-1">
          <span slot="label">Batman</span>
          {args.submenu && (
            <mg-menu label="submenu" direction="vertical">
              <mg-menu-item href="href" identifier="identifier-1-1">
                <span slot="label">Batman child</span>
              </mg-menu-item>
              <mg-menu-item identifier="identifier-1-2">
                <span slot="label">Batman child</span>
              </mg-menu-item>
            </mg-menu>
          )}
        </mg-menu-item>
        <mg-menu-item id={setId(args.hasId)} identifier="identifier-2">
          <span slot="label">Joker</span>
        </mg-menu-item>
        <mg-menu-item id={setId(args.hasId)} identifier="identifier-3">
          <span slot="label">Bane</span>
        </mg-menu-item>
      </mg-menu>
    ),
  });

  // flush main menu [componentDidLoad setTimeout]
  jest.runAllTimers();

  // render mg-item-more element
  await page.waitForChanges();

  // flush mg-item-more [componentDidLoad setTimeout]
  jest.runOnlyPendingTimers();

  // render mg-item-more [componentDidUpdate] state update
  await page.waitForChanges();

  // flush data-overflow-more > mg-menu mg-menu-item[componentDidLoad setTimeout]
  jest.runOnlyPendingTimers();

  await page.waitForChanges();

  jest.runOnlyPendingTimers();

  udpateItemMorePopoverId(page);

  return page;
};

describe('mg-item-more', () => {
  beforeEach(() => {
    id = 1;
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupResizeObserverMock({
      observe: () => null,
      disconnect: () => null,
    });
    setupMutationObserverMock({
      disconnect: () => null,
      observe: () => null,
      takeRecords: () => null,
    });
  });
  afterEach(() => jest.runOnlyPendingTimers());

  describe('render', () => {
    test.each([undefined, { icon: { icon: 'user' } }, { slotlabel: { display: true, label: 'more batman menu' } }, { size: 'large' }, { hasId: true }, { submenu: true }])(
      'should manage resize with observer, case %s',
      async args => {
        const page = await getPage({ label: 'batman', ...args });

        expect(page.root).toMatchSnapshot();
      },
    );
  });

  describe('errors', () => {
    test.each([
      { props: { itemmore: { size: {} } }, error: `<mg-item-more> prop "size" must match MgItemMore[\'size\'] type. Passed value: ${toString({})}.` },
      { props: { itemmore: { icon: '' } }, error: `<mg-item-more> prop "icon" must match MgItemMore[\'icon\'] type. Passed value: .` },
      {
        props: { itemmore: { icon: { icon: undefined } } },
        error: `<mg-item-more> prop "icon" must match MgItemMore[\'icon\'] type. Passed value: ${toString({ icon: undefined })}.`,
      },
      { props: { itemmore: { slotlabel: {} } }, error: `<mg-item-more> prop "slotlabel" must match MgItemMore[\'slotlabel\'] type. Passed value: ${toString({})}.` },
      {
        props: { itemmore: { slotlabel: { label: undefined } } },
        error: `<mg-item-more> prop "slotlabel" must match MgItemMore[\'slotlabel\'] type. Passed value: ${toString({ label: undefined })}.`,
      },
      {
        props: { itemmore: { slotlabel: { display: '' } } },
        error: `<mg-item-more> prop "slotlabel" must match MgItemMore[\'slotlabel\'] type. Passed value: ${toString({ display: '' })}.`,
      },
    ])('should throw an error, case %s', async ({ props, error }) => {
      expect.assertions(1);

      try {
        await getPage({ label: 'batman', ...props });
      } catch (err) {
        expect(err.message).toEqual(error);
      }
    });
  });

  test('Should fire disconnect callback', async () => {
    const page = await getPage({ label: 'batman' });

    expect(page.root).toMatchSnapshot();

    page.doc.querySelector('mg-item-more').remove();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
