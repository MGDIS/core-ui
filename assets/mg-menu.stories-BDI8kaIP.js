import{h as t}from"./index-BdigElPL.js";import{f as d}from"./iframe-a__NqWOS.js";import{d as a}from"./mg-menu.conf-D_q0UiHu.js";const c={DISABLED:"disabled",ACTIVE:"active"},T={component:"mg-menu",title:"Molecules/Menus/mg-menu"},l=2,p=e=>{const n={href:e.href,status:e.status};return t("mg-menu-item",{...d(n,{status:"visible"})},e.label&&t("span",{slot:"label"},e.label),e.metadata&&t("span",{slot:"metadata"},e.metadata),e.icon&&t("mg-icon",{slot:"image",icon:"user"}),e.badge&&t("mg-badge",{slot:"information",label:"information",value:"1",variant:"text-color"}),e.content&&t("div",null,t("h3",null,"Demo title"),t("p",null,"some content")),e.submenu>0&&i(m(a.VERTICAL,e.submenu-1,"medium")))},m=(e,n=0,u="xlarge")=>({label:"Batman menu",direction:e,size:u,itemmore:n===l&&e===a.HORIZONTAL?{size:u}:void 0,storyItems:[{href:"#",label:"label 1"},{status:c.DISABLED,label:"label 2"},{badge:!0,label:"label 3 with long text",icon:!0},{status:c.ACTIVE,label:"label 4",badge:!0,icon:!0,submenu:n},{label:"label 5",icon:!0,metadata:"my metadata",content:!0}]}),i=e=>{const n={label:e.label,direction:e.direction,itemmore:e.itemmore,size:e.size};return t("mg-menu",{...d(n,{direction:a.HORIZONTAL,size:"medium"})},e.storyItems.map(p))},g=e=>t("div",null,i(e)),o={render:g,args:m(a.HORIZONTAL,l)},r={render:g,args:m(a.VERTICAL,l)},b=e=>t("div",{style:{width:"25rem",height:"20rem"}},i(e)),s={render:b,args:{...r.args}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: getMenuArgs(directions.HORIZONTAL, depth)
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: getMenuArgs(directions.VERTICAL, depth)
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: TemplateSmallContainer,
  args: {
    ...MgMenuVertical.args
  }
}`,...s.parameters?.docs?.source}}};const h=["MgMenuHorizontal","MgMenuVertical","MgMenuVerticalSmallContainer"];export{o as MgMenuHorizontal,r as MgMenuVertical,s as MgMenuVerticalSmallContainer,h as __namedExportsOrder,T as default};
