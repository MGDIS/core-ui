import { h } from '@stencil/core';
import { filterArgs } from '@mgdis/core-ui-helpers/dist/storybook';
import type { MgTable as MgTableType } from '../mg-table';

export default {
  component: 'mg-table',
  title: 'Molecules/mg-table',
  tags: ['beta'],
  args: {
    borderHide: false,
    fullWidth: false,
  },
};

/**
 * Template
 * @param args - component arguments
 * @returns HTMLElement
 */
const Template = (args: MgTableType & { slotContent: string }): HTMLElement => <mg-table {...filterArgs(args, {}, [''])} innerHTML={args['']}></mg-table>;

const tableSlotSortable = `<table>
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
</table>`;

/**
 * Same as default table with `--mg-c-table-color-head-foot-background` set to light (header/footer match table body).
 * @param args - component arguments
 * @returns HTMLMgTableElement
 */
const TemplateHeadFootLightBackground = (args: MgTableType & { 'slotContent': string; '--mg-c-table-color-head-foot-background'?: string }): HTMLElement => {
  const { '--mg-c-table-color-head-foot-background': headFootBackground = 'var(--mg-b-color-light)', ...tableArgs } = args;
  return (
    <mg-table
      {...filterArgs(tableArgs, {}, ['', '--mg-c-table-color-head-foot-background'])}
      style={{
        '--mg-c-table-color-head-foot-background': headFootBackground,
      }}
      innerHTML={args['']}
    ></mg-table>
  );
};

export const MGTable = {
  render: Template,
  args: {
    'columns': { 1: { sortable: true }, 2: { datatype: 'date', sortable: true }, 3: { datatype: 'numeric', sortable: true } },
    // Slots
    '': tableSlotSortable,
  },
};

export const MGTableHeadFootLightBackground = {
  render: TemplateHeadFootLightBackground,
  args: {
    '--mg-c-table-color-head-foot-background': 'var(--mg-b-color-light)',
    'columns': { 1: { sortable: true }, 2: { datatype: 'date', sortable: true }, 3: { datatype: 'numeric', sortable: true } },
    '': tableSlotSortable,
  },
  argTypes: {
    '--mg-c-table-color-head-foot-background': {
      name: '--mg-c-table-color-head-foot-background',
      control: { type: 'text' },
      table: {
        category: 'custom properties',
      },
    },
  },
};
