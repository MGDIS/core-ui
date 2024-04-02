/* eslint-disable react/jsx-no-bind */
import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { dialogRoles } from '../mg-modal.conf';
import type { MgModal as MgModalType } from '../mg-modal';

export default {
  component: 'mg-modal',
  title: 'Molecules/mg-modal',
  argTypes: {
    dialogRole: {
      options: [undefined, ...dialogRoles],
      control: { type: 'select' },
    },
  },
  parameters: { actions: { handles: ['component-show', 'component-hide'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgModalType & { slotContent: string; slotActions: string }): HTMLElement => (
  <div>
    <mg-button
      aria-controls={args.identifier}
      aria-haspopup="dialog"
      onClick={() => {
        const mgModal: HTMLMgModalElement = document.querySelector(`mg-modal`);
        mgModal.hidden = !mgModal.hidden;
      }}
    >
      Open modal
    </mg-button>
    <mg-modal {...filterArgs(args)}>
      {args.slotContent && <div slot="content" innerHTML={args.slotContent}></div>}
      {args.slotActions && <div slot="actions" innerHTML={args.slotActions}></div>}
    </mg-modal>
  </div>
);

export const MgModal = {
  render: Template,
  args: {
    slotContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    slotActions: ``,
    modalTitle: 'Modal title',
    identifier: 'identifier',
    closeButton: false,
    hidden: true,
    dialogRole: dialogRoles[0],
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
    slotActions: `<div class="mg-l-group-elements mg-l-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>`,
  },
};
