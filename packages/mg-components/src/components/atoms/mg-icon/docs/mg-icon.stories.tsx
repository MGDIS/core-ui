import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import { sizes } from '../mg-icon.conf';
import iconList from '@mgdis/img/dist/icons/index.json';
import type { MgIcon as MgIconType } from '../mg-icon';

export default {
  component: 'mg-icon',
  title: 'Atoms/mg-icon',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgIconType): MgIconType => <mg-icon {...filterArgs(args, { size: sizes[1] })}></mg-icon>;

export const MgIcon = {
  render: Template,
  args: {
    icon: iconList[0],
    size: undefined,
    variant: undefined,
    variantStyle: undefined,
    spin: false,
  },
};
