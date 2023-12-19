import{h as i,f as s}from"./utils-mC9zhaFX.js";const d={component:"mg-input-textarea",title:"Molecules/Inputs/mg-input-textarea",argTypes:{mgWidth:{options:[2,4,16,"full"],control:{type:"select"}}},parameters:{actions:{handles:["value-change","input-valid"]}}},o=t=>{const r=t.displayCharacterLeft;return delete t.displayCharacterLeft,i("mg-input-textarea",{...s(t),"display-character-left":r?void 0:"false"})},e={render:o,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",maxlength:4e3,required:!0,disabled:!1,readonly:!1,pattern:void 0,patternErrorMessage:void 0,rows:3,mgWidth:"full",resizable:"none",tooltip:"This is a tooltip",displayCharacterLeft:!0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}};var a,l,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
    maxlength: 4000,
    required: true,
    disabled: false,
    readonly: false,
    pattern: undefined,
    patternErrorMessage: undefined,
    rows: 3,
    mgWidth: 'full',
    resizable: 'none',
    // Tooltip
    tooltip: 'This is a tooltip',
    // Nb Char Left
    displayCharacterLeft: true,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(n=(l=e.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const u=["MgInputTextarea"];export{e as MgInputTextarea,u as __namedExportsOrder,d as default};
