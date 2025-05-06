import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgBadge } from '../../../../atoms/mg-badge/mg-badge';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';
import { MgMenuItem } from '../mg-menu-item';
import { MgMenu } from '../../mg-menu/mg-menu';
import { Status, targets } from '../mg-menu-item.conf';
import { directions } from '../../mg-menu/mg-menu.conf';
import { MgPopover } from '../../../mg-popover/mg-popover';
import { setupMutationObserverMock, setupResizeObserverMock, toString } from '@mgdis/stencil-helpers';
import { forcePopoverId, mockWindowFrames } from '../../../../../utils/unit.test.utils';
import { MgPopoverContent } from '../../../mg-popover/mg-popover-content/mg-popover-content';

mockWindowFrames();

type SlotsType = HTMLElement | HTMLElement[];
type MenuArgs = Pick<MgMenu, 'label'> & Partial<Pick<MgMenu, 'direction' | 'itemmore' | 'size'>>;
type MenuItemArgs = Partial<Pick<MgMenuItem, 'identifier' | 'href' | 'target' | 'expanded' | 'status'>> & {
  label: string;
  metadata?: boolean;
  icon?: boolean;
  badge?: boolean;
  overflow?: boolean;
};

interface ITemplate<ArgsType, ElementType> {
  (args: ArgsType, slots?: SlotsType): ElementType;
}

const MenuTemplate: ITemplate<MenuArgs, HTMLMgMenuElement> = (args, slots) => <mg-menu {...args}>{slots}</mg-menu>;

const MenuItemTemplate: ITemplate<MenuItemArgs, HTMLMgMenuItemElement> = (args, slots) => (
  <mg-menu-item {...args} identifier={args.identifier === undefined ? 'identifier' : args.identifier} data-overflow-more={args.overflow}>
    {slots}
    {args.label && <span slot="label">{args.label}</span>}
    {args.metadata && <span slot="metadata">my metadata</span>}
    {args.icon && <mg-icon slot="image" icon="user"></mg-icon>}
    {args.badge && <mg-badge slot="information" label="badge label" value="1"></mg-badge>}
  </mg-menu-item>
);

const ChildMenuWithItemTemplate: ITemplate<MenuItemArgs, HTMLMgMenuElement> = (args, slots) => (
  <MenuTemplate label={'child menu'} direction={directions.VERTICAL}>
    <MenuItemTemplate {...args}>{slots}</MenuItemTemplate>
  </MenuTemplate>
);

const TwoMenuItemsTemplate: ITemplate<MenuItemArgs, HTMLMgMenuElement> = (args, slots) => (
  <DefaultTemplate {...args}>
    {slots}
    <MenuItemTemplate label="item 2"></MenuItemTemplate>
  </DefaultTemplate>
);

const DefaultTemplate: ITemplate<MenuItemArgs, HTMLMgMenuElement> = (args, slots) => (
  <MenuTemplate label="menu">
    <MenuItemTemplate {...args}>{slots}</MenuItemTemplate>
  </MenuTemplate>
);

const getPage = async template => {
  const page = await newSpecPage({
    components: [MgMenuItem, MgMenu, MgIcon, MgBadge, MgPopover, MgPopoverContent],
    template: () => template,
  });

  if (Boolean(page.rootInstance.itemLoaded?.emit)) page.rootInstance.itemLoaded.emit = jest.fn();

  jest.runAllTimers();
  await page.waitForChanges();

  [page.doc, ...Array.from(page.doc.querySelectorAll('mg-menu')).map(el => el.shadowRoot)].forEach(el =>
    Array.from(el.querySelectorAll('mg-menu-item')).forEach((item, index) => {
      forcePopoverId(item, `mg-popover-test_${index}`);
    }),
  );

  return page;
};

describe('mg-menu-item', () => {
  let fireMo = [];
  beforeEach(() => {
    fireMo = [];
    jest.useFakeTimers({ legacyFakeTimers: true });
    setupMutationObserverMock({
      observe: function () {
        fireMo.push(this.cb);
      },
      disconnect: function () {
        return null;
      },
      takeRecords: () => [],
    });
    setupResizeObserverMock({
      observe: () => null,
      disconnect: () => null,
    });
  });
  afterEach(() => {
    jest.clearAllTimers();
    fireMo = [];
  });
  describe('render', () => {
    test.each([
      { label: 'Batman' },
      { label: 'Batman', icon: true },
      { label: 'Batman', badge: true },
      { label: 'Batman', metadata: true },
      { label: 'Batman', href: '#link' },
      { label: 'Batman', href: '#link', target: '_blank' as MgMenuItem['target'] },
      { label: 'Batman', overflow: true },
    ])('with args %s', async args => {
      const { root } = await getPage(<DefaultTemplate {...args}></DefaultTemplate>);

      expect(root).toMatchSnapshot();
    });

    test.each([{ label: 'Batman' }, { label: 'Batman', icon: true }, { label: 'Batman', badge: true }, { label: 'Batman', metadata: true }, { label: 'Batman', href: '#link' }])(
      'with size large, %s',
      async args => {
        const { root } = await getPage(
          <MenuTemplate label="Batman" size="large">
            <MenuItemTemplate {...args}></MenuItemTemplate>
          </MenuTemplate>,
        );

        expect(root).toMatchSnapshot();
      },
    );

    test('with 2 menu-items, last items get style modifier', async () => {
      const { root } = await getPage(<TwoMenuItemsTemplate label="Batman"></TwoMenuItemsTemplate>);

      expect(root).toMatchSnapshot();
    });

    test.each([Status.ACTIVE, Status.DISABLED, Status.HIDDEN, Status.VISIBLE])('with status %s', async status => {
      const page = await getPage(<DefaultTemplate {...{ label: 'Batman', status }}></DefaultTemplate>);
      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.status = element.status === Status.ACTIVE ? Status.VISIBLE : Status.ACTIVE;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([undefined, true, false])('with expanded %s', async expanded => {
      const page = await getPage(<DefaultTemplate {...{ label: 'Batman', expanded }}></DefaultTemplate>);

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.expanded = !element.expanded;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([undefined, true, false])('with expanded and sub-menu %s', async expanded => {
      const page = await getPage(
        <DefaultTemplate {...{ label: 'Batman', expanded }}>
          <ChildMenuWithItemTemplate label="level 2 item"></ChildMenuWithItemTemplate>
        </DefaultTemplate>,
      );

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.expanded = !element.expanded;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('with vertical sub-menu', async () => {
      const page = await getPage(
        <DefaultTemplate label="Batman">
          <ChildMenuWithItemTemplate label="level 2 item">
            <ChildMenuWithItemTemplate label="level 3 item"></ChildMenuWithItemTemplate>
          </ChildMenuWithItemTemplate>
        </DefaultTemplate>,
      );

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.expanded = !element.expanded;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      // should increment data-level when direction change to "vertical"
      page.doc.querySelector('mg-menu').direction = directions.VERTICAL;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should update direction from "data-style-direction" attribute update', async () => {
      const page = await getPage(
        <DefaultTemplate label="Batman">
          <ChildMenuWithItemTemplate label="level 2 item"></ChildMenuWithItemTemplate>
        </DefaultTemplate>,
      );

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.setAttribute('data-style-direction', directions.VERTICAL);
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each(['', 'true', undefined])('Should update expanded from "data-has-focus" attributed update', async attr => {
      const page = await getPage(
        <DefaultTemplate label="Batman" expanded={!Boolean(attr)}>
          <ChildMenuWithItemTemplate label="level 2 item"></ChildMenuWithItemTemplate>
        </DefaultTemplate>,
      );

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.dataset.hasFocus = attr;
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([undefined, 'large'])('Should manage "data-overflow-more" attribute', async size => {
      const page = await getPage(
        <MenuTemplate label="menu" size={size as MgMenu['size']}>
          <MenuItemTemplate label="identifier-1" overflow={true}></MenuItemTemplate>
          <ChildMenuWithItemTemplate label="identifier-2"></ChildMenuWithItemTemplate>
        </MenuTemplate>,
      );

      jest.runOnlyPendingTimers();

      const element = page.doc.querySelector('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.setAttribute('data-style-direction', directions.VERTICAL);
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test('Should log an error with invalid "identifier" property', async () => {
      const identifier = '{{batman}}';
      const spy = jest.spyOn(console, 'error');
      await getPage(<DefaultTemplate identifier={identifier} label="Batman"></DefaultTemplate>);
      expect(spy).toHaveBeenCalledWith(`<mg-menu-item> prop "identifier" value is invalid. Passed value: ${identifier}.`);
    });

    test('Should throw an error when missing slot label', async () => {
      expect.assertions(1);

      try {
        await getPage(<DefaultTemplate label={undefined as string}></DefaultTemplate>);
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> slot "label" is required.');
      }
    });

    test('Should throw an error when missing slot label text content', async () => {
      expect.assertions(1);

      try {
        await getPage(<DefaultTemplate label={' '}></DefaultTemplate>);
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> slot "label" must have text content.');
      }
    });

    test('Should throw an error with expanded and sub-menu', async () => {
      expect.assertions(1);

      try {
        await getPage(
          <DefaultTemplate {...{ label: 'label 1', href: '#link' }}>
            <ChildMenuWithItemTemplate label="label 2"></ChildMenuWithItemTemplate>
          </DefaultTemplate>,
        );
      } catch (err) {
        expect(err.message).toBe('<mg-menu-item> prop "href" is unauthorizied when element is a parent.');
      }
    });

    test.each([' ', 'batman'])('Should throw an error with invalid target="%s"', async (target: MgMenuItem['target']) => {
      expect.assertions(1);

      try {
        await getPage(<DefaultTemplate {...{ label: 'label', href: '#', target }}></DefaultTemplate>);
      } catch (err) {
        expect(err.message).toBe(`<mg-link> prop "target" must be one of: ${targets.join(', ')}. Passed value: ${target}.`);
      }
    });

    test('Should throw an error with expanded type mismatch', async () => {
      expect.assertions(1);

      try {
        await getPage(<DefaultTemplate {...{ label: 'label', expanded: { name: 'batman' } as unknown as MgMenuItem['expanded'] }}></DefaultTemplate>);
      } catch (err) {
        expect(err.message).toBe(`<mg-menu-item> prop "expanded" must be a boolean. Passed value: ${toString({ name: 'batman' })}.`);
      }
    });
  });

  describe.each([
    expanded => <MenuItemTemplate {...{ label: 'Batman', expanded, href: '#' }}></MenuItemTemplate>,
    expanded => <DefaultTemplate {...{ label: 'Batman', expanded, href: '#' }}></DefaultTemplate>,
    expanded => (
      <DefaultTemplate {...{ label: 'Batman', expanded }}>
        <ChildMenuWithItemTemplate {...{ label: 'level 2 item', expanded, href: '#' }}></ChildMenuWithItemTemplate>
      </DefaultTemplate>
    ),
    expanded => (
      <DefaultTemplate {...{ label: 'Batman', expanded }}>
        <ChildMenuWithItemTemplate {...{ label: 'level 2 item', expanded }}>
          <ChildMenuWithItemTemplate {...{ label: 'level 3 item', expanded, href: '#' }}></ChildMenuWithItemTemplate>
        </ChildMenuWithItemTemplate>
      </DefaultTemplate>
    ),
    expanded => (
      <DefaultTemplate {...{ label: 'Batman', expanded }}>
        <ChildMenuWithItemTemplate {...{ label: 'level 2 item', expanded }}>
          <ChildMenuWithItemTemplate {...{ label: 'level 3 item', expanded, href: '#', status: Status.ACTIVE }}></ChildMenuWithItemTemplate>
        </ChildMenuWithItemTemplate>
      </DefaultTemplate>
    ),
    expanded => (
      <DefaultTemplate {...{ label: 'Batman', expanded }}>
        <div>
          <h3>Demo title</h3>
          <p>some content</p>
        </div>
      </DefaultTemplate>
    ),
  ])('mouse navigation', template => {
    test.each([undefined, true, false])('should manage toggle expand with template %s, click parent item', async expanded => {
      const page = await getPage(template(expanded));

      if (expanded) {
        page.doc
          .querySelector('mg-menu-item')
          .shadowRoot.querySelector('a,button')
          .dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot();
      }

      const element = page.doc.querySelector('[title="Batman"]').closest('mg-menu-item');

      expect(page.root).toMatchSnapshot();

      element.shadowRoot.querySelector('a,button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test.each([undefined, true, false])('should manage toggle expand with template %s, click last item', async expanded => {
      const page = await getPage(template(expanded));

      if (expanded) {
        page.doc
          .querySelector('mg-menu-item')
          .shadowRoot.querySelector('a,button')
          .dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
        expect(page.root).toMatchSnapshot();
      }

      const element =
        page.doc.querySelector('mg-menu-item mg-menu-item mg-menu-item') || page.doc.querySelector('mg-menu-item mg-menu-item') || page.doc.querySelector('mg-menu-item');

      if (element !== null) {
        element.shadowRoot.querySelector('a,button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      }
    });

    test.each([undefined, true, false])('should manage toggle expand with template %s, click middle item', async expanded => {
      const page = await getPage(template(expanded));

      if (expanded) {
        page.doc
          .querySelector('mg-menu-item')
          .shadowRoot.querySelector('a,button')
          .dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();
      }
      expect(page.root).toMatchSnapshot();

      const element = page.doc.querySelector('[title="level 2"]:not([href="#"])')?.closest('mg-menu-item');

      if (element !== undefined) {
        element.shadowRoot.querySelector('a,button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      }
    });
  });

  describe('events', () => {
    describe('click', () => {
      test.each([{}, { child: true }, { status: Status.DISABLED }, { href: '/' }])('should manage prevent click action %s', async props => {
        const page = await getPage(
          <DefaultTemplate {...{ label: 'Batman', ...props }}>{props.child && <ChildMenuWithItemTemplate label="child item"></ChildMenuWithItemTemplate>}</DefaultTemplate>,
        );

        const element = page.doc.querySelector('[title="Batman"]').closest('mg-menu-item');

        const event = new CustomEvent('click', { bubbles: true });

        const spyPreventDefault = jest.spyOn(event, 'preventDefault');
        const spyStopPropagation = jest.spyOn(event, 'stopPropagation');

        element.shadowRoot.querySelector(props.href !== undefined ? 'a' : 'button').dispatchEvent(event);
        await page.waitForChanges();

        if (props.child) {
          const subElement = page.doc.querySelector('mg-menu mg-menu > mg-menu-item');

          subElement.shadowRoot.querySelector(props.href !== undefined ? 'a' : 'button').dispatchEvent(event);
          await page.waitForChanges();

          expect(spyPreventDefault).not.toHaveBeenCalled();
          expect(spyStopPropagation).not.toHaveBeenCalled();
        } else if (props.status !== undefined) {
          expect(spyPreventDefault).toHaveBeenCalled();
          expect(spyStopPropagation).toHaveBeenCalled();
        } else {
          expect(spyPreventDefault).not.toHaveBeenCalled();
          expect(spyStopPropagation).not.toHaveBeenCalled();
        }
      });
    });

    describe('popover', () => {
      test.each([true, false])('should toggle expanded from popover display-change event', async display => {
        const page = await getPage(
          <DefaultTemplate {...{ label: 'Batman', expanded: !display }}>
            <ChildMenuWithItemTemplate label="child item"></ChildMenuWithItemTemplate>
          </DefaultTemplate>,
        );

        const element = page.doc.querySelector('[title="Batman"]').closest('mg-menu-item');

        const popover = element.shadowRoot.querySelector('mg-popover');

        popover.dispatchEvent(new CustomEvent('display-change', { detail: display }));
        await page.waitForChanges();

        expect(element.expanded).toBe(display);
      });

      test('Should prevent "expanded" to be update to "false" when click inside content slot', async () => {
        const page = await getPage(
          <MenuTemplate label="main menu">
            <MenuItemTemplate label="Batman">
              <div>
                <button>Hello batman</button>
              </div>
            </MenuItemTemplate>
          </MenuTemplate>,
        );

        expect(page.root).toMatchSnapshot();

        jest.runAllTimers();
        await page.waitForChanges();

        const mgMenuItem = page.doc.querySelector('mg-menu-item');
        mgMenuItem.shadowRoot.querySelector('button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();

        const contentButton = mgMenuItem.querySelector('button');
        contentButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(mgMenuItem.expanded).toBe(true);
      });
    });

    describe('item-loaded', () => {
      test('Should emit "item-loaded" event at the end of the render process', async () => {
        const page = await getPage(<MenuItemTemplate {...{ label: 'Batman' }}></MenuItemTemplate>);

        expect(page.rootInstance.itemLoaded.emit).toHaveBeenCalled();
      });
    });
  });

  describe('MutationObserver', () => {
    describe.each([
      { from: Status.ACTIVE, to: Status.VISIBLE },
      { from: Status.VISIBLE, to: Status.ACTIVE },
    ])('menu-item status: %s', ({ from, to }) => {
      test.each([
        <MenuTemplate label="menu">
          <MenuItemTemplate label="level 1" status={from}>
            <MenuTemplate label="sub menu 1" direction={directions.VERTICAL}>
              <MenuItemTemplate label="level 2" status={to}></MenuItemTemplate>
            </MenuTemplate>
          </MenuItemTemplate>
        </MenuTemplate>,
        <MenuTemplate label="menu">
          <MenuItemTemplate label="level 1" status={from}>
            <MenuTemplate label="sub menu 1" direction={directions.VERTICAL}>
              <MenuItemTemplate label="level 2">
                <MenuTemplate label="sub menu 1" direction={directions.VERTICAL}>
                  <MenuItemTemplate label="level 3" status={to}></MenuItemTemplate>
                </MenuTemplate>
              </MenuItemTemplate>
            </MenuTemplate>
          </MenuItemTemplate>
        </MenuTemplate>,
      ])('Should update status with child title "attribute" mutation, from status %s', async template => {
        const page = await getPage(template);

        const menuItemLevel1 = page.doc.querySelector('mg-menu-item');
        const menuItemLevel2 = page.doc.querySelector('mg-menu-item mg-menu mg-menu-item');
        const menuItemLevel3 = page.doc.querySelector('mg-menu-item mg-menu mg-menu-item mg-menu mg-menu-item');

        expect(menuItemLevel1).toHaveProperty('status', to === Status.ACTIVE ? to : from);
        expect(menuItemLevel2).toHaveProperty('status', to);

        menuItemLevel2.setAttribute('hidden', '');
        fireMo[menuItemLevel3 !== null ? 4 : 2]([{ attributeName: 'hidden' }, { attributeName: 'status' }]);

        await page.waitForChanges();

        expect(menuItemLevel1).toHaveProperty('status', to === Status.ACTIVE ? to : from);
        expect(page.root).toMatchSnapshot();
      });
    });

    test('Should trigger "item-updated" event when mutation is fired', async () => {
      const page = await getPage(
        <MenuTemplate label="menu">
          <MenuItemTemplate label="level 1">
            <MenuTemplate label="sub menu 1" direction={directions.VERTICAL}>
              <MenuItemTemplate label="level 2"></MenuItemTemplate>
            </MenuTemplate>
          </MenuItemTemplate>
        </MenuTemplate>,
      );

      const menuItemLevel2 = page.doc.querySelector('mg-menu-item mg-menu mg-menu-item');

      const spyItemUpdated = jest.spyOn(menuItemLevel2, 'dispatchEvent');

      fireMo[2]([]);

      await page.waitForChanges();

      expect(spyItemUpdated).toHaveBeenCalledWith(expect.objectContaining({ type: 'item-updated' }));
    });

    test.each(['label', 'metadata'])('Should update status with child "characterData" mutation, from status %s', async slot => {
      const to = 'joker';
      const from = name => `my ${name}`;
      const page = await getPage(<MenuItemTemplate {...{ label: slot === 'label' ? from(slot) : 'Label', metadata: slot === 'metadata' }}></MenuItemTemplate>);

      const menuItemSlotElement = page.doc.querySelector(`mg-menu-item [slot="${slot}"]`);

      expect(menuItemSlotElement).toHaveProperty('title', from(slot));

      menuItemSlotElement.textContent = to;
      fireMo[0]([{ type: 'characterData' }]);

      await page.waitForChanges();

      expect(menuItemSlotElement).toHaveProperty('title', to);
      expect(page.root).toMatchSnapshot();
    });

    test('Should update display notifiaction badge with "attribute" mutation', async () => {
      const page = await getPage(
        <DefaultTemplate label="batman">
          <ChildMenuWithItemTemplate {...{ label: 'submenu', badge: true }}></ChildMenuWithItemTemplate>;
        </DefaultTemplate>,
      );

      const mgMenuItem = page.doc.querySelector(`mg-menu-item`);
      const badgeNotification = mgMenuItem.querySelector('[slot="information"]');

      expect(mgMenuItem).toHaveProperty('hidden', false);
      expect(badgeNotification).not.toBe(null);
      expect(page.root).toMatchSnapshot();

      const childMenuItem = page.doc.querySelector('mg-menu-item mg-menu mg-menu-item');
      childMenuItem.setAttribute('hidden', 'true');
      fireMo[2]([{ type: 'attributes' }]);

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });

    test('Should update item after child nodes update', async () => {
      const page = await getPage(
        <DefaultTemplate label="batman">
          <ChildMenuWithItemTemplate {...{ label: 'submenu', badge: true }}></ChildMenuWithItemTemplate>;
        </DefaultTemplate>,
      );

      const mgMenuItem = page.doc.querySelector(`mg-menu-item`);
      const badgeNotification = mgMenuItem.querySelector('[slot="information"]');

      expect(mgMenuItem).toHaveProperty('hidden', false);
      expect(badgeNotification).not.toBe(null);
      expect(page.root).toMatchSnapshot();

      const childMenuItem = page.doc.querySelector('mg-menu-item mg-menu mg-menu-item');
      childMenuItem.remove();
      fireMo[2]([{ type: 'childList' }]);

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });
});
