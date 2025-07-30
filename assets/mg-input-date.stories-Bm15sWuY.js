import{h as i}from"./index-BdigElPL.js";import{f as r}from"./iframe-a__NqWOS.js";const s={component:"mg-input-date",title:"Molecules/Inputs/mg-input-date",parameters:{actions:{handles:["value-change","input-valid"]}}},n=t=>i("mg-input-date",{...r(t,{tooltipPosition:"input"})}),e={render:n,args:{value:"2023-06-02",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,required:!1,readonly:!1,min:void 0,max:void 0,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},a={render:n,args:{...e.args,min:"2023-01-01",max:"2023-12-31"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputDate.args,
    // date range
    min: \`2023-01-01\`,
    max: \`2023-12-31\`
  }
}`,...a.parameters?.docs?.source}}};const d=["MgInputDate","MgInputDateMinMax"];export{e as MgInputDate,a as MgInputDateMinMax,d as __namedExportsOrder,s as default};
