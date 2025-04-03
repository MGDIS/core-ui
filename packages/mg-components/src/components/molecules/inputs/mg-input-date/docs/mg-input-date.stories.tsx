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
const Template = (args: MgInputDateType): HTMLElement => <mg-input-date {...filterArgs(args, { tooltipPosition: 'input' })}></mg-input-date>;

export const MgInputDate = {
  render: Template,
  args: {
    value: `2023-06-02`,
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    required: false,
    readonly: false,
    min: '',
    max: '',
    disabled: false,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
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
