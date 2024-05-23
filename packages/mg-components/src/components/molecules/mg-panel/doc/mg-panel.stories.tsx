import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import { expandToggleDisplays, titlePositions } from '../mg-panel.conf';
import type { MgPanel as MgPanelType } from '../mg-panel';

export default {
  component: 'mg-panel',
  title: 'Molecules/mg-panel',
  parameters: { actions: { handles: ['title-change', 'expanded-change'] } },
  argTypes: {
    titlePosition: {
      name: 'title-position',
      options: [...titlePositions],
      control: { type: 'select' },
    },
    expandToggleDisplay: {
      name: 'expand-toggle-display',
      options: [...expandToggleDisplays],
      control: { type: 'select' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgPanelType): HTMLElement => (
  <mg-panel {...filterArgs(args)}>
    <div>Content</div>
    <div slot="header-right" style={{ width: '100%' }}>
      <mg-badge label="1" value="1" style={{ 'margin-right': 'auto' }}></mg-badge>
      <mg-button variant="secondary">
        <mg-icon icon="file-upload"></mg-icon> Upload
      </mg-button>
      <mg-button is-icon variant="secondary" label="delete">
        <mg-icon icon="trash"></mg-icon>
      </mg-button>
    </div>
  </mg-panel>
);

export const MgPanel = {
  render: Template,
  args: {
    panelTitle: 'title',
    expanded: false,
    titleEditable: true,
    expandToggleDisplay: expandToggleDisplays[0],
    titlePosition: titlePositions[0],
    expandToggleDisabled: false,
  },
};
