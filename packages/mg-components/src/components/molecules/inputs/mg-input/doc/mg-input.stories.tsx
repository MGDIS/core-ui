import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInput as MgInputType } from '../mg-input';

export default {
  component: 'mg-input',
  title: 'Molecules/Inputs/mg-input',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputType & { slot: string }): HTMLMgInputElement => <mg-input {...filterArgs(args)} innerHTML={args.slot}></mg-input>;

export const MgInput = {
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
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
    slot: '<mg-input-text label="label"></mg-input-text>',
  },
};
