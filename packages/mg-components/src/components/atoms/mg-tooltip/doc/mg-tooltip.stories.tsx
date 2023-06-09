import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TemplateButton = (args: any): HTMLElement => (
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TemplateSpan = (args: any): HTMLElement => (
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
