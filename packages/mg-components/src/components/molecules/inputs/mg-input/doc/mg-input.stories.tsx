import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInput as MgInputType } from '../mg-input';
import { tooltipPositions } from '../mg-input.conf';

export default {
  component: 'mg-input',
  title: 'Molecules/Inputs/mg-input',
  argTypes: {
    tooltipPosition: {
      options: [undefined, ...tooltipPositions],
      control: { type: 'select' },
    },
    readonlyValue: {
      control: { type: 'text' },
    },
  },
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
    identifier: 'identifier',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    required: true,
    readonlyValue: '',
    ariaDescribedbyIDs: undefined,
    classCollection: undefined,
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: 'label',
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
    errorMessage: 'Error to display',
    slot: '<input type="file" id="identifier" class="mg-c-input__box"></input>',
  },
};
