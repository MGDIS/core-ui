import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { types } from '../mg-input-numeric.conf';
import type { MgInputNumeric as MgInputNumericType } from '../mg-input-numeric';
import { tooltipPositions } from '../../mg-input/mg-input.conf';

export default {
  component: 'mg-input-numeric',
  title: 'Molecules/Inputs/mg-input-numeric',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
  argTypes: {
    type: {
      options: types,
      control: { type: 'select' },
    },
    mgWidth: {
      name: 'mg-width',
      options: [undefined, 2, 4, 16, 'full'],
      control: { type: 'select' },
    },
    tooltipPosition: {
      name: 'tooltip-position',
      options: [undefined, ...tooltipPositions],
      control: { type: 'select' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputNumericType): HTMLElement => <mg-input-numeric {...filterArgs(args)}></mg-input-numeric>;

export const MgInputNumeric = {
  render: Template,
  args: {
    // Global
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    type: types[0], // decimal
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    placeholder: 'placeholder',
    required: true,
    disabled: false,
    readonly: false,
    max: undefined,
    min: undefined,
    mgWidth: undefined,
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  },
};

const TemplateSlot = args => {
  const labelOnTop = args.labelOnTop;
  delete args.labelOnTop;
  const labelHide = args.labelHide;
  delete args.labelHide;
  const helpText = args.helpText;
  delete args.helpText;
  // return element
  return (
    <mg-input-numeric {...args} label-on-top={labelOnTop} label-hide={labelHide} help-text={helpText}>
      <span slot="append-input">km</span>
    </mg-input-numeric>
  );
};

export const AppendSlot = {
  render: TemplateSlot,

  args: {
    ...MgInputNumeric.args,
  },
};
