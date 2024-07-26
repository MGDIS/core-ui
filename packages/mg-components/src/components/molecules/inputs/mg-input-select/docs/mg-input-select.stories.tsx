import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import messages from '../../../../../locales/en/messages.json';
import type { MgInputSelect as MgInputSelectType } from '../mg-input-select';

export default {
  component: 'mg-input-select',
  title: 'Molecules/Inputs/mg-input-select',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputSelectType): HTMLElement => <mg-input-select {...filterArgs(args, { placeholder: messages.input.select.placeholder })}></mg-input-select>;

export const MgInputSelect = {
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
    required: true,
    readonly: false,
    disabled: false,
    items: ['blu', 'bli', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'],
    mgWidth: undefined,
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    // Placeholder
    placeholder: undefined,
    placeholderHide: false,
    placeholderDisabled: false,
  },
};

export const WithObjectItems = {
  render: Template,
  args: {
    ...MgInputSelect.args,
    // remove feature to focus on pattern
    tooltip: '',
    helpText: '',
    required: false,
    //
    items: [
      { title: 'blu', value: 'blublu' },
      { title: 'bli', value: 'blibli' },
      { title: 'blo', value: 'bloblo' },
      { title: 'bla', value: 'blabla', disabled: true },
    ],
  },
};

export const WithGroups = {
  render: Template,
  args: {
    ...WithObjectItems.args,
    items: [
      { title: 'blu', value: 'blublu', group: '1st group' },
      { title: 'bli', value: 'blibli', group: '2nd group' },
      { title: 'blo', value: 'bloblo', group: '1st group' },
      { title: 'bla', value: 'blabla' },
    ],
  },
};
