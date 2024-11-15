import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgProgress as MgProgressType } from '../mg-progress';

export default {
  component: 'mg-progress',
  title: 'Molecules/mg-progress',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLMgProgressElement
 */
const Template = (args: MgProgressType): HTMLMgProgressElement => <mg-progress {...filterArgs(args)}></mg-progress>;

export const MgProgress = {
  render: Template,
  args: {
    label: 'label',
    value: 10,
  },
};

export const MgProgressMeter = {
  render: Template,
  args: {
    ...MgProgress.args,
    ariaRole: 'meter',
    value: 20,
    min: 10,
    max: 30,
  },
};
