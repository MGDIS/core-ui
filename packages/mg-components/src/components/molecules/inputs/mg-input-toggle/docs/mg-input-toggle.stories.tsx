import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputToggle as MgInputToggleType } from '../mg-input-toggle';

export default {
  component: 'mg-input-toggle',
  title: 'Molecules/Inputs/mg-input-toggle',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputToggleType): HTMLMgInputToggleElement => (
  <mg-input-toggle
    {...filterArgs(
      args,
      {
        tooltipPosition: 'input',
      },
      ['item-1', 'item-2'],
    )}
    innerHTML={`${args['item-1']}${args['item-2']}`}
  ></mg-input-toggle>
);

export const MgInputToggle = {
  render: Template,
  args: {
    // Props
    'value': null,
    'items': [
      { title: 'non', value: false },
      { title: 'oui', value: true },
    ],
    'identifier': 'identifier',
    'name': 'input-name',
    'label': 'Label',
    'labelOnTop': false,
    'labelHide': false,
    'isOnOff': false,
    'isIcon': false,
    'readonly': false,
    'disabled': false,
    'tooltip': 'This is a tooltip',
    'tooltipPosition': undefined,
    'helpText': 'Help text with html <b>bold</b>, <em>italic</em>.',
    // Slots
    'item-1': `<span slot="item-1">Oui</span>`,
    'item-2': `<span slot="item-2">Non</span>`,
  },
};

export const MgInputToggleWithIcon = {
  render: Template,
  args: {
    ...MgInputToggle.args,
    'isIcon': true,
    'isOnOff': true,
    // Slots
    'item-1': `<mg-icon slot="item-1" icon="check"></mg-icon>`,
    'item-2': `<mg-icon slot="item-2" icon="cross"></mg-icon>`,
  },
};
