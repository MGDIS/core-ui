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
const Template = (args: MgProgressType): HTMLMgProgressElement => (
  <mg-progress
    {...filterArgs(args, {
      ariaRole: 'progressbar',
      min: 0,
      max: 100,
    })}
  ></mg-progress>
);

export const MgProgress = {
  render: Template,
  args: {
    label: 'label',
    ariaRole: undefined,
    value: 10,
    min: 0,
    max: 100,
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
