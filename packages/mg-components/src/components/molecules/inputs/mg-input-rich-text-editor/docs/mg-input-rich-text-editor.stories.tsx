import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgInputRichTextEditor as MgInputRichTextEditorType } from '../mg-input-rich-text-editor';

export default {
  component: 'mg-input-rich-text-editor',
  title: 'Molecules/Inputs/mg-input-rich-text-editor',
  tags: ['beta'],
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputRichTextEditorType): HTMLMgInputRichTextEditorElement => <mg-input-rich-text-editor {...filterArgs(args)}></mg-input-rich-text-editor>;

export const MgInputRichTextEditor = {
  render: Template,
  args: {
    // Global
    value: '',
    identifier: 'identifier',

    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,

    // Input
    required: true,
    readonly: false,
    placeholder: 'Saisissez votre texte ici...',
    rows: 5,
    modules: {
      toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']],
    },

    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,

    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
  },
};
