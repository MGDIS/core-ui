import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { variants } from '../mg-tag.conf';
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
const Template = (args: MgTagType & { slot: string }): HTMLElement => <mg-tag {...filterArgs(args, { variant: variants[0] })} innerHTML={args.slot}></mg-tag>;

export const MgTag = {
  render: Template,
  args: {
    slot: 'Label',
    variant: variants[0],
    outline: false,
    soft: false,
  },
};
