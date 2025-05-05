import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgLoader as MgLoaderType } from '../mg-loader';

export default {
  component: 'mg-loader',
  title: 'Molecules/mg-loader',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLMgLoaderElement
 */
const Template = (args: MgLoaderType): HTMLMgLoaderElement => <mg-loader {...filterArgs(args)}></mg-loader>;

export const MgLoader = {
  render: Template,
  args: {
    message: undefined,
    messageHide: false,
  },
};
