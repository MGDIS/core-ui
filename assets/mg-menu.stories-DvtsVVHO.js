import{h as t}from"./index-BT0rxsHs.js";import{f as c}from"./iframe-zBwNu0FS.js";import{d as s}from"./mg-menu.conf-D_q0UiHu.js";import"./preload-helper-PPVm8Dsz.js";const m={DISABLED:"disabled",ACTIVE:"active"},h={component:"mg-menu",title:"Molecules/Menus/mg-menu"},u=2,p=e=>{const n={href:e.href,status:e.status,isIcon:e.isIcon};return t("mg-menu-item",{...c(n,{status:"visible"})},e.label&&t("span",{slot:"label"},e.label),e.metadata&&t("span",{slot:"metadata"},e.metadata),e.icon&&t("mg-icon",{slot:"image",icon:e.icon,size:"large"}),e.badge&&t("mg-badge",{slot:"information",label:"information",value:"1",variant:"text-color"}),e.content&&t("div",null,t("h3",null,"Demo title"),t("p",null,"some content")),e.submenu>0&&i(l(s.VERTICAL,e.submenu-1)))},l=(e,n=0)=>({label:"Batman menu",direction:e,storyItems:[{href:"#",label:"With link"},{status:m.DISABLED,label:"Disabled item"},{badge:!0,label:"With a longer text",icon:"pen"},{status:m.ACTIVE,label:"With submenu",badge:!0,icon:"star",submenu:n},{label:"Mon user",icon:"user",metadata:"Design campany",content:!0},{label:"Notification",icon:"bell",isIcon:!0}]}),i=e=>{const n={label:e.label,direction:e.direction,itemmore:e.itemmore};return t("mg-menu",{...c(n,{direction:s.HORIZONTAL})},e.storyItems.map(p))},d=e=>t("div",null,i(e)),a={render:d,args:l(s.HORIZONTAL,u)},r={render:d,args:l(s.VERTICAL,u)},g=e=>t("div",{style:{width:"25rem",height:"20rem"}},i(e)),o={render:g,args:{...r.args}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: getMenuArgs(directions.HORIZONTAL, depth)
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: getMenuArgs(directions.VERTICAL, depth)
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: TemplateSmallContainer,
  args: {
    ...MgMenuVertical.args
  }
}`,...o.parameters?.docs?.source}}};const T=["MgMenuHorizontal","MgMenuVertical","MgMenuVerticalSmallContainer"];export{a as MgMenuHorizontal,r as MgMenuVertical,o as MgMenuVerticalSmallContainer,T as __namedExportsOrder,h as default};
