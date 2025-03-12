import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputText as MgInputTextType } from '../mg-input-text';

export default {
  component: 'mg-input-text',
  title: 'Molecules/Inputs/mg-input-text',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputTextType): HTMLElement => {
  return <mg-input-text {...filterArgs(args)}></mg-input-text>;
};

export const MgInputText = {
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
    // Tooltip
    tooltip: 'This is a tooltip',
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};

export const Type = {
  render: Template,
  args: {
    ...MgInputText.args,
    // remove feature to focus on pattern
    tooltip: undefined,
    label: 'Adresse email',
    helpText: undefined,
    // Add pattern Email rules
    type: 'url',
  },
};

export const Pattern = {
  render: Template,
  args: {
    ...Type.args,
    // remove feature to focus on pattern
    tooltip: undefined,
    label: 'Adresse email',
    helpText: undefined,
    // Add pattern Email rules
    type: 'email',
    pattern:
      /^[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/
        .source, // From https://gitlab.mgdis.fr/core/core-back/core/-/blob/master/packages/validators/src/email/email.ts#L10
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchTemplate = (args: MgInputTextType): HTMLElement => {
  // return element
  return (
    <form role="search">
      <mg-input-text {...filterArgs(args)}>
        <mg-button slot="append-input" label="search">
          <mg-icon icon="magnifying-glass"></mg-icon> Search
        </mg-button>
      </mg-input-text>
    </form>
  );
};

export const Search = {
  render: SearchTemplate,

  args: {
    ...MgInputText.args,
    type: 'search',
    icon: 'magnifying-glass',
  },
};

export const Datalist = {
  render: Template,

  args: {
    ...MgInputText.args,
    type: 'text',
    icon: 'magnifying-glass',
    datalistoptions: ['agent', 'admin', 'user'],
  },
};

export const DatalistOption = {
  render: Template,

  args: {
    ...MgInputText.args,
    type: 'text',
    icon: 'magnifying-glass',
    datalistoptions: [
      { title: 'agent', value: '/agent/123' },
      { title: 'admin', value: '/admin/123' },
      { title: 'user', value: '/user/123' },
    ],
  },
};
