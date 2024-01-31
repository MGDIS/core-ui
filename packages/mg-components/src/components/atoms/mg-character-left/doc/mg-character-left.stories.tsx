import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgCharacterLeft as MgCharacterLeftType } from '../mg-character-left';

export default {
  component: 'mg-character-left',
  title: 'Atoms/mg-character-left',
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgCharacterLeftType): HTMLElement => <mg-character-left {...filterArgs(args)}></mg-character-left>;

export const MgCharacterLeft = {
  render: Template,
  args: {
    identifier: 'identifier',
    characters: '',
    maxlength: 400,
  },
};
