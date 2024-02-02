import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputTitle as MgInputTitleType } from '../mg-input-title';

export default {
  component: 'mg-input-title',
  title: 'Atoms/mg-input-title',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputTitleType & { slot: string }): HTMLElement => <mg-input-title {...filterArgs(args)} innerHTML={args.slot}></mg-input-title>;

export const MgInputTitle = {
  render: Template,
  args: {
    slot: 'Label',
    identifier: 'identifier',
    required: true,
    readonly: false,
    isLegend: false,
  },
};
