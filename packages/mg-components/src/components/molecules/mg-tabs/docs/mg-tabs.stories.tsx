import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { Status } from '../mg-tabs.conf';
import type { MgTabs as MgTabsType } from '../mg-tabs';

export default {
  component: 'mg-tabs',
  title: 'Molecules/mg-tabs',
  parameters: { actions: { handles: ['active-tab-change'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgTabsType): HTMLElement => (
  <mg-tabs {...filterArgs(args, { size: 'medium' })}>
    <div slot="tab_content-1">Content 1</div>
    <div slot="tab_content-2">Content 2</div>
    <div slot="tab_content-3">Content 3</div>
    <div slot="tab_content-4">Content 4</div>
  </mg-tabs>
);

export const MgTabs = {
  render: Template,
  args: {
    identifier: undefined,
    label: 'Short tabs description. Needed for accessibility',
    size: undefined,
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
    activeTab: 2,
  },
};

export const MgTabsItems = {
  render: Template,
  args: {
    ...MgTabs.args,
    activeTab: undefined,
    items: [
      {
        label: 'Tab 1',
        icon: 'check',
        badge: { value: 1, label: 'message' },
      },
      {
        label: 'Tab 2',
        badge: { value: 5, label: 'messages', role: 'information' },
        status: Status.DISABLED,
      },
      {
        label: 'Tab 3',
        icon: 'cross',
        badge: { value: '9+', label: 'messages', role: 'notification' },
        status: Status.ACTIVE,
      },
      {
        label: 'Tab 4',
        icon: 'trash',
        status: Status.HIDDEN,
      },
    ],
  },
};
