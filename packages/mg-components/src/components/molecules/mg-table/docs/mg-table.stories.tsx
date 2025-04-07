import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/stencil-helpers';
import type { MgTable as MgTableType } from '../mg-table';

export default {
  component: 'mg-table',
  title: 'Molecules/mg-table',
  tags: ['beta'],
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgTableType & { slotContent: string }): HTMLElement => (
  <mg-table
    {...filterArgs(
      args,
      {
        size: 'medium',
      },
      [''],
    )}
    innerHTML={args['']}
  ></mg-table>
);

export const MGTable = {
  render: Template,
  args: {
    'size': undefined,
    'fullWidth': false,
    'columns': { 1: { sortable: true }, 2: { datatype: 'date', sortable: true }, 3: { datatype: 'numeric', sortable: true } },
    // Slots
    '': `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Birthday</th>
      <th>Age</th>
      <th>Role</th>
      <th>Test signature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Simon</th>
      <td data-sort="1982-06-02">02/06/1982</td>
      <td>42</td>
      <td>Archi</td>
      <td>Blu / Daron Crew</td>
    </tr>
    <tr>
      <th>Nico</th>
      <td data-sort="1987-10-31">31/10/1987</td>
      <td>35</td>
      <td>Dev front-end</td>
      <td>DC Comics (Batman, Jocker, etc.)</td>
    </tr>
    <tr>
      <th>Guirec</th>
      <td data-sort="1985-12-30">30/12/1985</td>
      <td>39</td>
      <td>Dev front-end</td>
      <td>Pat'Patrouille</td>
    </tr>
  </tbody>
</table>`,
  },
};
