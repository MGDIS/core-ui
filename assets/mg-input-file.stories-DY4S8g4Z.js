import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u;e((()=>{i(),n(),a={component:`mg-input-file`,title:`Molecules/Inputs/mg-input-file`,parameters:{actions:{handles:[`value-change`,`input-valid`]}}},o=e=>r(`mg-input-file`,t(e,{tooltipPosition:`input`})),s={render:o,args:{identifier:`identifier`,name:`input-name`,label:`Label`,value:void 0,labelOnTop:!1,labelHide:!1,required:!1,disabled:!1,tooltip:`This is a tooltip`,tooltipPosition:void 0,maxSize:void 0,accept:void 0,multiple:!1,capture:void 0,helpText:`Help file with html <b>bold</b>, <em>italic</em>.`}},c=(e=`batman`)=>new File([`file content: ${e}`],e,{type:`text/plain`}),l={render:o,args:{...s.args,value:[c(`batman.png`),c(`joker.jpg`)],accept:`.jpg, .png, .pdf`,multiple:!0}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputFile.args,
    value: [setFile('batman.png'), setFile('joker.jpg')],
    accept: '.jpg, .png, .pdf',
    multiple: true
  }
}`,...l.parameters?.docs?.source}}},u=[`MgInputFile`,`MgInputFileWithFiles`]}))();export{s as MgInputFile,l as MgInputFileWithFiles,u as __namedExportsOrder,a as default};