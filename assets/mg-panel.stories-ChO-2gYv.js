import{h as o}from"./index-BDiA27Xx.js";import{t as l}from"./index.es-CWizXw2g.js";const g={component:"mg-panel",title:"Molecules/mg-panel",parameters:{actions:{handles:["title-change","expanded-change"]}}},d=t=>o("mg-panel",{...l(t,{titlePosition:"left",expandToggleDisplay:"text"},["","header-right"]),innerHTML:`${t[""]}${t["header-right"]}`}),e={render:d,args:{identifier:void 0,panelTitle:"title",titlePattern:void 0,titlePatternErrorMessage:void 0,titleEditable:!1,titlePosition:void 0,expanded:!1,expandToggleDisplay:void 0,expandToggleDisabled:!1,"":"<div>Content</div>","header-right":`<div slot="header-right" style="width:100%">
  <mg-badge label="item" value="1" style="margin-right:auto"></mg-badge>
  <mg-button variant="secondary">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>
</div>`}};var i,a,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const m=["MgPanel"];export{e as MgPanel,m as __namedExportsOrder,g as default};
