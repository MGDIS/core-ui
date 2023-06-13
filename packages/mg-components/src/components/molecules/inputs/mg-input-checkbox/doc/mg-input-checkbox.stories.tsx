import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';
import { checkboxTypes } from '../mg-input-checkbox.conf';

export default {
  component: 'mg-input-checkbox',
  title: 'Molecules/Inputs/mg-input-checkbox',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
  argTypes: {
    type: {
      options: [undefined, ...checkboxTypes],
      control: { type: 'select' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-input-checkbox {...filterArgs(args)}></mg-input-checkbox>;

export const MgInputCheckbox = Template.bind({});
MgInputCheckbox.args = {
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
  identifier: 'identifier',
  name: 'input-name',
  type: undefined,
  // Label
  label: 'Option',
  labelOnTop: false,
  labelHide: false,
  // placement
  inputVerticalList: false,
  // Input
  required: false,
  disabled: false,
  readonly: false,
  // Tooltip
  tooltip: 'This is a tooltip',
  // Help Text
  helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  displaySelectedValues: false,
};

export const MgInputCheckboxMulti = Template.bind({});
MgInputCheckboxMulti.args = {
  ...MgInputCheckbox.args,
  value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
    title: `item ${item}`,
    value: false,
  })),
};
