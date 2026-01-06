import{h as i}from"./index-BdigElPL.js";import{f as a}from"./iframe-avHky8ts.js";import"./preload-helper-PPVm8Dsz.js";const r={component:"mg-panel",title:"Molecules/mg-panel",parameters:{actions:{handles:["title-change","expanded-change"]}}},n=e=>i("mg-panel",{...a(e,{titlePosition:"left",expandToggleDisplay:"text"},["","panel-title","header-right"]),innerHTML:`${e[""]}${e["panel-title"]}${e["header-right"]}`}),t={render:n,args:{identifier:void 0,panelTitle:"title",titlePattern:void 0,titlePatternErrorMessage:void 0,titleEditable:!1,titlePosition:void 0,expanded:!1,expandToggleDisplay:void 0,expandToggleDisabled:!1,"":"<div>Content</div>","panel-title":"","header-right":`<div slot="header-right" style="width:100%">
  <mg-badge label="item" value="1" style="margin-right:auto"></mg-badge>
  <mg-button variant="secondary">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>
</div>`}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
    'panel-title': \`\`,
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
}`,...t.parameters?.docs?.source}}};const s=["MgPanel"];export{t as MgPanel,s as __namedExportsOrder,r as default};
