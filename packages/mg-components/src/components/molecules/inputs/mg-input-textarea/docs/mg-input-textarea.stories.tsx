import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputTextarea as MgInputTextareaType } from '../mg-input-textarea';

export default {
  component: 'mg-input-textarea',
  title: 'Molecules/Inputs/mg-input-textarea',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputTextareaType): HTMLElement => {
  // return element
  return <mg-input-textarea {...filterArgs(args)}></mg-input-textarea>;
};

export const MgInputTextarea = {
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
    maxlength: 4000,
    required: true,
    disabled: false,
    readonly: false,
    pattern: undefined,
    patternErrorMessage: undefined,
    rows: 3,
    mgWidth: 'full',
    resizable: 'none',
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Nb Char Left
    characterLeftHide: false,
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};
