import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
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
const Template = (args: MgInputPasswordType): HTMLElement => (
  <mg-input-password
    {...filterArgs(args, {
      mgWidth: 'full',
      tooltipPosition: 'input',
    })}
  ></mg-input-password>
);

export const MgInputPassword = {
  render: Template,
  args: {
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: 'placeholder',
    maxlength: undefined,
    required: false,
    readonly: false,
    disabled: false,
    mgWidth: 'full',
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};
