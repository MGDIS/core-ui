import{h as s}from"./index-BDiA27Xx.js";import{Q as u}from"./index.es-xDe083ye.js";const f={component:"mg-input-numeric",title:"Molecules/Inputs/mg-input-numeric",parameters:{actions:{handles:["value-change","input-valid"]}}},d=i=>s("mg-input-numeric",{...u(i,{type:"decimal",currency:"EUR",decimalLength:2,format:"number",integerLength:13,unitDisplay:"short",tooltipPosition:"input"},["append-input"]),innerHTML:i["append-input"]}),e={render:d,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",required:!1,readonly:!1,max:void 0,min:void 0,disabled:!1,mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.",type:void 0,format:void 0,currency:"",unit:"",unitDisplay:void 0,integerLength:void 0,decimalLength:void 0,"append-input":""}},n={render:d,args:{...e.args,"append-input":'<span slot="append-input">km</span>'}};var t,a,p;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(p=(a=e.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};var r,l,o;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputNumeric.args,
    'append-input': \`<span slot="append-input">km</span>\`
  }
}`,...(o=(l=n.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};const g=["MgInputNumeric","AppendSlot"];export{n as AppendSlot,e as MgInputNumeric,g as __namedExportsOrder,f as default};
