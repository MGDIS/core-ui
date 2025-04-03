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
const Template = (args: MgInputSelectType): HTMLElement => (
  <mg-input-select {...filterArgs(args, { placeholder: messages.input.select.placeholder, tooltipPosition: 'input' })}></mg-input-select>
);

export const MgInputSelect = {
  render: Template,
  args: {
    value: '',
    items: ['blu', 'bli', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'],
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: undefined,
    placeholderHide: false,
    placeholderDisabled: false,
    required: false,
    readonly: false,
    disabled: false,
    mgWidth: undefined,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};

export const WithObjectItems = {
  render: Template,
  args: {
    ...MgInputSelect.args,
    // remove extra
    tooltip: '',
    helpText: '',
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
