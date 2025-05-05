import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
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
const Template = (args: MgInputTextType): HTMLElement => (
  <mg-input-text
    {...filterArgs(
      args,
      {
        type: 'text',
        maxlength: 400,
        mgWidth: 'full',
        tooltipPosition: 'input',
      },
      ['append-input'],
    )}
    innerHTML={args['append-input']}
  ></mg-input-text>
);
export const MgInputText = {
  render: Template,
  args: {
    // Props
    'value': '',
    'identifier': 'identifier',
    'name': 'input-name',
    'label': 'Label',
    'labelOnTop': false,
    'labelHide': false,
    'type': undefined,
    'icon': undefined,
    'placeholder': 'placeholder',
    'datalistoptions': undefined,
    'maxlength': undefined,
    'required': false,
    'readonly': false,
    'disabled': false,
    'mgWidth': undefined,
    'pattern': undefined,
    'patternErrorMessage': undefined,
    'tooltip': 'This is a tooltip',
    'tooltipPosition': undefined,
    'characterLeftHide': false,
    'helpText': 'Help text with html <b>bold</b>, <em>italic</em>.',
    // Slot
    'append-input': '',
  },
};

export const Type = {
  render: Template,
  args: {
    ...MgInputText.args,
    type: 'url',
    // remove extra
    tooltip: undefined,
    label: 'Site web',
    helpText: undefined,
  },
};

export const Pattern = {
  render: Template,
  args: {
    ...Type.args,
    type: 'email',
    label: 'Adresse email',
    pattern:
      /^[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/
        .source, // From https://gitlab.mgdis.fr/core/core-back/core/-/blob/master/packages/validators/src/email/email.ts#L10
  },
};

export const Search = {
  render: Template,
  args: {
    ...MgInputText.args,
    'type': 'search',
    'icon': 'magnifying-glass',
    // Slot
    'append-input': `<mg-button slot="append-input" label="search">
        <mg-icon icon="magnifying-glass"></mg-icon>Search
      </mg-button>`,
  },
};

export const Datalist = {
  render: Template,
  args: {
    ...MgInputText.args,
    icon: 'magnifying-glass',
    datalistoptions: ['agent', 'admin', 'user'],
  },
};

export const DatalistOption = {
  render: Template,

  args: {
    ...Datalist.args,
    datalistoptions: [
      { title: 'agent', value: '/agent/123' },
      { title: 'admin', value: '/admin/123' },
      { title: 'user', value: '/user/123' },
    ],
  },
};
