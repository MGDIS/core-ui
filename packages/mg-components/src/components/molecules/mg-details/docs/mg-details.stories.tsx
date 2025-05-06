import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
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
const Template = (args: MgDetailsType & { summary: string; details: string }): HTMLElement => (
  <mg-details {...filterArgs(args, undefined, ['summary', 'details'])} innerHTML={`${args.summary}${args.details}`}></mg-details>
);

export const MgDetails = {
  render: Template,
  args: {
    // Props
    toggleClosed: 'Show details',
    toggleOpened: 'Hide details',
    hideSummary: false,
    expanded: false,
    // Slots
    summary: '<span slot="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>',
    details:
      '<p slot="details">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
  },
};
