import{h as b}from"./index-CJEt4w-d.js";import{i as f}from"./index-K2AdWO80.js";import{G as v}from"./index.es-BGsq6_6D.js";const g=["primary","secondary","danger","danger-alt","info","flat","success","link"],T=["button","submit","reset"],O={component:"mg-button",title:"Atoms/mg-button",argTypes:{type:{options:[void 0,...T],control:{type:"select"}}},parameters:{actions:{handles:["disabled-change"]}}},s=r=>b("mg-button",{...v(r,{variant:g[0]}),innerHTML:r.slot}),e={render:s,args:{slot:"Text button",variant:g[0],label:"Explicit aria label",identifier:void 0,disabled:!1,disableOnClick:!1,isIcon:!1,type:void 0,fullWidth:void 0}},n={render:s,args:{...e.args,isIcon:!0,slot:`<mg-icon icon="${f[0]}"></mg-icon>`}},t={render:s,args:{...e.args,disableOnClick:!0}};var a,o,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: Template,
  args: {
    slot: 'Text button',
    variant: variants[0],
    label: 'Explicit aria label',
    identifier: undefined,
    disabled: false,
    disableOnClick: false,
    isIcon: false,
    type: undefined,
    fullWidth: undefined
  }
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var c,l,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    isIcon: true,
    slot: \`<mg-icon icon="\${iconList[0]}"></mg-icon>\`
  }
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,p,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    disableOnClick: true
  }
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const x=["MgButton","IsIcon","DisableOnClick"];export{t as DisableOnClick,n as IsIcon,e as MgButton,x as __namedExportsOrder,O as default};
