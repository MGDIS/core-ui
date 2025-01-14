import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMenu } from '../mg-menu';
import { Direction, sizes } from '../mg-menu.conf';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { setupMutationObserverMock, setupResizeObserverMock } from '@mgdis/stencil-helpers';
import { forcePopoverId, mockWindowFrames } from '../../../../../utils/unit.test.utils';
import { MgPopoverContent } from '../../../mg-popover/mg-popover-content/mg-popover-content';
import { MgItemMore } from '../../../internals/mg-item-more/mg-item-more';

mockWindowFrames();

let id;
/**
 * set id if param is true
 * @param hasId - true if need a generated id
 * @returns genereted id
 */
const setId = (hasId: boolean): string => (hasId ? `test-${id++}` : undefined);

const getPage = async (args, options = { submenu: true, itemMore: false, siblingMenu: false }) => {
  const components: unknown[] = [MgMenu, MgMenuItem, MgPopover, MgPopoverContent];
  if (options.itemMore) components.push(MgItemMore);
  const page = await newSpecPage({
    components,
    template: () => [
      <mg-menu {...args}>
        <mg-menu-item id={setId(args.hasId)} identifier="identifier-1">
          <span slot="label">batman</span>
          {options.submenu && (
            <mg-menu label="batman - submenu" direction={Direction.VERTICAL}>
              <mg-menu-item identifier="identifier-1">
                <span slot="label">batman begins</span>
                <mg-menu label="batman begins - submenu" direction={Direction.VERTICAL}>
                  <mg-menu-item identifier="identifier-1">
                    <span slot="label">movie</span>
                  </mg-menu-item>
                </mg-menu>
              </mg-menu-item>
              <mg-menu-item identifier="identifier-2">
                <span slot="label">joker: the dark knight</span>
              </mg-menu-item>
              <mg-menu-item identifier="identifier-3">
                <span slot="label">bane: the dark knight rise</span>
              </mg-menu-item>
            </mg-menu>
          )}
        </mg-menu-item>
        <mg-menu-item id={setId(args.hasId)} identifier="identifier-2">
          <span slot="label">joker</span>
          {args.badge && <mg-badge value={1} label="bad guy"></mg-badge>}
          <div>
            <h2>This is a joker card</h2>
            <p>If you don't know the joker, you can watch the movie.</p>
          </div>
        </mg-menu-item>
        <mg-menu-item href="#bane" id={setId(args.hasId)} identifier="identifier-3">
          <span slot="label">bane</span>
        </mg-menu-item>
      </mg-menu>,
      options.siblingMenu && <mg-menu label='sibling menu'>
        <mg-menu-item identifier="identifier-1">
          <span slot="label">sibling item</span>
        </mg-menu-item>
      </mg-menu>
    ],
  });

  // flush mg-menu timeout and render
  jest.runOnlyPendingTimers();
  await page.waitForChanges();

  // flush mg-item-more timeout and render
  jest.runOnlyPendingTimers();
  await page.waitForChanges();

  // flush mg-item-more timeout and render
  jest.runOnlyPendingTimers();
  await page.waitForChanges();

  [page.doc, ...Array.from(page.doc.querySelectorAll('mg-menu')).map(el => el.shadowRoot)].forEach(el =>
    Array.from(el.querySelectorAll('mg-menu-item')).forEach((item, index) => {
      forcePopoverId(item, `mg-popover-test_${index}`);
    }),
  );

  jest.runOnlyPendingTimers();

  return page;
};

describe('mg-menu', () => {
  let fireMo = [];
  beforeEach(() => {
    id = 1;
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupResizeObserverMock({
      observe: function () {
        return null;
      },
      disconnect: function () {
        return null;
      },
    });
    setupMutationObserverMock({
      observe: function () {
        fireMo.push(this.cb);
      },
      disconnect: () => null,
      takeRecords: () => [],
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    fireMo = [];
  });

  describe('render', () => {
    test.each([{}, { direction: Direction.HORIZONTAL }, { direction: Direction.VERTICAL }, { itemmore: { icon: { icon: 'user' } } }])('with args %s', async args => {
      const { root } = await getPage({ label: 'batman menu', ...args });

      expect(root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    const baseProps = { label: 'batman menu' };
    test.each([
      { props: { direction: Direction.HORIZONTAL }, error: `<mg-menu> prop "label" is required. Passed value: undefined.` },
      { props: { ...baseProps, direction: 'test' }, error: `<mg-menu> prop "direction" must be one of: horizontal, vertical. Passed value: test.` },
      { props: { ...baseProps, direction: Direction.VERTICAL, itemmore: { icon: 'user' } }, error: `<mg-menu> prop "itemmore" must be paired with direction horizontal.` },
      { props: { ...baseProps, size: 'batman' }, error: `<mg-menu> prop "size" must be one of: ${sizes.join(', ')}. Passed value: batman.` },
    ])('Should throw error when props are invalid, case %s', async ({ props, error }) => {
      expect.assertions(1);

      try {
        await getPage(props);
      } catch (err) {
        expect(err.message).toEqual(error);
      }
    });
  });

  describe.each([Direction.HORIZONTAL, Direction.VERTICAL])('events', direction => {
    test.each(['click', 'focusin'])(`Should manage outside %s, case direction ${direction}`, async event => {
      const page = await getPage({ label: 'batman menu', direction }, {submenu: true, siblingMenu: true, itemMore: false});

      const firstItem: HTMLMgMenuItemElement = page.root.querySelector('[title="batman"]').closest('mg-menu-item');
      expect(firstItem.expanded).toBe(false);

      firstItem.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      firstItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();
      jest.runOnlyPendingTimers();

      expect(firstItem.expanded).toBe(true);

      if(event === 'focusin') {
        const batmanChildItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="batman begins"]').closest('mg-menu-item');
        batmanChildItem.dispatchEvent(new MouseEvent(event, { bubbles: true }));
        expect(firstItem.expanded).toBe(true);

        const jokerItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="joker"]').closest('mg-menu-item');
        jokerItem.dispatchEvent(new MouseEvent(event, { bubbles: true }));
        expect(firstItem.expanded).toBe(true);

        const siblingMenuItem = page.doc.querySelector('[title="sibling item"]').closest('mg-menu-item')
        siblingMenuItem.dispatchEvent(new MouseEvent(event, { bubbles: true }));
        expect(firstItem.expanded).toBe(direction === Direction.VERTICAL);

        if(direction === Direction.HORIZONTAL) {
          firstItem.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
          firstItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          await page.waitForChanges();
          jest.runOnlyPendingTimers();
        }
      }

      document.dispatchEvent(new MouseEvent(event, { bubbles: true }));
      await page.waitForChanges();

      expect(firstItem.expanded).toBe(direction === Direction.VERTICAL);
    });

    test.each(['click', 'focus'])(`should manage sibling menu-item expanded props in ${direction} menu, case %s event`, async event => {
      const page = await getPage({ label: 'batman menu', direction });
      // open batman item
      const batmanItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="batman"]').closest('mg-menu-item');
      expect(batmanItem.expanded).toBe(false);
      if (direction === Direction.HORIZONTAL) {
        expect(batmanItem.shadowRoot.querySelector('mg-popover')).not.toBe(null);
      }

      batmanItem.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      batmanItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(batmanItem.expanded).toBe(true);

      // open batman first child item
      const batmanChildItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="batman begins"]').closest('mg-menu-item');
      batmanChildItem.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      batmanChildItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(batmanItem.expanded).toBe(true);
      expect(batmanChildItem.expanded).toBe(true);

      // open joker item must close batman first child item
      const jokerItem: HTMLMgMenuItemElement = page.doc.querySelector('[title="joker"]').closest('mg-menu-item');
      jokerItem.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent(event, { bubbles: true }));
      jokerItem.dispatchEvent(new MouseEvent(event, { bubbles: true }));
      await page.waitForChanges();

      expect(batmanItem.expanded).toBe(false);
      expect(batmanChildItem.expanded).toBe(false);
      expect(jokerItem.expanded).toBe(event === 'click');
    });
  });

  describe.each([Direction.VERTICAL, Direction.HORIZONTAL])('MutationObserver %s', direction => {
    test.each([{ label: 'batman menu', direction }])('with args %s', async args => {
      const page = await getPage(args);

      const mutations = [[{ type: 'childList', removedNodes: [{ nodeName: 'MG-ITEM-MORE' }] }], [{ type: 'childList', removedNodes: [{ nodeName: 'MG-MENU-ITEM' }] }]];

      for await (const mutation of mutations) {
        fireMo[0](mutation);

        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      }
    });
  });

  describe.each([true, false])('mg-item-more, with submenu %s', submenu => {
    test('should update "itemmore" children direction', async () => {
      const page = await getPage({ label: 'batman menu' }, { submenu, itemMore: true, siblingMenu: false });

      page.doc.querySelector('mg-item-more').shadowRoot.querySelector('mg-menu').appendChild(page.doc.querySelector('mg-menu-item'))
      fireMo[0]({type: 'childList'})
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('should manage "itemmore" prop update', async () => {
      const page = await getPage({ label: 'batman menu' }, { submenu, itemMore: true, siblingMenu: false });

      page.doc.querySelector('mg-menu').itemmore = { icon: { icon: 'user' } };

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each(['click', 'focus'])('should manage "mg-item-more" event %s', async event => {
      const page = await getPage({ label: 'batman menu' }, { submenu, itemMore: true, siblingMenu: false });

      const mgItemMore = page.doc.querySelector('mg-item-more');
      const moreMenuItem = mgItemMore.shadowRoot.querySelector('mg-menu-item');

      mgItemMore.dispatchEvent(new CustomEvent('item-loaded', { bubbles: true }));

      await page.flushQueue();
      await page.waitForChanges();

      forcePopoverId(moreMenuItem, `mg-popover-test_more-item`);
      expect(page.root).toMatchSnapshot();

      moreMenuItem.shadowRoot.querySelector('button').dispatchEvent(new CustomEvent(event, { bubbles: true }));

      await page.waitForChanges();

      expect(moreMenuItem.expanded).toBe(event === 'click');
      expect(page.root).toMatchSnapshot();
    });
  });
});
