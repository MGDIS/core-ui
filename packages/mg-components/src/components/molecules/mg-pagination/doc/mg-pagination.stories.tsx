import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-pagination',
  title: 'Molecules/mg-pagination',
  parameters: { actions: { handles: ['current-page-change'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-pagination {...filterArgs(args)}></mg-pagination>;

export const MgPagination = {
  render: Template,
  args: {
    totalPages: 5,
    currentPage: 1,
  },
};
