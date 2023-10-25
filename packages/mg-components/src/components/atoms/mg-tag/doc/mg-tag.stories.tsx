import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { variants } from '../mg-tag.conf';

export default {
  component: 'mg-tag',
  title: 'Atoms/mg-tag',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-tag {...filterArgs(args, { variant: variants[0] })} innerHTML={args.slot}></mg-tag>;

export const MgTag = {
  render: Template,
  args: {
    slot: 'Label',
    variant: variants[0],
    outline: false,
    soft: false,
  },
};
