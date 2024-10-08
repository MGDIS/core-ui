import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { variantStyles, variants } from '../mg-message.conf';
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
const Template = (args: MgMessageType & { slotContent: string; slotActions: string }): HTMLElement => (
  <mg-message {...filterArgs(args, { variant: variants[0], variantStyle: variantStyles[0] })}>
    {args.slotContent && <span innerHTML={args.slotContent}></span>}
    {args.slotActions && <span slot="actions" innerHTML={args.slotActions}></span>}
  </mg-message>
);

export const MgMessage = {
  render: Template,
  args: {
    slotContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    slotActions: ``,
    variant: variants[0], // info
    variantStyle: variantStyles[0], // bar-left
  },
};

export const WithActions = {
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'warning',
    slotActions: `<div><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>`,
  },
};
