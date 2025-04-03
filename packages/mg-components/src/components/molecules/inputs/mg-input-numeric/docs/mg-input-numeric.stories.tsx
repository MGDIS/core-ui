import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputNumeric as MgInputNumericType } from '../mg-input-numeric';

export default {
  component: 'mg-input-numeric',
  title: 'Molecules/Inputs/mg-input-numeric',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputNumericType): HTMLElement => (
  <mg-input-numeric
    {...filterArgs(
      args,
      {
        type: 'decimal',
        currency: 'EUR',
        decimalLength: 2,
        format: 'number',
        integerLength: 13,
        unitDisplay: 'short',
        tooltipPosition: 'input',
      },
      ['append-input'],
    )}
    innerHTML={args['append-input']}
  ></mg-input-numeric>
);

export const MgInputNumeric = {
  render: Template,
  args: {
    // Props
    'value': '',
    'identifier': 'identifier',
    'name': 'input-name',
    'label': 'Label',
    'labelOnTop': false,
    'labelHide': false,
    'placeholder': 'placeholder',
    'required': false,
    'readonly': false,
    'max': '',
    'min': '',
    'disabled': false,
    'mgWidth': undefined,
    'tooltip': 'This is a tooltip',
    'tooltipPosition': undefined,
    'helpText': 'Help text with html <b>bold</b>, <em>italic</em>.',
    'type': undefined,
    'format': undefined,
    'currency': '',
    'unit': '',
    'unitDisplay': undefined,
    'integerLength': undefined,
    'decimalLength': undefined,
    // Slot
    'append-input': '',
  },
};

export const AppendSlot = {
  render: Template,
  args: {
    ...MgInputNumeric.args,
    'append-input': `<span slot="append-input">km</span>`,
  },
};
