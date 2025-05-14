import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgModal as MgModalType } from '../mg-modal';

export default {
  component: 'mg-modal',
  title: 'Molecules/mg-modal',
  parameters: { actions: { handles: ['component-show', 'component-hide'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgModalType & { '': string; 'actions': string }): HTMLElement => (
  <div>
    <mg-button
      aria-controls={args.identifier}
      aria-haspopup="dialog"
      /* eslint-disable-next-line react/jsx-no-bind */
      onClick={() => {
        const mgModal: HTMLMgModalElement = document.querySelector(`mg-modal`);
        mgModal.open = !mgModal.open;
      }}
    >
      Open modal
    </mg-button>
    <mg-modal
      {...filterArgs(
        args,
        {
          dialogRole: 'dialog',
        },
        ['', 'actions'],
      )}
      innerHTML={`${args['']}${args['actions']}`}
    ></mg-modal>
  </div>
);

export const MgModal = {
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'dialogRole': undefined,
    'modalTitle': 'Modal title',
    'closeButton': false,
    'open': false,
    // Slots
    '': `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    'actions': ``,
  },
};

export const WithCloseButton = {
  render: Template,
  args: {
    ...MgModal.args,
    identifier: 'identifier-close-button',
    closeButton: true,
  },
};

export const WithActions = {
  render: Template,
  args: {
    ...MgModal.args,
    closeButton: true,
    identifier: 'identifier-with-action',
    // Slots
    actions: `<mg-button slot="actions">Primary</mg-button>`,
  },
};
