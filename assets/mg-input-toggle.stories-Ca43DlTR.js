import{h as e}from"./index-CJEt4w-d.js";import{x as c}from"./index.es-BUUxBfzo.js";import{t as m}from"./MgInput.conf-D2VyV82L.js";const h={component:"mg-input-toggle",title:"Molecules/Inputs/mg-input-toggle",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{tooltipPosition:{options:[void 0,...m],control:{type:"select"}}}},g={value:null,items:[{title:"non",value:!1},{title:"oui",value:!0}],identifier:"identifier",name:"input-name",label:"Option",labelOnTop:!1,labelHide:!1,isIcon:!1,isOnOff:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."},u=t=>e("mg-input-toggle",{...c(t)},e("span",{slot:"item-1"},t.items[0].title),e("span",{slot:"item-2"},t.items[1].title)),o={render:u,args:{...g}},d=t=>e("mg-input-toggle",{...c(t)},e("span",{slot:"item-1"},e("mg-icon",{icon:"cross"})),e("span",{slot:"item-2"},e("mg-icon",{icon:"check"}))),s={render:d,args:{...g,isIcon:!0,isOnOff:!0}};var n,i,a;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...args
  }
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var r,l,p;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: TemplateIcon,
  args: {
    ...args,
    isIcon: true,
    isOnOff: true
  }
}`,...(p=(l=s.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const O=["MgInputToggle","MgInputToggleWithIcon"];export{o as MgInputToggle,s as MgInputToggleWithIcon,O as __namedExportsOrder,h as default};
