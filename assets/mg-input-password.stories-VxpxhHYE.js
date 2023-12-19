import{h as s,f as r}from"./utils-mC9zhaFX.js";const p={component:"mg-input-password",title:"Molecules/Inputs/mg-input-password",argTypes:{mgWidth:{options:[2,4,16,"full"],control:{type:"select"}}},parameters:{actions:{handles:["value-change","input-valid"]}}},o=n=>s("mg-input-password",{...r(n)}),e={render:o,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",maxlength:400,required:!0,disabled:!1,readonly:!1,mgWidth:"full",tooltip:"This is a tooltip",helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}};var l,t,a;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Global
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    placeholder: 'placeholder',
    maxlength: 400,
    required: true,
    disabled: false,
    readonly: false,
    mgWidth: 'full',
    // Tooltip
    tooltip: 'This is a tooltip',
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(a=(t=e.parameters)==null?void 0:t.docs)==null?void 0:a.source}}};const d=["MgInputPassword"];export{e as MgInputPassword,d as __namedExportsOrder,p as default};
