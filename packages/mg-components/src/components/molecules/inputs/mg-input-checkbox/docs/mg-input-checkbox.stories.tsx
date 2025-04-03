import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { checkboxTypes } from '../mg-input-checkbox.conf';
import type { MgInputCheckbox as MgInputCheckboxType } from '../mg-input-checkbox';

export default {
  component: 'mg-input-checkbox',
  title: 'Molecules/Inputs/mg-input-checkbox',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputCheckboxType): HTMLElement => <mg-input-checkbox {...filterArgs(args, { tooltipPosition: 'input' })}></mg-input-checkbox>;

export const MgInputCheckbox = {
  render: Template,
  args: {
    // Global
    value: [
      {
        title: 'HT',
        value: true,
      },
      {
        title: 'TTC',
        value: false,
        disabled: true,
      },
      {
        title: 'Mixte (HT/TTC)',
        value: null,
      },
    ],
    type: undefined,
    identifier: 'identifier',
    name: 'input-name',
    label: 'Option',
    labelOnTop: false,
    labelHide: false,
    inputVerticalList: false,
    required: false,
    readonly: false,
    displaySelectedValues: false,
    disabled: false,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    editButtonMessage: '',
    showButtonMessage: '',
    selectButtonMessage: '',
  },
};

export const MgInputCheckboxMulti = {
  render: Template,
  args: {
    ...MgInputCheckbox.args,
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
      title: `item ${item}`,
      value: false,
    })),
    type: checkboxTypes[1],
  },
};
