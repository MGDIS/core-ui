import{h as a}from"./index-OLtdmg-3.js";import{x as i}from"./index.es-7peb6i_H.js";import{t as s}from"./MgInput.conf-F_EOEFnM.js";const u={component:"mg-input-password",title:"Molecules/Inputs/mg-input-password",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{mgWidth:{options:[2,4,16,"full"],control:{type:"select"}},tooltipPosition:{options:[void 0,...s],control:{type:"select"}}}},r=n=>a("mg-input-password",{...i(n)}),e={render:r,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",maxlength:400,required:!0,disabled:!1,readonly:!1,mgWidth:"full",tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}};var t,l,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(o=(l=e.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};const c=["MgInputPassword"];export{e as MgInputPassword,c as __namedExportsOrder,u as default};
