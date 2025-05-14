import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgPanel as MgPanelType } from '../mg-panel';

export default {
  component: 'mg-panel',
  title: 'Molecules/mg-panel',
  parameters: { actions: { handles: ['title-change', 'expanded-change'] } },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgPanelType): HTMLElement => (
  <mg-panel
    {...filterArgs(
      args,
      {
        titlePosition: 'left',
        expandToggleDisplay: 'text',
      },
      ['', 'header-right'],
    )}
    innerHTML={`${args['']}${args['header-right']}`}
  ></mg-panel>
);

export const MgPanel = {
  render: Template,
  args: {
    // Props
    'identifier': undefined,
    'panelTitle': 'title',
    'titlePattern': undefined,
    'titlePatternErrorMessage': undefined,
    'titleEditable': false,
    'titlePosition': undefined,
    'expanded': false,
    'expandToggleDisplay': undefined,
    'expandToggleDisabled': false,
    // Slots
    '': `<div>Content</div>`,
    'header-right': `<div slot="header-right" style="width:100%">
  <mg-badge label="item" value="1" style="margin-right:auto"></mg-badge>
  <mg-button variant="secondary">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>
</div>`,
  },
};
