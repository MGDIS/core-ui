import{h as i}from"./index-D8HVAEo-.js";import{f as o}from"./iframe-DKP2BhGE.js";import"./preload-helper-PPVm8Dsz.js";const r=["bold","italic","underline","strikethrough","eraser","|","ul","ol","|","superscript","subscript","|","brush","|","link","image","file","|","table","|","undo","redo","|","print","|","source"],d={component:"mg-input-rich-text-editor",title:"Molecules/Inputs/mg-input-rich-text-editor",tags:["beta"],parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{modules:{control:"object",description:"Toolbar modules configuration (array of button names)"}}},n=t=>i("mg-input-rich-text-editor",{...o(t,{tooltipPosition:"input"})}),e={render:n,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"Saisissez votre texte ici...",required:!1,readonly:!1,disabled:!1,pattern:void 0,patternErrorMessage:void 0,rows:5,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.",modules:r}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: 'Saisissez votre texte ici...',
    required: false,
    readonly: false,
    disabled: false,
    pattern: undefined,
    patternErrorMessage: undefined,
    rows: 5,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    modules: DEFAULT_MODULES
  }
}`,...e.parameters?.docs?.source}}};const p=["MgInputRichTextEditor"];export{e as MgInputRichTextEditor,p as __namedExportsOrder,d as default};
