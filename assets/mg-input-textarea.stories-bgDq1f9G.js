import{h as o}from"./index-CJEt4w-d.js";import{x as i}from"./index.es-BUUxBfzo.js";import{t as s}from"./MgInput.conf-D2VyV82L.js";const u={component:"mg-input-textarea",title:"Molecules/Inputs/mg-input-textarea",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{mgWidth:{options:[2,4,16,"full"],control:{type:"select"}},tooltipPosition:{options:[void 0,...s],control:{type:"select"}}}},p=t=>{const r=t.displayCharacterLeft;return delete t.displayCharacterLeft,o("mg-input-textarea",{...i(t),"display-character-left":r?void 0:"false"})},e={render:p,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",maxlength:4e3,required:!0,disabled:!1,readonly:!1,pattern:void 0,patternErrorMessage:void 0,rows:3,mgWidth:"full",resizable:"none",tooltip:"This is a tooltip",tooltipPosition:void 0,displayCharacterLeft:!0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}};var a,n,l;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
    tooltipPosition: undefined,
    // Nb Char Left
    displayCharacterLeft: true,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(l=(n=e.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const f=["MgInputTextarea"];export{e as MgInputTextarea,f as __namedExportsOrder,u as default};
