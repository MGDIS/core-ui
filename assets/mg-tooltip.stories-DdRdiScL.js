import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u;e((()=>{i(),n(),a={component:`mg-tooltip`,title:`Atoms/mg-tooltip`,parameters:{layout:`centered`}},o=e=>r(`mg-tooltip`,{...t(e,{placement:`bottom`},[``]),innerHTML:e[``]}),s={render:o,args:{identifier:`identifier`,message:`This is a tooltip message`,placement:void 0,display:!1,disabled:!1,"":`<mg-icon icon="info-circle"></mg-icon>`}},c={render:o,args:{...s.args,"":`<mg-button>Action</mg-button>`}},l={render:o,args:{...s.args,"":`<span>any text</span>`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgTooltip.args,
    // Slot
    '': \`<mg-button>Action</mg-button>\`
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgTooltip.args,
    // Slot
    '': \`<span>any text</span>\`
  }
}`,...l.parameters?.docs?.source}}},u=[`MgTooltip`,`MgTooltipOnButton`,`MgTooltipOnSpan`]}))();export{s as MgTooltip,c as MgTooltipOnButton,l as MgTooltipOnSpan,u as __namedExportsOrder,a as default};