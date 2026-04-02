import{h as o}from"./index-D8HVAEo-.js";import{f as r}from"./iframe-DKP2BhGE.js";import"./preload-helper-PPVm8Dsz.js";const u={component:"mg-table",title:"Molecules/mg-table",tags:["beta"],args:{borderHide:!1,fullWidth:!1}},c=t=>o("mg-table",{...r(t,{},[""]),innerHTML:t[""]}),n=`<table>
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
</table>`,s=t=>{const{"--mg-c-table-color-head-foot-background":d="var(--mg-b-color-light)",...l}=t;return o("mg-table",{...r(l,{},["","--mg-c-table-color-head-foot-background"]),style:{"--mg-c-table-color-head-foot-background":d},innerHTML:t[""]})},e={render:c,args:{columns:{1:{sortable:!0},2:{datatype:"date",sortable:!0},3:{datatype:"numeric",sortable:!0}},"":n}},a={render:s,args:{"--mg-c-table-color-head-foot-background":"var(--mg-b-color-light)",columns:{1:{sortable:!0},2:{datatype:"date",sortable:!0},3:{datatype:"numeric",sortable:!0}},"":n},argTypes:{"--mg-c-table-color-head-foot-background":{name:"--mg-c-table-color-head-foot-background",control:{type:"text"},table:{category:"custom properties"}}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const h=["MGTable","MGTableHeadFootLightBackground"];export{e as MGTable,a as MGTableHeadFootLightBackground,h as __namedExportsOrder,u as default};
