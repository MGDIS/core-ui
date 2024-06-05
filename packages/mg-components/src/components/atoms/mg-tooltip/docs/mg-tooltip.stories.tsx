import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgTooltip as MgTooltipType } from '../mg-tooltip';

export default {
  component: 'mg-tooltip',
  title: 'Atoms/mg-tooltip',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgTooltipType): HTMLElement => (
  <mg-tooltip {...filterArgs(args, { placement: 'bottom' })}>
    <mg-icon icon="info-circle"></mg-icon>
  </mg-tooltip>
);

export const MgTooltip = {
  render: Template,
  args: {
    identifier: 'identifier',
    message: 'This is a tooltip message',
    placement: undefined,
    display: false,
    disabled: false,
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const TemplateButton = (args: MgTooltipType): HTMLElement => (
  <mg-tooltip {...filterArgs(args, { placement: 'bottom' })}>
    <mg-button>Action</mg-button>
  </mg-tooltip>
);

export const MgTooltipOnButton = {
  render: TemplateButton,

  args: {
    ...MgTooltip.args,
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const TemplateSpan = (args: MgTooltipType): HTMLElement => (
  <mg-tooltip {...filterArgs(args, { placement: 'bottom' })}>
    <span>any text</span>
  </mg-tooltip>
);

export const MgTooltipOnSpan = {
  render: TemplateSpan,

  args: {
    ...MgTooltip.args,
  },
};
