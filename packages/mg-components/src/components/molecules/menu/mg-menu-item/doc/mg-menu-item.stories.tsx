import { h } from '@stencil/core';
import { withActions } from '@storybook/addon-actions/decorator';
import { filterArgs } from '../../../../../../.storybook/utils';
import { Direction } from '../../mg-menu/mg-menu.conf';

export default {
  component: 'mg-menu-item',
  title: 'Beta/Menus/mg-menu-item',
  parameters: { actions: { handles: ['item-loaded'] } },
  decorators: [withActions],
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-menu-item {...filterArgs(args)}>{args.slot}</mg-menu-item>;

export const MgMenuItem = {
  render: Template,
  args: {
    slot: <span slot="label">My label</span>,
  },
};

export const MgMenuItemAsLink = {
  render: Template,
  args: {
    href: './',
    ...MgMenuItem.args,
  },
};

export const MgMenuItemWhitIcon = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: [<span slot="label">My label</span>, <mg-icon icon="user" slot="image"></mg-icon>],
  },
};

export const MgMenuItemWhitBadge = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: [<span slot="label">My label</span>, <mg-badge value="2" label="hello" slot="information"></mg-badge>],
  },
};

export const MgMenuItemWhitBadgeAndIcon = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: [<span slot="label">My label</span>, <mg-badge value="2" label="hello" slot="information"></mg-badge>, <mg-icon icon="user" slot="image"></mg-icon>],
  },
};

export const MgMenuItemWhitMetadata = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: [<span slot="label">My label</span>, <span slot="metadata">My metadata</span>],
  },
};

export const MgMenuItemWhithSubmenu = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: [
      <span slot="label">My label</span>,
      <mg-menu direction={Direction.VERTICAL} label="submenu">
        <mg-menu-item>
          <span slot="label">Subitem 1</span>
        </mg-menu-item>
        <mg-menu-item>
          <mg-icon icon="user" slot="image"></mg-icon>
          <span slot="label">Subitem 2</span>
        </mg-menu-item>
        <mg-menu-item>
          <span slot="label">Subitem 3</span>
          <mg-icon icon="user" slot="image"></mg-icon>
          <mg-badge value="2" label="hello" variant="text-color" slot="information"></mg-badge>
        </mg-menu-item>
      </mg-menu>,
    ],
  },
};
