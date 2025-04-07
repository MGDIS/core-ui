import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInput as MgInputType } from '../mg-input';

export default {
  component: 'mg-input',
  title: 'Molecules/Inputs/mg-input',
};

const classSizeFull = `<style>.size-full{flex:1}</style>`;
const inputFile = '<input type="file" id="identifier" class="mg-c-input__box"></input>';

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputType & { slot: string }): HTMLMgInputElement => (
  <mg-input
    {...filterArgs(
      args,
      {
        tooltipPosition: 'input',
      },
      [''],
    )}
    innerHTML={args['']}
  ></mg-input>
);

export const MgInput = {
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'label': 'Label',
    'labelOnTop': false,
    'labelHide': false,
    'tooltip': 'This is a tooltip',
    'tooltipPosition': undefined,
    'required': false,
    'errorMessage': 'Error to display',
    'helpText': 'Help text with html <b>bold</b>, <em>italic</em>.',
    'ariaDescribedbyIDs': undefined,
    // Slot
    '': inputFile,
  },
};

export const MgInputWithPanel = {
  render: Template,
  args: {
    ...MgInput.args,
    'helpText': undefined,
    'errorMessage': undefined,
    // Slot
    '': `${classSizeFull}<mg-panel panel-title="section" identifier="panel" class="size-full" expanded>${inputFile}</mg-panel>`,
  },
};

export const MgInputWithMgMessage = {
  render: Template,
  args: {
    ...MgInputWithPanel.args,
    // Slot
    '': `<mg-message id="identifier" variant="warning">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <mg-button slot="actions">Primary</mg-button>
</mg-message>`,
  },
};
