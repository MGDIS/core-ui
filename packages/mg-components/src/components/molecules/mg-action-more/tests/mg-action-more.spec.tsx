import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { forcePopoverId } from '../../../../utils/unit.test.utils';
import { toString } from '@mgdis/core-ui-helpers/dist/utils';
import { setupMutationObserverMock, setupResizeObserverMock } from '@mgdis/core-ui-helpers/dist/tests';
import { Status } from '../../menus/mg-menu-item/mg-menu-item.conf';
import { MgButton } from '../../../atoms/mg-button/mg-button';
import { MgPopover } from '../../mg-popover/mg-popover';
import { MgActionMore } from '../mg-action-more';
import { MgMenu } from '../../menus/mg-menu/mg-menu';
import { MgMenuItem } from '../../menus/mg-menu-item/mg-menu-item';
import { MgPopoverContent } from '../../mg-popover/mg-popover-content/mg-popover-content';

const getPage = async args => {
  const page = await newSpecPage({
    components: [MgActionMore, MgPopover, MgPopoverContent, MgButton, MgMenu, MgMenuItem],
    template: () => <mg-action-more {...args}></mg-action-more>,
  });

  Array.from(page.doc.querySelectorAll('mg-action-more')).forEach((item, index) => {
    const mgPopoverIdentifier = `mg-popover-test_${index}`;
    item.dataset.mgPopoverGuard = mgPopoverIdentifier;
    forcePopoverId(item, mgPopoverIdentifier, 'mg-button');
  });

  page.doc
    .querySelector('mg-action-more')
    .shadowRoot.querySelectorAll('mg-menu-item')
    .forEach((item, index) => {
      item.setAttribute('identifier', `identifier-${index}`);
    });

  await page.waitForChanges();

  return page;
};

const mouseEventHandler = jest.fn();

const items = [
  {
    label: 'batman',
    mouseEventHandler,
  },
  {
    isDivider: true,
  },
  {
    label: 'robin',
    mouseEventHandler,
    status: Status.HIDDEN,
  },
  {
    label: 'joker',
    mouseEventHandler,
    badge: {
      value: 2,
      label: 'badge',
    },
  },
  {
    label: 'bane',
    mouseEventHandler,
    icon: {},
    href: '#',
  },
  {
    label: 'robin',
    mouseEventHandler,
    icon: { icon: 'user' },
    href: '#',
  },
  {
    label: 'harley quinn',
    mouseEventHandler,
    icon: { icon: 'user', variant: 'success', variantStyle: 'icon' },
    href: '#',
  },
  {
    label: "Ra's al Ghul",
    mouseEventHandler,
    href: '/',
    target: '_blank',
  },
];

Object.defineProperty(window, 'frames', {
  value: { length: 0 },
});

describe('mg-action-more', () => {
  beforeEach(() => {
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
  describe.each([
    {
      items,
    },
    {
      items,
      button: {
        label: 'dc-comics',
        variant: 'primary',
        isIcon: false,
      },
    },
    {
      items,
      displayChevron: true,
      button: {
        variant: 'flat',
        isIcon: false,
      },
    },
    {
      items,
      displayChevron: true,
      icon: {
        icon: 'ellipsis',
      },
      button: {
        variant: 'flat',
        isIcon: false,
      },
    },
    {
      items,
      displayChevron: false,
      icon: {
        icon: 'ellipsis',
      },
      button: {
        variant: 'flat',
        isIcon: false,
      },
    },
    {
      items,
      displayChevron: false,
      button: {
        variant: 'flat',
        isIcon: false,
      },
    },
    {
      items,
      button: {
        variant: 'flat',
        isIcon: false,
        disabled: true,
      },
    },
  ])('render', args => {
    test(`Should render with args ${args}`, async () => {
      const { root } = await getPage(args);
      expect(root).toMatchSnapshot();
    });

    test('Should toggle menu on click', async () => {
      const page = await getPage(args);
      expect(page.root).toMatchSnapshot();

      const mgMoreAction = page.doc.querySelector('mg-action-more');
      const mgButton = mgMoreAction.shadowRoot.querySelector('mg-button');
      mgButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test.each([
      {
        args: {},
        error: `<mg-action-more> prop "items" is required and all values must be the same type, MgActionMoreItemType or MgActionMoreDividerType. Passed value: ${undefined}.`,
      },
      {
        args: { items: ['batman'] },
        error: `<mg-action-more> prop "items" is required and all values must be the same type, MgActionMoreItemType or MgActionMoreDividerType. Passed value: ${toString(['batman'])}.`,
      },
      {
        args: { items: [{ label: 'batman' }] },
        error: `<mg-action-more> prop "items" is required and all values must be the same type, MgActionMoreItemType or MgActionMoreDividerType. Passed value: ${toString([{ label: 'batman' }])}.`,
      },
      {
        args: { items: [{ label: 'batman', mouseEventHandler: 'batman' }] },
        error: `<mg-action-more> prop "items" is required and all values must be the same type, MgActionMoreItemType or MgActionMoreDividerType. Passed value: ${toString([{ label: 'batman', mouseEventHandler: 'batman' }])}.`,
      },
      {
        args: { items: [{ isDivider: true }, { label: 'batman', mouseEventHandler: () => {} }] },
        error: `<mg-action-more> prop "items" can’t have a divider at the beginning or the end of the array. Passed value: ${toString([{ isDivider: true }, { label: 'batman', mouseEventHandler: () => {} }])}.`,
      },
      {
        args: { items: [{ label: 'batman', mouseEventHandler: () => {} }, { isDivider: true }] },
        error: `<mg-action-more> prop "items" can’t have a divider at the beginning or the end of the array. Passed value: ${toString([{ label: 'batman', mouseEventHandler: () => {} }, { isDivider: true }])}.`,
      },
      {
        args: { items: [{ mouseEventHandler: 'batman' }] },
        error: `<mg-action-more> prop "items" is required and all values must be the same type, MgActionMoreItemType or MgActionMoreDividerType. Passed value: ${toString([{ mouseEventHandler: 'batman' }])}.`,
      },
      {
        args: { items: [{ label: 'batman', mouseEventHandler }], button: {} },
        error: `<mg-action-more> prop "button" must match MgActionMoreButtonType. Passed value: ${toString({})}.`,
      },
      {
        args: { items: [{ label: 'batman', mouseEventHandler }], button: { variant: 'primary' } },
        error: `<mg-action-more> prop "button" must match MgActionMoreButtonType. Passed value: ${toString({ variant: 'primary' })}.`,
      },
      {
        args: { items: [{ label: 'batman', mouseEventHandler }], button: { isIcon: true } },
        error: `<mg-action-more> prop "button" must match MgActionMoreButtonType. Passed value: ${toString({ isIcon: true })}.`,
      },
      { args: { items: [{ label: 'batman', mouseEventHandler }], icon: 'user' }, error: `<mg-action-more> prop "icon" must match MgActionMoreIconType. Passed value: user.` },
      {
        args: { items: [{ label: 'batman', mouseEventHandler }], displayChevron: true },
        error: `<mg-action-more> prop "displayChevron" can't be used with a 'button" prop "isIcon" attribute.`,
      },
      {
        args: { items: [{ label: 'batman', mouseEventHandler }], button: { isIcon: true, variant: 'flat' }, displayChevron: true },
        error: `<mg-action-more> prop "displayChevron" can't be used with a 'button" prop "isIcon" attribute.`,
      },
    ])('with args %s', async ({ args, error }) => {
      expect.assertions(1);
      try {
        await getPage(args);
      } catch (err) {
        expect(err.message).toEqual(error);
      }
    });
  });

  describe('navigation', () => {
    test(`Should run item mouseEventHandler by clicking on menu-item`, async () => {
      const page = await getPage({ items });
      expect(page.root).toMatchSnapshot();

      const mgMoreAction = page.doc.querySelector('mg-action-more');
      const mgButton = mgMoreAction.shadowRoot.querySelector('mg-button');
      mgButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const mgMenuItem = mgMoreAction.shadowRoot.querySelector('mg-menu-item');
      mgMenuItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await page.waitForChanges();

      expect(mouseEventHandler).toHaveBeenCalled();
      expect(page.root).toMatchSnapshot();
    });

    test(`Should update expanded when popover display change`, async () => {
      const page = await getPage({ items, displayChevron: true, button: { variant: 'flat', isIcon: false } });
      expect(page.root).toMatchSnapshot();

      const mgMoreAction = page.doc.querySelector('mg-action-more');
      const mgButton = mgMoreAction.shadowRoot.querySelector('mg-button');
      mgButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const mgPopover = mgMoreAction.shadowRoot.querySelector('mg-popover');

      mgPopover.dispatchEvent(new CustomEvent('display-change', { detail: false }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });
});
