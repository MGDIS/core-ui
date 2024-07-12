import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgActionMore as MgActionMoreType } from '../mg-action-more';

export default {
  component: 'mg-action-more',
  title: 'Molecules/mg-action-more',
  parameters: { actions: { handles: ['click'] } },
  argTypes: {
    button: {
      control: { type: 'object' },
    },
  },
};

const mouseEventHandler = () => {
  window.alert('This alert comme from the clicked item method "mouseEventHandler".');
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgActionMoreType): HTMLElement => <mg-action-more {...filterArgs(args)} style={{ 'margin-left': '1rem' }}></mg-action-more>;

export const MgActionMoreIcon = {
  render: Template,
  args: {
    items: [
      {
        label: 'element 1',
        mouseEventHandler,
      },
      {
        label: 'element 2',
        mouseEventHandler,
        badge: {
          value: 2,
          label: 'badge',
        },
      },
      {
        isDivider: true,
      },
      {
        label: 'element 3',
        mouseEventHandler,
        icon: 'user',
      },
      {
        label: 'element 4',
        mouseEventHandler,
        href: '#',
      },
      {
        label: 'element 5',
        mouseEventHandler,
        href: '/',
        target: '_blank',
      },
    ],
    displayChevron: false,
  },
};

export const MgActionMoreIconCustomAndLabel = {
  render: Template,
  args: {
    ...MgActionMoreIcon.args,
    button: {
      variant: 'flat',
      isIcon: false,
      label: 'mon user',
    },
    icon: {
      icon: 'user',
    },
  },
};

export const MgActionMoreIconCustomAndLabelAndChevron = {
  render: Template,
  args: {
    ...MgActionMoreIcon.args,
    button: {
      variant: 'flat',
      isIcon: false,
      label: 'mon user',
    },
    icon: {
      icon: 'user',
    },
    displayChevron: true,
  },
};

export const MgActionMoreLabelAndChevron = {
  render: Template,
  args: {
    ...MgActionMoreIcon.args,
    button: {
      variant: 'flat',
      isIcon: false,
      label: 'mon user',
    },
    displayChevron: true,
  },
};
