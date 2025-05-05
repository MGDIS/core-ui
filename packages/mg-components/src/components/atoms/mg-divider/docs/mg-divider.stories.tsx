import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgDivider as MgDividerType } from '../mg-divider';

export default {
  component: 'mg-divider',
  title: 'Atoms/mg-divider',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgDividerType): HTMLElement => <mg-divider {...filterArgs(args, { fullWidth: false })}></mg-divider>;

export const MgDivider = {
  render: Template,
  args: {
    fullWidth: false,
  },
};
