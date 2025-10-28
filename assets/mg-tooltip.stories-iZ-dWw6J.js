import{h as a}from"./index-BdigElPL.js";import{f as n}from"./iframe-6DGX90e-.js";import"./preload-helper-PPVm8Dsz.js";const c={component:"mg-tooltip",title:"Atoms/mg-tooltip",parameters:{layout:"centered"}},r=s=>a("mg-tooltip",{...n(s,{placement:"bottom"},[""]),innerHTML:s[""]}),e={render:r,args:{identifier:"identifier",message:"This is a tooltip message",placement:void 0,display:!1,disabled:!1,"":'<mg-icon icon="info-circle"></mg-icon>'}},o={render:r,args:{...e.args,"":"<mg-button>Action</mg-button>"}},t={render:r,args:{...e.args,"":"<span>any text</span>"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'message': 'This is a tooltip message',
    'placement': undefined,
    'display': false,
    'disabled': false,
    // Slot
    '': '<mg-icon icon="info-circle"></mg-icon>'
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgTooltip.args,
    // Slot
    '': \`<mg-button>Action</mg-button>\`
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgTooltip.args,
    // Slot
    '': \`<span>any text</span>\`
  }
}`,...t.parameters?.docs?.source}}};const l=["MgTooltip","MgTooltipOnButton","MgTooltipOnSpan"];export{e as MgTooltip,o as MgTooltipOnButton,t as MgTooltipOnSpan,l as __namedExportsOrder,c as default};
