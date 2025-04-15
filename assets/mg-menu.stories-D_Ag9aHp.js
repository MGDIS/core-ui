import{h as t}from"./index-BDiA27Xx.js";import{Q as S}from"./index.es-xDe083ye.js";import{d as r}from"./mg-menu.conf-D_q0UiHu.js";const c={DISABLED:"disabled",ACTIVE:"active"},v={component:"mg-menu",title:"Molecules/Menus/mg-menu"},l=2,f=e=>{const n={href:e.href,status:e.status};return t("mg-menu-item",{...S(n,{status:"visible"})},e.label&&t("span",{slot:"label"},e.label),e.metadata&&t("span",{slot:"metadata"},e.metadata),e.icon&&t("mg-icon",{slot:"image",icon:"user"}),e.badge&&t("mg-badge",{slot:"information",label:"information",value:"1",variant:"text-color"}),e.content&&t("div",null,t("h3",null,"Demo title"),t("p",null,"some content")),e.submenu>0&&i(m(r.VERTICAL,e.submenu-1,"medium")))},m=(e,n=0,u="xlarge")=>({label:"Batman menu",direction:e,size:u,itemmore:n===l&&e===r.HORIZONTAL?{size:u}:void 0,storyItems:[{href:"#",label:"label 1"},{status:c.DISABLED,label:"label 2"},{badge:!0,label:"label 3 with long text",icon:!0},{status:c.ACTIVE,label:"label 4",badge:!0,icon:!0,submenu:n},{label:"label 5",icon:!0,metadata:"my metadata",content:!0}]}),i=e=>{const n={label:e.label,direction:e.direction,itemmore:e.itemmore,size:e.size};return t("mg-menu",{...S(n,{direction:r.HORIZONTAL,size:"medium"})},e.storyItems.map(f))},V=e=>t("div",null,i(e)),o={render:V,args:m(r.HORIZONTAL,l)},a={render:V,args:m(r.VERTICAL,l)},C=e=>t("div",{style:{width:"25rem",height:"20rem"}},i(e)),s={render:C,args:{...a.args}};var d,p,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: Template,
  args: getMenuArgs(directions.HORIZONTAL, depth)
}`,...(g=(p=o.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var b,M,A;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: Template,
  args: getMenuArgs(directions.VERTICAL, depth)
}`,...(A=(M=a.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var I,T,h;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: TemplateSmallContainer,
  args: {
    ...MgMenuVertical.args
  }
}`,...(h=(T=s.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};const R=["MgMenuHorizontal","MgMenuVertical","MgMenuVerticalSmallContainer"];export{o as MgMenuHorizontal,a as MgMenuVertical,s as MgMenuVerticalSmallContainer,R as __namedExportsOrder,v as default};
