import{h as a}from"./index-BT0rxsHs.js";import{f as p}from"./iframe-zBwNu0FS.js";import"./preload-helper-PPVm8Dsz.js";const d={component:"mg-input-file",title:"Molecules/Inputs/mg-input-file",parameters:{actions:{handles:["value-change","input-valid"]}}},l=t=>a("mg-input-file",{...p(t,{tooltipPosition:"input"})}),e={render:l,args:{identifier:"identifier",name:"input-name",label:"Label",value:void 0,labelOnTop:!1,labelHide:!1,required:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,maxSize:void 0,accept:void 0,multiple:!1,capture:void 0,helpText:"Help file with html <b>bold</b>, <em>italic</em>."}},n=(t="batman")=>new File([`file content: ${t}`],t,{type:"text/plain"}),i={render:l,args:{...e.args,value:[n("batman.png"),n("joker.jpg")],accept:".jpg, .png, .pdf",multiple:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    value: undefined,
    labelOnTop: false,
    labelHide: false,
    required: false,
    disabled: false,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    maxSize: undefined,
    accept: undefined,
    multiple: false,
    capture: undefined,
    helpText: 'Help file with html <b>bold</b>, <em>italic</em>.'
  }
}`,...e.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputFile.args,
    value: [setFile('batman.png'), setFile('joker.jpg')],
    accept: '.jpg, .png, .pdf',
    multiple: true
  }
}`,...i.parameters?.docs?.source}}};const u=["MgInputFile","MgInputFileWithFiles"];export{e as MgInputFile,i as MgInputFileWithFiles,u as __namedExportsOrder,d as default};
