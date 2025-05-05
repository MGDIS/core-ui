import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgMenuItem as MgMenuItemType } from '../../mg-menu-item/mg-menu-item';
import type { MgMenu as MgMenuType } from '../mg-menu';
import { directions } from '../mg-menu.conf';
import { Status } from '../../mg-menu-item/mg-menu-item.conf';

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
  icon?: boolean;
  badge?: boolean;
  content?: boolean;
  submenu?: number;
};

type MenuArg = MgMenuType & {
  storyItems: MenuItemArg[];
};

const depth = 2;

/**
 * Render mg-menu-item
 * @param args - mg-menu-item args
 * @returns rendered mg-menu-item
 */
const menuItem = (args: MenuItemArg): HTMLMgMenuItemElement => {
  const mgMenuItemArgs = { href: args.href, status: args.status };
  return (
    <mg-menu-item {...filterArgs(mgMenuItemArgs, { status: 'visible' })}>
      {args.label && <span slot="label">{args.label}</span>}
      {args.metadata && <span slot="metadata">{args.metadata}</span>}
      {args.icon && <mg-icon slot="image" icon="user"></mg-icon>}
      {args.badge && <mg-badge slot="information" label="information" value="1" variant="text-color"></mg-badge>}
      {args.content && (
        <div>
          <h3>Demo title</h3>
          <p>some content</p>
        </div>
      )}
      {args.submenu > 0 && menu(getMenuArgs(directions.VERTICAL, args.submenu - 1, 'medium'))}
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
 * @param size - menu size. Default: 'medium'
 * @returns menu formated args object
 */
const getMenuArgs = (direction: MgMenuType['direction'], level = 0, size: MgMenuType['size'] = 'xlarge') => ({
  label: 'Batman menu',
  direction,
  size,
  itemmore: level === depth && direction === directions.HORIZONTAL ? { size } : undefined,
  storyItems: [
    {
      href: '#',
      label: 'label 1',
    },
    {
      status: Status.DISABLED,
      label: 'label 2',
    },
    {
      badge: true,
      label: 'label 3 with long text',
      icon: true,
    },
    {
      status: Status.ACTIVE,
      label: 'label 4',
      badge: true,
      icon: true,
      submenu: level,
    },
    {
      label: 'label 5',
      icon: true,
      metadata: 'my metadata',
      content: true,
    },
  ],
});

/**
 * Render mg-menu
 * @param args - mg-menu args
 * @returns rendered mg-menu
 */
const menu = (args): HTMLMgMenuElement => {
  const mgMenuArgs = { label: args.label, direction: args.direction, itemmore: args.itemmore, size: args.size };
  return (
    <mg-menu
      {...filterArgs(mgMenuArgs, {
        direction: directions.HORIZONTAL,
        size: 'medium',
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
