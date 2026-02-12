import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgInputFile as MgInputFileType } from '../mg-input-file';

export default {
  component: 'mg-input-file',
  title: 'Molecules/Inputs/mg-input-file',
  parameters: { actions: { handles: ['value-change', 'input-valid'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgInputFileType): HTMLElement => (
  <mg-input-file
    {...filterArgs(args, {
      tooltipPosition: 'input',
    })}
  ></mg-input-file>
);
export const MgInputFile = {
  render: Template,
  args: {
    // Props
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    value: undefined,
    labelOnTop: false,
    labelHide: false,
    required: false,
    disabled: false,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    maxSize: undefined,
    accept: undefined,
    multiple: false,
    capture: undefined,
    helpText: 'Help file with html <b>bold</b>, <em>italic</em>.',
  },
};

const setFile = (fileName = 'batman') => new File([`file content: ${fileName}`], fileName, { type: 'text/plain' });

export const MgInputFileWithFiles = {
  render: Template,
  args: {
    ...MgInputFile.args,
    value: [setFile('batman.png'), setFile('joker.jpg')],
    accept: '.jpg, .png, .pdf',
    multiple: true,
  },
};
