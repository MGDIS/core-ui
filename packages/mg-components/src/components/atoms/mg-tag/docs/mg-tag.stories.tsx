import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgTag as MgTagType } from '../mg-tag';

export default {
  component: 'mg-tag',
  title: 'Atoms/mg-tag',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgTagType & { '': string }): HTMLElement => <mg-tag {...filterArgs(args, { variant: 'primary' }, [''])} innerHTML={args['']}></mg-tag>;

export const MgTag = {
  render: Template,
  args: {
    // Props
    'variant': undefined,
    'outline': false,
    'soft': false,
    // Slot
    '': 'Label',
  },
};
