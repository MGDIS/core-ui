import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";import{n as a,t as o}from"./icons-CHJxNgq6.js";var s,c,l=e((()=>{s=[`medium`,`large`],c=[`primary`,`secondary`,`danger`,`danger-alt`,`info`,`flat`,`success`,`link`]})),u,d,f,p,m,h;e((()=>{i(),l(),a(),n(),u={component:`mg-button`,title:`Atoms/mg-button`,parameters:{actions:{handles:[`disabled-change`]}}},d=e=>r(`mg-button`,{...t(e,{variant:c[0],size:s[0]},[``]),innerHTML:e[``]}),f={render:d,args:{variant:void 0,label:`Explicit aria label`,type:void 0,size:void 0,fullWidth:!1,form:``,disabled:!1,isIcon:!1,disableOnClick:!1,"":`Text button`}},p={render:d,args:{...f.args,isIcon:!0,"":`<mg-icon icon="${o[0]}"></mg-icon>`}},m={render:d,args:{...f.args,disableOnClick:!0}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'variant': undefined,
    'label': 'Explicit aria label',
    'type': undefined,
    'size': undefined,
    'fullWidth': false,
    'form': '',
    'disabled': false,
    'isIcon': false,
    'disableOnClick': false,
    // Slot
    '': 'Text button'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    'isIcon': true,
    '': \`<mg-icon icon="\${iconList[0]}"></mg-icon>\`
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    disableOnClick: true
  }
}`,...m.parameters?.docs?.source}}},h=[`MgButton`,`IsIcon`,`DisableOnClick`]}))();export{m as DisableOnClick,p as IsIcon,f as MgButton,h as __namedExportsOrder,u as default};