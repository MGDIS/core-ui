import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputRadio as MgInputRadioType } from '../mg-input-radio';
import { tooltipPositions } from '../../mg-input/mg-input.conf';

export default {
  component: 'mg-input-radio',
  title: 'Molecules/Inputs/mg-input-radio',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
  argTypes: {
    value: {
      options: [null, 'ht', 'ttc', 'mixte'],
      control: { type: 'radio' },
    },
    tooltipPosition: {
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
const Template = (args: MgInputRadioType): HTMLElement => <mg-input-radio {...filterArgs(args)}></mg-input-radio>;

export const MgInputRadio = {
  render: Template,
  args: {
    // Global
    value: null,
    items: ['ht', 'ttc', 'mixte'],
    identifier: 'identifier',
    name: 'input-name',
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
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  },
};

export const ItemsWithOptions = {
  render: Template,
  args: {
    ...MgInputRadio.args,
    required: true,
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
