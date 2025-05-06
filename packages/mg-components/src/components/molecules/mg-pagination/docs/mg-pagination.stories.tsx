import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
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
const Template = (args: MgPaginationType): HTMLElement => (
  <mg-pagination
    {...filterArgs(args, {
      totalPages: 1,
      currentPage: 1,
    })}
  ></mg-pagination>
);

export const MgPagination = {
  render: Template,
  args: {
    identifier: undefined,
    label: undefined,
    hideNavigationLabels: false,
    hidePageCount: false,
    totalPages: 5,
    currentPage: 1,
  },
};
