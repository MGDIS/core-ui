import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u,d;e((()=>{i(),n(),a={component:`mg-table`,title:`Molecules/mg-table`,tags:[`beta`],args:{borderHide:!1,fullWidth:!1}},o=e=>r(`mg-table`,{...t(e,{},[``]),innerHTML:e[``]}),s=`<table>
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
</table>`,c=e=>{let{"--mg-c-table-color-head-foot-background":n=`var(--mg-b-color-light)`,...i}=e;return r(`mg-table`,{...t(i,{},[``,`--mg-c-table-color-head-foot-background`]),style:{"--mg-c-table-color-head-foot-background":n},innerHTML:e[``]})},l={render:o,args:{columns:{1:{sortable:!0},2:{datatype:`date`,sortable:!0},3:{datatype:`numeric`,sortable:!0}},"":s}},u={render:c,args:{"--mg-c-table-color-head-foot-background":`var(--mg-b-color-light)`,columns:{1:{sortable:!0},2:{datatype:`date`,sortable:!0},3:{datatype:`numeric`,sortable:!0}},"":s},argTypes:{"--mg-c-table-color-head-foot-background":{name:`--mg-c-table-color-head-foot-background`,control:{type:`text`},table:{category:`custom properties`}}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    'columns': {
      1: {
        sortable: true
      },
      2: {
        datatype: 'date',
        sortable: true
      },
      3: {
        datatype: 'numeric',
        sortable: true
      }
    },
    // Slots
    '': tableSlotSortable
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: TemplateHeadFootLightBackground,
  args: {
    '--mg-c-table-color-head-foot-background': 'var(--mg-b-color-light)',
    'columns': {
      1: {
        sortable: true
      },
      2: {
        datatype: 'date',
        sortable: true
      },
      3: {
        datatype: 'numeric',
        sortable: true
      }
    },
    '': tableSlotSortable
  },
  argTypes: {
    '--mg-c-table-color-head-foot-background': {
      name: '--mg-c-table-color-head-foot-background',
      control: {
        type: 'text'
      },
      table: {
        category: 'custom properties'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d=[`MGTable`,`MGTableHeadFootLightBackground`]}))();export{l as MGTable,u as MGTableHeadFootLightBackground,d as __namedExportsOrder,a as default};