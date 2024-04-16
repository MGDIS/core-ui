import{h as d}from"./index-CJEt4w-d.js";import{I as m}from"./index.es-DXisEhbe.js";import{t as u}from"./mg-input.conf-D2VyV82L.js";const b={component:"mg-input-date",title:"Molecules/Inputs/mg-input-date",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{tooltipPosition:{options:[void 0,...u],control:{type:"select"}}}},l=p=>d("mg-input-date",{...m(p)}),e={render:l,args:{value:"2023-06-02",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,required:!0,readonly:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}},t={render:l,args:{...e.args,min:"2023-01-01",max:"2023-12-31"}};var n,a,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var i,r,s;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputDate.args,
    // date range
    min: \`2023-01-01\`,
    max: \`2023-12-31\`
  }
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const T=["MgInputDate","MgInputDateMinMax"];export{e as MgInputDate,t as MgInputDateMinMax,T as __namedExportsOrder,b as default};
