import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgInputRichTextEditor as MgInputRichTextEditorType } from '../mg-input-rich-text-editor';

export default {
  component: 'mg-input-rich-text-editor',
  title: 'Molecules/Inputs/mg-input-rich-text-editor',
  tags: ['beta'],
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputRichTextEditorType): HTMLMgInputRichTextEditorElement => (
  <mg-input-rich-text-editor {...filterArgs(args, { tooltipPosition: 'input' })}></mg-input-rich-text-editor>
);

export const MgInputRichTextEditor = {
  render: Template,
  args: {
    value: '',
    identifier: 'identifier',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: 'Saisissez votre texte ici...',
    required: false,
    readonly: false,
    disabled: false,
    pattern: undefined,
    patternErrorMessage: undefined,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};
