import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { sizes, variantStyles, variants } from '../mg-icon.conf';
import iconList from '@mgdis/img/dist/icons/index.json';

export default {
  component: 'mg-icon',
  title: 'Atoms/mg-icon',
  argTypes: {
    icon: {
      options: iconList,
      control: { type: 'select' },
    },
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    variant: {
      options: [undefined, ...variants],
      control: { type: 'select' },
    },
    variantStyle: {
      options: [undefined, ...variantStyles],
      control: { type: 'select' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => {
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
