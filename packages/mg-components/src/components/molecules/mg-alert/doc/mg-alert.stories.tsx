import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { variantStyles, variants } from '../mg-alert.conf';
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
const Template = (args: MgAlertType & { slotContent: string; slotActions: string }): HTMLElement => (
  <mg-alert {...filterArgs(args, { variant: variants[0], variantStyle: variantStyles[0] })}>
    {args.slotContent && <span innerHTML={args.slotContent}></span>}
    {args.slotActions && <span slot="actions" innerHTML={args.slotActions}></span>}
  </mg-alert>
);

export const MgAlert = {
  render: Template,
  args: {
    slotContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
    slotActions: ``,
    hidden: false,
  },
};

export const WithActions = {
  render: Template,
  args: {
    ...MgAlert.args,
    variant: 'warning',
    slotActions: `<div><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>`,
  },
};
