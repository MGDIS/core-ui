import{h as p}from"./index-BDiA27Xx.js";import{F as m}from"./index.es-Bgj_r6ds.js";const f={component:"mg-input-date",title:"Molecules/Inputs/mg-input-date",parameters:{actions:{handles:["value-change","input-valid"]}}},s=d=>p("mg-input-date",{...m(d,{tooltipPosition:"input"})}),e={render:s,args:{value:"2023-06-02",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,required:!1,readonly:!1,min:void 0,max:void 0,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},a={render:s,args:{...e.args,min:"2023-01-01",max:"2023-12-31"}};var n,t,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(i=(t=e.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var r,l,o;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputDate.args,
    // date range
    min: \`2023-01-01\`,
    max: \`2023-12-31\`
  }
}`,...(o=(l=a.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};const g=["MgInputDate","MgInputDateMinMax"];export{e as MgInputDate,a as MgInputDateMinMax,g as __namedExportsOrder,f as default};
