import{h as t}from"./index-BDiA27Xx.js";import{e as s}from"./index.es-e6WyZ5Om.js";const O={component:"mg-tooltip",title:"Atoms/mg-tooltip",parameters:{layout:"centered"}},T=o=>t("mg-tooltip",{...s(o,{placement:"bottom"})},t("mg-icon",{icon:"info-circle"})),e={render:T,args:{identifier:"identifier",message:"This is a tooltip message",placement:void 0,display:!1,disabled:!1}},f=o=>t("mg-tooltip",{...s(o,{placement:"bottom"})},t("mg-button",null,"Action")),a={render:f,args:{...e.args}},M=o=>t("mg-tooltip",{...s(o,{placement:"bottom"})},t("span",null,"any text")),r={render:M,args:{...e.args}};var n,i,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: Template,
  args: {
    identifier: 'identifier',
    message: 'This is a tooltip message',
    placement: undefined,
    display: false,
    disabled: false
  }
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var l,m,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: TemplateButton,
  args: {
    ...MgTooltip.args
  }
}`,...(c=(m=a.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var g,d,u;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: TemplateSpan,
  args: {
    ...MgTooltip.args
  }
}`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const y=["MgTooltip","MgTooltipOnButton","MgTooltipOnSpan"];export{e as MgTooltip,a as MgTooltipOnButton,r as MgTooltipOnSpan,y as __namedExportsOrder,O as default};
