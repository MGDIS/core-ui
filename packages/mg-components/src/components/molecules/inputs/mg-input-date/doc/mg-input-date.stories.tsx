import { h } from '@stencil/core';
import { withActions } from '@storybook/addon-actions/decorator';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-date',
  title: 'Molecules/Inputs/mg-input-date',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
  decorators: [withActions],
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-input-date {...filterArgs(args)}></mg-input-date>;

export const MgInputDate = {
  render: Template,
  args: {
    // Global
    value: `2023-06-02`,
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    required: true,
    readonly: false,
    disabled: false,
    // Tooltip
    tooltip: 'This is a tooltip',
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
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
