import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInput as MgInputType } from '../mg-input';

export default {
  component: 'mg-input',
  title: 'Molecules/Inputs/mg-input',
};

const classSizeFull = `
<style>
  .size-full {
    flex: 1;
  }
</style>
`;

const inputFile = '<input type="file" id="identifier" class="mg-c-input__box"></input>';

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
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: 'label',
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    errorMessage: 'Error to display',
    slot: inputFile,
  },
};

export const MgInputWithPanel = {
  render: Template,
  args: {
    ...MgInput.args,
    slot: `${classSizeFull}<mg-panel panel-title="section" identidier="panel" class="size-full" expanded>${inputFile}</mg-panel>`,
    helpText: undefined,
    errorMessage: undefined,
  },
};

export const MgInputWithMgMessage = {
  render: Template,
  args: {
    ...MgInputWithPanel.args,
    slot: `<mg-message identifier="identifier" variant="warning"><span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></span><span slot="actions"><div class="mg-l-group-elements mg-l-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div></span></mg-message>`,
  },
};
