import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgMenuItem as MgMenuItemType } from '../../mg-menu-item/mg-menu-item';
import type { MgMenu as MgMenuType } from '../mg-menu';
import { directions } from '../mg-menu.conf';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';
import { MgIcon } from '../../../../atoms/mg-icon/mg-icon';

export default {
  component: 'mg-menu',
  title: 'Molecules/Menus/mg-menu',
};

/****************
 * mg-menu-item *
 ***************/

type MenuItemArg = Pick<MgMenuItemType, 'status' | 'href'> & {
  label: string;
  metadata?: string;
  icon?: MgIcon['icon'];
  badge?: boolean;
  content?: boolean;
  submenu?: number;
  isIcon?: boolean;
};

type MenuArg = Pick<MgMenuType, 'label' | 'direction' | 'itemmore'> & {
  storyItems: MenuItemArg[];
};

const depth = 2;

/**
 * Render mg-menu-item
 * @param args - mg-menu-item args
 * @returns rendered mg-menu-item
 */
const menuItem = (args: MenuItemArg): HTMLMgMenuItemElement => {
  const mgMenuItemArgs = { href: args.href, status: args.status, isIcon: args.isIcon };
  return (
    <mg-menu-item {...filterArgs(mgMenuItemArgs, { status: 'visible' })}>
      {args.label && <span slot="label">{args.label}</span>}
      {args.metadata && <span slot="metadata">{args.metadata}</span>}
      {args.icon && <mg-icon slot="image" icon={args.icon} size="large"></mg-icon>}
      {args.badge && <mg-badge slot="information" label="information" value="1" variant="text-color"></mg-badge>}
      {args.content && (
        <div>
          <h3>Demo title</h3>
          <p>some content</p>
        </div>
      )}
      {args.submenu > 0 && menu(getMenuArgs(directions.VERTICAL, args.submenu - 1))}
    </mg-menu-item>
  );
};

/***********
 * mg-menu *
 **********/

/**
 * Format menu args from given params
 * @param direction - menu direction
 * @param level - menu level. Default: 0.
 * @returns menu formated args object
 */
const getMenuArgs = (direction: MgMenuType['direction'], level = 0): MenuArg => ({
  label: 'Batman menu',
  direction,
  storyItems: [
    {
      href: '#',
      label: 'With link',
    },
    {
      status: Status.DISABLED,
      label: 'Disabled item',
    },
    {
      badge: true,
      label: 'With a longer text',
      icon: 'pen',
    },
    {
      status: Status.ACTIVE,
      label: 'With submenu',
      badge: true,
      icon: 'star',
      submenu: level,
    },
    {
      label: 'Mon user',
      icon: 'user',
      metadata: 'Design campany',
      content: true,
    },
    {
      label: 'Notification',
      icon: 'bell',
      isIcon: true,
    },
  ],
});

/**
 * Render mg-menu
 * @param args - mg-menu args
 * @returns rendered mg-menu
 */
const menu = (args: MenuArg): HTMLMgMenuElement => {
  const mgMenuArgs = { label: args.label, direction: args.direction, itemmore: args.itemmore };
  return (
    <mg-menu
      {...filterArgs(mgMenuArgs, {
        direction: directions.HORIZONTAL,
      })}
    >
      {args.storyItems.map(menuItem)}
    </mg-menu>
  );
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MenuArg): HTMLElement => <div>{menu(args)}</div>;

export const MgMenuHorizontal = {
  render: Template,
  args: getMenuArgs(directions.HORIZONTAL, depth),
};

export const MgMenuVertical = {
  render: Template,
  args: getMenuArgs(directions.VERTICAL, depth),
};

const TemplateSmallContainer = (args: MenuArg): HTMLElement => {
  return <div style={{ width: '25rem', height: '20rem' }}>{menu(args)}</div>;
};

export const MgMenuVerticalSmallContainer = {
  render: TemplateSmallContainer,
  args: {
    ...MgMenuVertical.args,
  },
};
