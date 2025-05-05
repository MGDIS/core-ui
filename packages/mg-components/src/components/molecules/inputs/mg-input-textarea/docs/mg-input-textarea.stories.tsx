import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
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
  return (
    <mg-input-textarea
      {...filterArgs(args, {
        maxlength: 4000,
        mgWidth: 'full',
        rows: 3,
        tooltipPosition: 'input',
        resizable: 'none',
      })}
    ></mg-input-textarea>
  );
};

export const MgInputTextarea = {
  render: Template,
  args: {
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: 'placeholder',
    maxlength: 4000,
    required: false,
    readonly: false,
    disabled: false,
    mgWidth: undefined,
    pattern: undefined,
    patternErrorMessage: undefined,
    rows: 3,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    characterLeftHide: false,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    resizable: undefined,
  },
};
