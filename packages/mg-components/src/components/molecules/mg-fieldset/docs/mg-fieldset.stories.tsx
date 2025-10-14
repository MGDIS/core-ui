import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgFieldset as MgFieldsetType } from '../mg-fieldset';

export default {
  component: 'mg-fieldset',
  title: 'Molecules/mg-fieldset',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgFieldsetType & { slot: string }): HTMLMgFieldsetElement => (
  <mg-fieldset {...filterArgs(args)}>
    <mg-input-text identifier="identifier" label="input-text label"></mg-input-text>
    <mg-input-checkbox
      required
      identifier="identifier"
      label="input-checkbox label"
      value={[
        { title: 'batman', value: false },
        { title: 'joker', value: false },
      ]}
      helpText="mon helpText"
    ></mg-input-checkbox>
  </mg-fieldset>
);

export const MgFieldset = {
  render: Template,
  args: {
    identifier: 'identifier',
    legend: 'Legend',
    legendHide: false,
    legendIslabel: false,
    legendBorderHide: false,
    disabled: false,
    readonly: false,
    tooltip: 'This is a tooltip',
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};
