import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgMessage as MgMessageType } from '../mg-message';

export default {
  component: 'mg-message',
  title: 'Molecules/mg-message',
  parameters: { actions: { handles: ['component-show', 'component-hide'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgMessageType & { '': string; 'actions': string }): HTMLElement => (
  <mg-message
    {...filterArgs(
      args,
      {
        variant: 'info',
        variantStyle: 'bar-left',
      },
      ['', 'actions'],
    )}
    innerHTML={`${args['']}${args['actions']}`}
  ></mg-message>
);

export const MgMessage = {
  render: Template,
  args: {
    // Props
    'variant': undefined,
    'variantStyle': undefined,
    // Slots
    '': `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    'actions': ``,
  },
};

export const WithActions = {
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'warning',
    actions: `<mg-button slot="actions">Primary</mg-button>`,
  },
};
