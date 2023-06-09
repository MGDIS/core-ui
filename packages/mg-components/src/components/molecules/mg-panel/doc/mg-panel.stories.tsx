import { h } from '@stencil/core';
import { filterArgs } from '../../../../../.storybook/utils';
import { expandToggleDisplays, titlePositions } from '../mg-panel.conf';

export default {
  component: 'mg-panel',
  title: 'Molecules/mg-panel',
  parameters: { actions: { handles: ['title-change', 'expanded-change'] } },
  argTypes: {
    titlePosition: {
      options: [...titlePositions],
      control: { type: 'select' },
    },
    expandToggleDisplay: {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any): HTMLElement => (
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
