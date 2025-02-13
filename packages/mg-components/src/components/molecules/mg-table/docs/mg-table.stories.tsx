import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgTable as MgTableType } from '../mg-table';
import { alignments } from '../mg-table.conf';

export default {
  component: 'mg-table',
  title: 'Molecules/mg-table',
  tags: ['beta'],
  argTypes: {
    columnsAlignment: {
      options: [undefined, ...alignments],
      control: { type: 'select' },
    },
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgTableType & { slotContent: string }): HTMLElement => (
  <mg-table {...filterArgs(args)}>
    <table>
      <thead>
        <tr>
          <th>Dev</th>
          <th>Role</th>
          <th>Test signature</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Simon</th>
          <td>Archi front-end</td>
          <td>Blu / Daron Crew</td>
        </tr>
        <tr>
          <th>Nico</th>
          <td>Dev front-end</td>
          <td>DC Comics (Batman, Jocker, etc.)</td>
        </tr>
        <tr>
          <th>Guirec</th>
          <td>Dev front-end</td>
          <td>Pat'Patrouille</td>
        </tr>
      </tbody>
    </table>
  </mg-table>
);

export const MGTable = {
  render: Template,
  args: {
    fullWidth: false,
  },
};
