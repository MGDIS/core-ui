import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputPassword as MgInputPasswordType } from '../mg-input-password';
import { tooltipPositions } from '../../mg-input/mg-input.conf';

export default {
  component: 'mg-input-password',
  title: 'Molecules/Inputs/mg-input-password',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
  argTypes: {
    mgWidth: {
      name: 'mg-width',
      options: [2, 4, 16, 'full'],
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
const Template = (args: MgInputPasswordType): HTMLElement => <mg-input-password {...filterArgs(args)}></mg-input-password>;

export const MgInputPassword = {
  render: Template,
  args: {
    // Global
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    placeholder: 'placeholder',
    maxlength: 400,
    required: true,
    disabled: false,
    readonly: false,
    mgWidth: 'full',
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  },
};
