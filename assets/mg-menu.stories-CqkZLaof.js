import{h as t}from"./index-BDiA27Xx.js";import{s as T}from"./index.es-CzPWUGdg.js";import{D as o}from"./mg-menu.conf-BGEjSTu6.js";const i={VISIBLE:"visible",HIDDEN:"hidden",DISABLED:"disabled",ACTIVE:"active"},f={component:"mg-menu",title:"Molecules/Menus/mg-menu"},V=e=>t("mg-menu-item",{...T(e)},e.label&&t("span",{slot:"label"},e.label),e.metadata&&t("span",{slot:"metadata"},e.metadata),e.icon&&t("mg-icon",{slot:"image",icon:"user"}),e.badge&&t("mg-badge",{slot:"information",label:"information",value:"1",variant:"text-color"},e.icon),e.content&&t("div",null,t("h3",null,"Demo title"),t("p",null,"some content")),e.submenu>0&&m(l(o.VERTICAL,e.submenu-1,"medium"))),l=(e,S=0,s="xlarge")=>({label:"Batman menu",direction:e,size:s,itemmore:{size:s},items:[{href:"#",label:"label 1"},{status:i.DISABLED,label:"label 2"},{badge:!0,label:"label 3 with long text",icon:!0},{status:i.ACTIVE,label:"label 4",badge:!0,icon:!0,submenu:S},{label:"label 5",icon:!0,metadata:"my metadata",content:!0}]}),m=e=>t("mg-menu",{...T(e,{direction:o.HORIZONTAL})},e.items.map(V)),D=e=>t("div",null,m(e)),n={render:D,args:l(o.HORIZONTAL,2)},a={render:D,args:l(o.VERTICAL,2)},E=e=>t("div",{style:{width:"25rem",height:"20rem"}},m(e)),r={render:E,args:{...a.args}};var u,c,d;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: getMenuArgs(Direction.HORIZONTAL, 2)
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var g,p,b;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: Template,
  args: getMenuArgs(Direction.VERTICAL, 2)
}`,...(b=(p=a.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var M,I,A;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: TemplateSmallContainer,
  args: {
    ...MgMenuVertical.args
  }
}`,...(A=(I=r.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};const v=["MgMenuHorizontal","MgMenuVertical","MgMenuVerticalSmallContainer"];export{n as MgMenuHorizontal,a as MgMenuVertical,r as MgMenuVerticalSmallContainer,v as __namedExportsOrder,f as default};
