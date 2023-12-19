import{h as d,f as m}from"./utils-mC9zhaFX.js";const g={component:"mg-input-date",title:"Molecules/Inputs/mg-input-date",parameters:{actions:{handles:["value-change","input-valid"]}}},o=p=>d("mg-input-date",{...m(p)}),e={render:o,args:{value:"2023-06-02",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,required:!0,readonly:!1,disabled:!1,tooltip:"This is a tooltip",helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}},a={render:o,args:{...e.args,min:"2023-01-01",max:"2023-12-31"}};var t,n,r;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(r=(n=e.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};var l,s,i;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputDate.args,
    // date range
    min: \`2023-01-01\`,
    max: \`2023-12-31\`
  }
}`,...(i=(s=a.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const c=["MgInputDate","MgInputDateMinMax"];export{e as MgInputDate,a as MgInputDateMinMax,c as __namedExportsOrder,g as default};
