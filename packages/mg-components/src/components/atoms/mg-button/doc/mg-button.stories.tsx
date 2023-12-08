import { h } from '@stencil/core';
import { variants, buttonTypes } from '../mg-button.conf';
import iconList from '@mgdis/img/dist/icons/index.json';
import { filterArgs } from '../../../../../.storybook/utils';

export default {
  component: 'mg-button',
  title: 'Atoms/mg-button',
  argTypes: {
    type: {
      options: [undefined, ...buttonTypes],
      control: { type: 'select' },
    },
  },
  parameters: { actions: { handles: ['disabled-change'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-button {...filterArgs(args, { variant: variants[0] })} innerHTML={args.slot}></mg-button>;

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
