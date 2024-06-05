import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgDetails as MgDetailsType } from '../mg-details';

export default {
  component: 'mg-details',
  title: 'Molecules/mg-details',
  parameters: { actions: { handles: ['expanded-change'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgDetailsType & { slotSummary: string; slotDetails: string }): HTMLElement => (
  <mg-details {...filterArgs(args)}>
    {args.slotSummary && <span slot="summary" innerHTML={args.slotSummary}></span>}
    {args.slotDetails && <p slot="details" innerHTML={args.slotDetails}></p>}
  </mg-details>
);

export const MgDetails = {
  render: Template,
  args: {
    slotSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    slotDetails:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    toggleClosed: 'Show details',
    toggleOpened: 'Hide details',
    expanded: false,
    hideSummary: false,
  },
};
