import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgCard as MgCardType } from '../mg-card';

export default {
  component: 'mg-card',
  title: 'Atoms/mg-card',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgCardType & { slot: string }): HTMLElement => <mg-card {...filterArgs(args, undefined, [''])} innerHTML={args['']}></mg-card>;

export const MgCard = {
  render: Template,
  args: {
    '': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};
