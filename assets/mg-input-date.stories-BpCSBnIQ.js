import{h as d}from"./index-BDiA27Xx.js";import{e as m}from"./index.es-e6WyZ5Om.js";const g={component:"mg-input-date",title:"Molecules/Inputs/mg-input-date",parameters:{actions:{handles:["value-change","input-valid"]}}},s=p=>d("mg-input-date",{...m(p)}),e={render:s,args:{value:"2023-06-02",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,required:!0,readonly:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},t={render:s,args:{...e.args,min:"2023-01-01",max:"2023-12-31"}};var a,n,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Global
    value: \`2023-06-02\`,
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    required: true,
    readonly: false,
    disabled: false,
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.'
  }
}`,...(r=(n=e.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};var i,l,o;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputDate.args,
    // date range
    min: \`2023-01-01\`,
    max: \`2023-12-31\`
  }
}`,...(o=(l=t.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};const b=["MgInputDate","MgInputDateMinMax"];export{e as MgInputDate,t as MgInputDateMinMax,b as __namedExportsOrder,g as default};
