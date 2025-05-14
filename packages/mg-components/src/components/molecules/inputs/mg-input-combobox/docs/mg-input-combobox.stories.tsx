import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgInputCombobox as MgInputComboboxType } from '../mg-input-combobox';
import { type ItemType } from '../mg-input-combobox.conf';

export default {
  component: 'mg-input-combobox',
  title: 'Molecules/Inputs/mg-input-combobox',
  parameters: { actions: { handles: ['value-change', 'input-valid', 'filter-change', 'load-more'] } },
  tags: ['beta'],
};

const getOptionsItems = (length: number): ItemType[] => new Array(length).fill(() => '').map((_, index) => ({ title: `title ${index + 1}`, value: `/${index + 1}` }));

/**
 * Template
 * @param args - component arguments
 * @returns HTMLMgInputComboboxElement
 */
const Template = (args: MgInputComboboxType): HTMLMgInputComboboxElement => <mg-input-combobox {...filterArgs(args)}></mg-input-combobox>;

export const MgInputComboboxStringItems = {
  render: Template,
  args: {
    value: '',
    items: ['Batman', 'Robin', 'Joker'],
    itemsLabel: 'DC Comics',
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: 'placeholder',
    required: false,
    readonly: false,
    disabled: false,
    mgWidth: undefined,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    fetchurl: undefined,
    fetchoptions: undefined,
    fetchmappings: undefined,
  },
};

export const MgInputComboboxOptionsItems = {
  render: Template,
  args: {
    ...MgInputComboboxStringItems.args,
    items: getOptionsItems(100),
  },
};

const RequestMapping = {
  filter: '{q}',
};

const ResponseMapping = {
  items: 'd.results',
  total: 'd.__count',
  next: 'd.__next',
  itemTitle: 'libpayscourtmaj',
  itemValue: 'codpaysnum',
};

export const MgInputComboboxAPI = {
  render: Template,
  args: {
    ...MgInputComboboxStringItems.args,
    items: undefined,
    fetchurl: `https://mdmmgdis.mgcloud.fr/dataserver/mdmmgdis/data/mdmpays?$format=json&$top=20&$inlinecount=allpages&$orderby=${encodeURIComponent('libpayscourtmaj asc')}&$filter=${encodeURIComponent("langue eq 'fr' and substringof('")}${RequestMapping.filter}${encodeURIComponent("',tolower(libpayscourtmaj))")}`,
    fetchmappings: {
      request: RequestMapping,
      response: ResponseMapping,
    },
  },
};
