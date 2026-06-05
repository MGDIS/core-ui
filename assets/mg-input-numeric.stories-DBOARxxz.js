import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l;e((()=>{i(),n(),a={component:`mg-input-numeric`,title:`Molecules/Inputs/mg-input-numeric`,parameters:{actions:{handles:[`value-change`,`input-valid`]}}},o=e=>r(`mg-input-numeric`,{...t(e,{type:`decimal`,currency:`EUR`,decimalLength:2,format:`number`,integerLength:13,unitDisplay:`short`,tooltipPosition:`input`},[`append-input`]),innerHTML:e[`append-input`]}),s={render:o,args:{value:``,identifier:`identifier`,name:`input-name`,label:`Label`,labelOnTop:!1,labelHide:!1,placeholder:`placeholder`,required:!1,readonly:!1,max:void 0,min:void 0,disabled:!1,mgWidth:void 0,tooltip:`This is a tooltip`,tooltipPosition:void 0,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`,type:void 0,format:void 0,currency:``,unit:``,unitDisplay:void 0,integerLength:void 0,decimalLength:void 0,"append-input":``}},c={render:o,args:{...s.args,"append-input":`<span slot="append-input">km</span>`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'value': '',
    'identifier': 'identifier',
    'name': 'input-name',
    'label': 'Label',
    'labelOnTop': false,
    'labelHide': false,
    'placeholder': 'placeholder',
    'required': false,
    'readonly': false,
    'max': undefined,
    'min': undefined,
    'disabled': false,
    'mgWidth': undefined,
    'tooltip': 'This is a tooltip',
    'tooltipPosition': undefined,
    'helpText': 'Help text with html <b>bold</b>, <em>italic</em>.',
    'type': undefined,
    'format': undefined,
    'currency': '',
    'unit': '',
    'unitDisplay': undefined,
    'integerLength': undefined,
    'decimalLength': undefined,
    // Slot
    'append-input': ''
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputNumeric.args,
    'append-input': \`<span slot="append-input">km</span>\`
  }
}`,...c.parameters?.docs?.source}}},l=[`MgInputNumeric`,`AppendSlot`]}))();export{c as AppendSlot,s as MgInputNumeric,l as __namedExportsOrder,a as default};