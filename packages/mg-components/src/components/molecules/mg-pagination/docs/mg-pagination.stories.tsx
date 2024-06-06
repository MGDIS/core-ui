import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgPagination as MgPaginationType } from '../mg-pagination';

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
const Template = (args: MgPaginationType): HTMLElement => <mg-pagination {...filterArgs(args)}></mg-pagination>;

export const MgPagination = {
  render: Template,
  args: {
    totalPages: 5,
    currentPage: 1,
  },
};
