import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-divider',
  title: 'Atoms/mg-divider',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-divider {...filterArgs(args, { size: 'regular' })}></mg-divider>;

export const MgDivider = {
  render: Template,
  args: {
    size: 'regular',
  },
};
