import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l;e((()=>{i(),n(),a={component:`mg-input-date`,title:`Molecules/Inputs/mg-input-date`,parameters:{actions:{handles:[`value-change`,`input-valid`]}}},o=e=>r(`mg-input-date`,t(e,{tooltipPosition:`input`})),s={render:o,args:{value:`2023-06-02`,identifier:`identifier`,name:`input-name`,label:`Label`,labelOnTop:!1,labelHide:!1,required:!1,readonly:!1,min:void 0,max:void 0,disabled:!1,tooltip:`This is a tooltip`,tooltipPosition:void 0,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`}},c={render:o,args:{...s.args,min:`2023-01-01`,max:`2023-12-31`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    value: \`2023-06-02\`,
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    required: false,
    readonly: false,
    min: undefined,
    max: undefined,
    disabled: false,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputDate.args,
    // date range
    min: \`2023-01-01\`,
    max: \`2023-12-31\`
  }
}`,...c.parameters?.docs?.source}}},l=[`MgInputDate`,`MgInputDateMinMax`]}))();export{s as MgInputDate,c as MgInputDateMinMax,l as __namedExportsOrder,a as default};