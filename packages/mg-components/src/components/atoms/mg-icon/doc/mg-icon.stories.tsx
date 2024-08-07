import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
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
const Template = (args: MgIconType & { color: string }): HTMLElement => {
  const color = args.color;
  delete args.color;
  // return element
  return (
    <div style={{ color }}>
      <mg-icon {...filterArgs(args, { size: sizes[1] })}></mg-icon>
    </div>
  );
};

export const MgIcon = {
  render: Template,
  args: {
    color: '',
    icon: iconList[0],
    size: undefined,
    spin: false,
  },
};
