import{h as e}from"./index-BDiA27Xx.js";import{V as g}from"./index.es-1o2oPW_B.js";const I={component:"mg-input-toggle",title:"Molecules/Inputs/mg-input-toggle",parameters:{actions:{handles:["value-change","input-valid"]}}},c={value:null,items:[{title:"non",value:!1},{title:"oui",value:!0}],identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,isIcon:!1,isOnOff:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."},m=t=>e("mg-input-toggle",{...g(t)},e("span",{slot:"item-1"},t.items[0].title),e("span",{slot:"item-2"},t.items[1].title)),n={render:m,args:{...c}},u=t=>e("mg-input-toggle",{...g(t)},e("span",{slot:"item-1"},e("mg-icon",{icon:"cross"})),e("span",{slot:"item-2"},e("mg-icon",{icon:"check"}))),o={render:u,args:{...c,isIcon:!0,isOnOff:!0}};var s,a,i;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...args
  }
}`,...(i=(a=n.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var l,r,p;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: TemplateIcon,
  args: {
    ...args,
    isIcon: true,
    isOnOff: true
  }
}`,...(p=(r=o.parameters)==null?void 0:r.docs)==null?void 0:p.source}}};const T=["MgInputToggle","MgInputToggleWithIcon"];export{n as MgInputToggle,o as MgInputToggleWithIcon,T as __namedExportsOrder,I as default};
