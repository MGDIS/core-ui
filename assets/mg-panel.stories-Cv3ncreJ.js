import{h as i}from"./index-BdigElPL.js";import{f as a}from"./iframe-a__NqWOS.js";const d={component:"mg-panel",title:"Molecules/mg-panel",parameters:{actions:{handles:["title-change","expanded-change"]}}},n=t=>i("mg-panel",{...a(t,{titlePosition:"left",expandToggleDisplay:"text"},["","header-right"]),innerHTML:`${t[""]}${t["header-right"]}`}),e={render:n,args:{identifier:void 0,panelTitle:"title",titlePattern:void 0,titlePatternErrorMessage:void 0,titleEditable:!1,titlePosition:void 0,expanded:!1,expandToggleDisplay:void 0,expandToggleDisabled:!1,"":"<div>Content</div>","header-right":`<div slot="header-right" style="width:100%">
  <mg-badge label="item" value="1" style="margin-right:auto"></mg-badge>
  <mg-button variant="secondary">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>
</div>`}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
    '': \`<div>Content</div>\`,
    'header-right': \`<div slot="header-right" style="width:100%">
  <mg-badge label="item" value="1" style="margin-right:auto"></mg-badge>
  <mg-button variant="secondary">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>
</div>\`
  }
}`,...e.parameters?.docs?.source}}};const r=["MgPanel"];export{e as MgPanel,r as __namedExportsOrder,d as default};
