import { h } from '@stencil/core';
import { filterArgs } from '../../../../../../.storybook/utils';

export default {
  component: 'mg-input-password',
  title: 'Molecules/Inputs/mg-input-password',
  argTypes: {
    mgWidth: {
      options: [2, 4, 16, 'full'],
      control: { type: 'select' },
    },
  },
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => <mg-input-password {...filterArgs(args)}></mg-input-password>;

export const MgInputPassword = {
  render: Template,
  args: {
    // Global
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    placeholder: 'placeholder',
    maxlength: 400,
    required: true,
    disabled: false,
    readonly: false,
    mgWidth: 'full',
    // Tooltip
    tooltip: 'This is a tooltip',
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RuleTemplate = (args: any): HTMLElement => {
  const displayCharacterLeft = args.displayCharacterLeft;
  delete args.displayCharacterLeft;
  let mgInput;
  let validity = true;
  const errorMessage = 'custom error';
  const setRef = el => {
    mgInput = el;
  };
  const handleClick = () => {
    validity = !validity;
    mgInput.setError(validity, errorMessage);
  };
  // return element
  return (
    <div>
      <mg-input-text {...filterArgs(args)} display-character-left={displayCharacterLeft ? undefined : 'false'} ref={setRef}></mg-input-text>
      <mg-button label="error" onClick={handleClick}>
        {validity ? 'Display custom error' : 'Hide custom error'}
      </mg-button>
    </div>
  );
};

export const RuleError = {
  render: RuleTemplate,

  args: {
    ...MgInputPassword.args,
  },
};
