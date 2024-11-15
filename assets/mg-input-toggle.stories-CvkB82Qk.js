import{h as e}from"./index-BDiA27Xx.js";import{s as c}from"./index.es-CzPWUGdg.js";const I={component:"mg-input-toggle",title:"Molecules/Inputs/mg-input-toggle",parameters:{actions:{handles:["value-change","input-valid"]}}},m={value:null,items:[{title:"non",value:!1},{title:"oui",value:!0}],identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,isIcon:!1,isOnOff:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."},g=t=>e("mg-input-toggle",{...c(t)},e("span",{slot:"item-1"},t.items[0].title),e("span",{slot:"item-2"},t.items[1].title)),s={render:g,args:{...m}},u=t=>e("mg-input-toggle",{...c(t)},e("span",{slot:"item-1"},e("mg-icon",{icon:"cross"})),e("span",{slot:"item-2"},e("mg-icon",{icon:"check"}))),n={render:u,args:{...m,isIcon:!0,isOnOff:!0}};var o,a,i;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...args
  }
}`,...(i=(a=s.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var l,r,p;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: TemplateIcon,
  args: {
    ...args,
    isIcon: true,
    isOnOff: true
  }
}`,...(p=(r=n.parameters)==null?void 0:r.docs)==null?void 0:p.source}}};const T=["MgInputToggle","MgInputToggleWithIcon"];export{s as MgInputToggle,n as MgInputToggleWithIcon,T as __namedExportsOrder,I as default};
