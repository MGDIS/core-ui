import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputDate as MgInputDateType } from '../mg-input-date';

export default {
  component: 'mg-input-date',
  title: 'Molecules/Inputs/mg-input-date',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputDateType): HTMLElement => <mg-input-date {...filterArgs(args)}></mg-input-date>;

export const MgInputDate = {
  render: Template,
  args: {
    // Global
    value: `2023-06-02`,
    identifier: 'identifier',
    // Label
    label: 'Label',
    // Input
    required: true,
    // Tooltip
    tooltip: 'This is a tooltip',
  },
};

export const MgInputDateMinMax = {
  render: Template,
  args: {
    ...MgInputDate.args,
    // date range
    min: `2023-01-01`,
    max: `2023-12-31`,
  },
};
