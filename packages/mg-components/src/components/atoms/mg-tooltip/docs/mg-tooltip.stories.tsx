import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/storybook';
import type { MgTooltip as MgTooltipType } from '../mg-tooltip';

export default {
  component: 'mg-tooltip',
  title: 'Atoms/mg-tooltip',
  parameters: {
    layout: 'centered',
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgTooltipType): HTMLElement => <mg-tooltip {...filterArgs(args, { placement: 'bottom' }, [''])} innerHTML={args['']}></mg-tooltip>;

export const MgTooltip = {
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'message': 'This is a tooltip message',
    'placement': undefined,
    'display': false,
    'disabled': false,
    // Slot
    '': '<mg-icon icon="info-circle"></mg-icon>',
  },
};

export const MgTooltipOnButton = {
  render: Template,
  args: {
    ...MgTooltip.args,
    // Slot
    '': `<mg-button>Action</mg-button>`,
  },
};

export const MgTooltipOnSpan = {
  render: Template,

  args: {
    ...MgTooltip.args,
    // Slot
    '': `<span>any text</span>`,
  },
};
