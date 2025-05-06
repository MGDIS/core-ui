import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
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
  <mg-popover
    {...filterArgs(
      args,
      {
        placement: 'bottom',
      },
      ['', 'title', 'content'],
    )}
    innerHTML={`${args['']}${args['title']}${args['content']}`}
  ></mg-popover>
);

export const MgPopover = {
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'placement': undefined,
    'arrowHide': false,
    'closeButton': false,
    'display': false,
    'disabled': false,
    // Slots
    '': `<mg-button>Button</mg-button>`,
    'content': `<p slot="content">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p><mg-button slot="content" popovertargetaction="hide">close</mg-button>`,
    'title': `<h2 slot="title">Blu bli blo bla</h2>`,
  },
};
