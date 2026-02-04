import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgBreadcrumb as MgBreadcrumbType } from '../mg-breadcrumb';

export default {
  component: 'mg-breadcrumb',
  title: 'Molecules/mg-breadcrumb',
  parameters: { actions: { handles: ['item-click'] } },
  argTypes: {
    // Set object control so Storybook passes an array, not a string (component accepts both for HTML attribute usage)
    items: {
      control: { type: 'object' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgBreadcrumbType): HTMLElement => <mg-breadcrumb {...filterArgs(args)}></mg-breadcrumb>;

export const MgBreadcrumb = {
  render: Template,
  args: {
    items: [{ label: 'Home', href: '/', icon: 'home-outline' }, { label: 'Lorem ipsum dolor sit amet', href: '/lorem' }, { label: 'Current page' }],
  },
};
