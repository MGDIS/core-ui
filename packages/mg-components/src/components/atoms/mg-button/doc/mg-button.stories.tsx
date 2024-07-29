import { h } from '@stencil/core';
import { variants } from '../mg-button.conf';
import iconList from '@mgdis/img/dist/icons/index.json';
import { filterArgs } from '@mgdis/stencil-helpers';
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
const Template = (args: MgButtonType & { slot: string }): HTMLElement => <mg-button {...filterArgs(args, { variant: variants[0] })} innerHTML={args.slot}></mg-button>;

export const MgButton = {
  render: Template,
  args: {
    slot: 'Text button',
    variant: variants[0],
    label: 'Explicit aria label',
    identifier: undefined,
    disabled: false,
    disableOnClick: false,
    isIcon: false,
    type: undefined,
    fullWidth: undefined,
  },
};

export const IsIcon = {
  render: Template,
  args: {
    ...MgButton.args,
    isIcon: true,
    slot: `<mg-icon icon="${iconList[0]}"></mg-icon>`,
  },
};

export const DisableOnClick = {
  render: Template,
  args: {
    ...MgButton.args,
    disableOnClick: true,
  },
};
