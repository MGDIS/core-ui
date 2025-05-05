import { h } from '@stencil/core';
import { sizes, variants } from '../mg-button.conf';
import iconList from '@mgdis/img/dist/icons/index.json';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgButton as MgButtonType } from '../mg-button';

export default {
  component: 'mg-button',
  title: 'Atoms/mg-button',
  parameters: { actions: { handles: ['disabled-change'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgButtonType & { slot: string }): HTMLElement => (
  <mg-button {...filterArgs(args, { variant: variants[0], size: sizes[0] }, [''])} innerHTML={args['']}></mg-button>
);

export const MgButton = {
  render: Template,
  args: {
    // Props
    'variant': undefined,
    'label': 'Explicit aria label',
    'type': undefined,
    'size': undefined,
    'fullWidth': false,
    'form': '',
    'disabled': false,
    'isIcon': false,
    'disableOnClick': false,
    // Slot
    '': 'Text button',
  },
};

export const IsIcon = {
  render: Template,
  args: {
    ...MgButton.args,
    'isIcon': true,
    '': `<mg-icon icon="${iconList[0]}"></mg-icon>`,
  },
};

export const DisableOnClick = {
  render: Template,
  args: {
    ...MgButton.args,
    disableOnClick: true,
  },
};
