import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c;e((()=>{i(),n(),a={component:`mg-panel`,title:`Molecules/mg-panel`,parameters:{actions:{handles:[`title-change`,`expanded-change`]}}},o=e=>r(`mg-panel`,{...t(e,{titlePosition:`left`,expandToggleDisplay:`text`},[``,`panel-title`,`header-right`]),innerHTML:`${e[``]}${e[`panel-title`]}${e[`header-right`]}`}),s={render:o,args:{identifier:void 0,panelTitle:`title`,titlePattern:void 0,titlePatternErrorMessage:void 0,titleEditable:!1,titlePosition:void 0,expanded:!1,expandToggleDisplay:void 0,expandToggleDisabled:!1,"":`<div>Content</div>`,"panel-title":``,"header-right":`<div slot="header-right" style="width:100%">
  <mg-badge label="item" value="1" style="margin-right:auto"></mg-badge>
  <mg-button variant="secondary">
    <mg-icon icon="file-upload"></mg-icon> Upload
  </mg-button>
  <mg-button is-icon variant="secondary" label="delete">
    <mg-icon icon="trash"></mg-icon>
  </mg-button>
</div>`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c=[`MgPanel`]}))();export{s as MgPanel,c as __namedExportsOrder,a as default};