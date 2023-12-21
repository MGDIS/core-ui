import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { variants } from '../mg-badge.conf';
import type { MgBadge as MgBadgeType } from '../mg-badge';

export default {
  component: 'mg-badge',
  title: 'Atoms/mg-badge',
  argTypes: {
    value: {
      control: { type: 'text' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgBadgeType): HTMLElement => <mg-badge {...filterArgs<MgBadgeType>(args, { variant: variants[0] })}></mg-badge>;

export const MgBadge = {
  render: Template,
  args: {
    value: '99',
    label: 'unread messages',
    variant: variants[0],
    outline: false,
  },
};
