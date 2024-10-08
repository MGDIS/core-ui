import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputPassword as MgInputPasswordType } from '../mg-input-password';

export default {
  component: 'mg-input-password',
  title: 'Molecules/Inputs/mg-input-password',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
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
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};
