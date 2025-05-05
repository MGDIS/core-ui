import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import { variants } from '../mg-badge.conf';
import type { MgBadge as MgBadgeType } from '../mg-badge';

export default {
  component: 'mg-badge',
  title: 'Atoms/mg-badge',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgBadgeType): HTMLElement => <mg-badge {...filterArgs(args, { variant: variants[0] })}></mg-badge>;

export const MgBadge = {
  render: Template,
  args: {
    value: '99',
    label: 'unread messages',
    variant: undefined,
    outline: false,
  },
};
