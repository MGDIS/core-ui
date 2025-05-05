import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgSkipLinks as MgSkipLinksType } from '../mg-skip-links';

export default {
  component: 'mg-skip-links',
  title: 'Molecules/mg-skip-links',
  parameters: { actions: { handles: ['go-to-anchor'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgSkipLinksType): HTMLElement => <mg-skip-links {...filterArgs(args)}></mg-skip-links>;

export const MgSkipLinks = {
  render: Template,
  args: {
    links: [
      { href: '#content', label: 'Content' },
      { href: '#menu', label: 'Menu' },
      { href: '#search', label: 'Search' },
      { href: '#footer', label: 'Footer' },
    ],
  },
};
