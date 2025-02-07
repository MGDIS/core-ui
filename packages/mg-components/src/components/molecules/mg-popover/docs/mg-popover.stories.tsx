import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgPopover as MgPopoverType } from '../mg-popover';

export default {
  component: 'mg-popover',
  title: 'Molecules/mg-popover',
  parameters: {
    layout: 'centered',
    docs: { iframeHeight: 600 },
    actions: { handles: ['display-change'] },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgPopoverType & { slotTitle: string; slotContent: HTMLElement[] }): HTMLElement => (
  <mg-popover {...filterArgs(args, { placement: 'bottom' })}>
    <mg-button>Button</mg-button>
    {args.slotTitle && <h2 slot="title">{args.slotTitle}</h2>}
    {args.slotContent && <p slot="content">{args.slotContent}</p>}
  </mg-popover>
);

export const MgPopover = {
  render: Template,
  args: {
    slotTitle: `Blu bli blo bla`,
    slotContent: [
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </span>,
      <div>
        <mg-button popovertargetaction="hide">close</mg-button>
      </div>,
    ],
    identifier: 'identifier',
    closeButton: false,
    disabled: false,
    display: false,
    placement: undefined,
  },
};
