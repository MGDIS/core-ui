import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgAlert as MgAlertType } from '../mg-alert';

export default {
  component: 'mg-alert',
  title: 'Molecules/mg-alert',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgAlertType & { '': string; 'actions': string }): HTMLElement => (
  <mg-alert
    {...filterArgs(
      args,
      {
        variant: 'info',
        variantStyle: 'bar-left',
      },
      ['', 'actions'],
    )}
    innerHTML={`${args['']}${args.actions}`}
  ></mg-alert>
);

export const MgAlert = {
  render: Template,
  args: {
    // Props
    'delay': undefined,
    'variant': undefined,
    'variantStyle': undefined,
    // Native attributes
    'hidden': false,
    // Slots
    '': '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
    'actions': '',
  },
};

export const WithActions = {
  render: Template,
  args: {
    ...MgAlert.args,
    variant: 'warning',
    actions: `<mg-button slot="actions">Primary</mg-button>`,
  },
};
