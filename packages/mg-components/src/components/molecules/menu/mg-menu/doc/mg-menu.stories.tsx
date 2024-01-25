import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { Direction, MenuSizeType } from '../mg-menu.conf';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';
import { MgMenuItem } from '../../mg-menu-item/mg-menu-item';
import type { MgMenu as MgMenuType } from '../mg-menu';

export default {
  component: 'mg-menu',
  title: 'Molecules/Menus/mg-menu',
  argTypes: {
    direction: {
      options: [undefined, Direction.HORIZONTAL, Direction.VERTICAL],
      control: { type: 'select' },
    },
    itemmore: {
      control: { type: 'object' },
    },
  },
};

/****************
 * mg-menu-item *
 ***************/

type ItemArgType = {
  label: string;
  direction: Direction;
  status?: Status;
  metadata?: string;
  icon?: boolean;
  badge?: boolean;
  content?: boolean;
  submenu?: number;
  href?: MgMenuItem['href'];
};

type ItemFormatedArgs = Pick<ItemArgType, 'status'> & { slot: Pick<ItemArgType, 'label' | 'metadata' | 'icon' | 'badge' | 'content' | 'submenu'> };

type MenuFormatedArgs = Partial<Pick<MgMenuType, 'label' | 'direction'>> & {
  itemmore: unknown;
  slot: {
    items: ItemFormatedArgs[];
  };
};

interface IGetMenuItemArgs {
  ({}: ItemArgType): ItemFormatedArgs;
}

/**
 * Format item args from given params
 * @param itemArgs - item arguments
 * @returns items formated args object
 */
const getItemArgs: IGetMenuItemArgs = ({ label, status, metadata, icon, badge, content, submenu, href }) => ({
  status,
  href,
  slot: {
    label,
    metadata,
    icon,
    badge,
    content,
    submenu,
  },
});

/**
 * Render mg-menu-item
 * @param args - mg-menu-item args
 * @returns rendered mg-menu-item
 */
const menuItem = (args: ItemFormatedArgs): HTMLMgMenuItemElement => (
  <mg-menu-item {...filterArgs(args)}>
    {args.slot?.label && <span slot="label">{args.slot?.label}</span>}
    {args.slot?.metadata && <span slot="metadata">{args.slot?.metadata}</span>}
    {args.slot?.icon && <mg-icon slot="image" icon="user"></mg-icon>}
    {args.slot?.badge && (
      <mg-badge slot="information" label="information" value="1" variant="text-color">
        {args.slot?.icon}
      </mg-badge>
    )}
    {args.slot?.content && (
      <div>
        <h3>Demo title</h3>
        <p>some content</p>
      </div>
    )}
    {args.slot?.submenu > 0 && menu(getMenuArgs(Direction.VERTICAL, args.slot?.submenu - 1, 'medium'))}
  </mg-menu-item>
);

interface IGetMenuArgs {
  (direction: Direction, level?: number, size?: MenuSizeType): MenuFormatedArgs;
}

/***********
 * mg-menu *
 **********/

/**
 * Format menu args from given params
 * @param direction - menu direction
 * @param level - menu level. Default: 0.
 * @param size - menu size. Default: 'regular'
 * @returns menu formated args object
 */
const getMenuArgs: IGetMenuArgs = (direction, level = 0, size = 'regular') => ({
  label: 'Batman menu',
  direction,
  size,
  itemmore: undefined,
  slot: {
    items: [
      getItemArgs({
        label: 'label 1',
        direction,
        href: '#',
      }),
      getItemArgs({
        label: 'label 2',
        direction,
        status: Status.DISABLED,
      }),
      getItemArgs({
        label: 'label 3 with long text',
        direction,
        badge: true,
        icon: true,
      }),
      getItemArgs({
        label: 'label 4',
        direction,
        badge: true,
        icon: true,
        status: Status.ACTIVE,
        submenu: level,
      }),
      getItemArgs({
        label: 'label 5',
        direction,
        icon: true,
        metadata: 'my metadata',
        content: true,
      }),
    ],
  },
});

/**
 * Render mg-menu
 * @param args - mg-menu args
 * @returns rendered mg-menu
 */
const menu = (args: MenuFormatedArgs): HTMLMgMenuElement => (
  <mg-menu {...filterArgs(args, { direction: Direction.HORIZONTAL })}>{args.slot.items.map(item => menuItem(item))}</mg-menu>
);

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgMenuType & { slot: { items: ItemFormatedArgs[] } }): HTMLElement => <div>{menu(args)}</div>;

export const MgMenuHorizontal = {
  render: Template,
  args: getMenuArgs(Direction.HORIZONTAL, 2),
};

export const MgMenuVertical = {
  render: Template,
  args: getMenuArgs(Direction.VERTICAL, 2),
};

const TemplateSmallContainer = (args: MenuFormatedArgs): HTMLElement => {
  return <div style={{ width: '25rem', height: '20rem' }}>{menu(args)}</div>;
};

export const MgMenuVerticalSmallContainer = {
  render: TemplateSmallContainer,

  args: {
    ...MgMenuVertical.args,
  },
};
