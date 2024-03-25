import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputText as MgInputTextType } from '../mg-input-text';
import { tooltipPositions } from '../../mg-input/mg-input.conf';

export default {
  component: 'mg-input-text',
  title: 'Molecules/Inputs/mg-input-text',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
  argTypes: {
    mgWidth: {
      options: [2, 4, 16, 'full'],
      control: { type: 'select' },
    },
    tooltipPosition: {
      options: [undefined, ...tooltipPositions],
      control: { type: 'select' },
    },
  },
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
    maxlength: 400,
    required: true,
    disabled: false,
    readonly: false,
    pattern: undefined,
    patternErrorMessage: undefined,
    mgWidth: 'full',
    type: 'text',
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Nb Char Left
    characterLeftHide: false,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  },
};

export const Email = {
  render: Template,
  args: {
    ...MgInputText.args,
    // remove feature to focus on pattern
    tooltip: '',
    required: false,
    label: 'Adresse email',
    // Add pattern Email rules
    maxlength: 100,
    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}',
    patternErrorMessage: "L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr)",
    // Help Text
    helpText: 'exemple : prenom.nom@exemple.fr',
  },
};

export const Emails = {
  render: Template,
  args: {
    ...Email.args,
    label: 'Adresses email',
    // Add pattern Emails rules
    maxlength: 200,
    pattern: '([a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}(;)*)+',
    patternErrorMessage: "L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr)",
    // Help Text
    helpText: 'exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr',
  },
};

export const RNA = {
  render: Template,
  args: {
    ...Emails.args,
    label: 'RNA',
    // Add pattern RNA rules
    maxlength: 10,
    pattern: '(W[0-9]{1}[a-zA-Z0-9]{1}[0-9]{7})',
    patternErrorMessage: "Le numéro RNA n'est pas valide (exemple: W123456789)",
    // Help Text
    helpText: 'exemple : W123456789',
  },
};

export const URL = {
  render: Template,
  args: {
    ...Emails.args,
    label: 'URL',
    // Add pattern URL rules
    maxlength: 200,
    pattern: 'https?://(?:www.)?([-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b)*(/[/dw.-]*)*(?:[?])*(.+)*',
    patternErrorMessage: "Le format du champ n'est pas valide (exemple: https://www.exemple.fr)",
    // Help Text
    helpText: 'Exemple: https://www.exemple.fr',
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
