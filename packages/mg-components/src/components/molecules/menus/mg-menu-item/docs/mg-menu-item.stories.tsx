import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { directions } from '../../mg-menu/mg-menu.conf';
import type { MgMenuItem as MgMenuItemType } from '../mg-menu-item';

export default {
  component: 'mg-menu-item',
  title: 'Molecules/Menus/mg-menu-item',
  parameters: { actions: { handles: ['item-loaded', 'item-updated'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgMenuItemType & { slot: string }): HTMLElement => (
  <mg-menu label="demo">
    <mg-menu-item
      {...filterArgs(
        args,
        {
          status: 'visible',
        },
        ['', 'image', 'information', 'label', 'metadata'],
      )}
      innerHTML={`${args['']}${args['image']}${args['information']}${args['label']}${args['metadata']}`}
    ></mg-menu-item>
  </mg-menu>
);

export const MgMenuItem = {
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'href': undefined,
    'target': undefined,
    'status': undefined,
    'expanded': false,
    // Slots
    '': '',
    'image': '',
    'information': '',
    'label': `<span slot="label">My label</span>`,
    'metadata': '',
  },
};

export const MgMenuItemAsLink = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    href: './',
  },
};

export const MgMenuItemAsExternalLink = {
  render: Template,
  args: {
    ...MgMenuItemAsLink.args,
    target: '_blank',
  },
};

export const MgMenuItemWhitIcon = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: `<span slot="label">My label</span>`,
    image: `<mg-icon icon="user" slot="image"></mg-icon>`,
  },
};

export const MgMenuItemWhitBadge = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: `<span slot="label">My label</span>`,
    information: `<mg-badge value="2" label="hello" slot="information"></mg-badge>`,
  },
};

export const MgMenuItemWhitBadgeAndIcon = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: `<span slot="label">My label</span>`,
    information: `<mg-badge value="2" label="hello" slot="information"></mg-badge>`,
    image: `<mg-icon icon="user" slot="image"></mg-icon>`,
  },
};

export const MgMenuItemWhitMetadata = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    'data-overflow-more': true,
    'data-size': 'large',
    // Slot
    'label': `<span slot="label">My label</span>`,
    'metadata': `<span slot="metadata">My metadata</span>`,
  },
};

export const MgMenuItemWithSubmenu = {
  render: Template,
  args: {
    ...MgMenuItem.args,
    'expanded': true,
    // Slot
    'label': `<span slot="label">My label</span>`,
    '': `<mg-menu direction="${directions.VERTICAL}" label="submenu">
  <mg-menu-item status="active">
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
</mg-menu>`,
  },
};
