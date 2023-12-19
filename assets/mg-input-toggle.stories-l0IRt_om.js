import{h as e,f as p}from"./utils-mC9zhaFX.js";const f={component:"mg-input-toggle",title:"Molecules/Inputs/mg-input-toggle",parameters:{actions:{handles:["value-change","input-valid"]}}},c={value:null,items:[{title:"non",value:!1},{title:"oui",value:!0}],identifier:"identifier",name:"input-name",label:"Option",labelOnTop:!1,labelHide:!1,isIcon:!1,isOnOff:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."},m=s=>e("mg-input-toggle",{...p(s)},e("span",{slot:"item-1"},"Non"),e("span",{slot:"item-2"},"Oui")),t={render:m,args:{...c}},u=s=>e("mg-input-toggle",{...p(s)},e("span",{slot:"item-1"},e("mg-icon",{icon:"cross"})),e("span",{slot:"item-2"},e("mg-icon",{icon:"check"}))),n={render:u,args:{...c,isIcon:!0,isOnOff:!0}};var o,a,r;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...args
  }
}`,...(r=(a=t.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};var l,i,g;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: TemplateIcon,
  args: {
    ...args,
    isIcon: true,
    isOnOff: true
  }
}`,...(g=(i=n.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};const I=["MgInputToggle","MgInputToggleWithIcon"];export{t as MgInputToggle,n as MgInputToggleWithIcon,I as __namedExportsOrder,f as default};
