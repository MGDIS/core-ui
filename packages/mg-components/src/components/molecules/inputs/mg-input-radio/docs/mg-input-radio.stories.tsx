import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgInputRadio as MgInputRadioType } from '../mg-input-radio';

export default {
  component: 'mg-input-radio',
  title: 'Molecules/Inputs/mg-input-radio',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
  argTypes: {
    value: {
      options: [null, 'ht', 'ttc', 'mixte'],
      control: { type: 'radio' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputRadioType): HTMLElement => <mg-input-radio {...filterArgs(args, { tooltipPosition: 'input' })}></mg-input-radio>;

export const MgInputRadio = {
  render: Template,
  args: {
    value: null,
    items: ['ht', 'ttc', 'mixte'],
    identifier: 'identifier',
    name: 'input-name',
    label: 'Option',
    labelOnTop: false,
    labelHide: false,
    inputVerticalList: false,
    required: false,
    readonly: false,
    disabled: false,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};

export const ItemsWithOptions = {
  render: Template,
  args: {
    ...MgInputRadio.args,
    items: [
      {
        title: 'HT',
        value: 'ht',
      },
      {
        title: 'TTC',
        value: 'ttc',
        disabled: true,
      },
      {
        title: 'Mixte (HT/TTC)',
        value: 'mixte',
      },
    ],
  },
};
