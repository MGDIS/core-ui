import{h as a}from"./index-BdigElPL.js";import{f as r}from"./iframe-a__NqWOS.js";const o={component:"mg-input-numeric",title:"Molecules/Inputs/mg-input-numeric",parameters:{actions:{handles:["value-change","input-valid"]}}},t=i=>a("mg-input-numeric",{...r(i,{type:"decimal",currency:"EUR",decimalLength:2,format:"number",integerLength:13,unitDisplay:"short",tooltipPosition:"input"},["append-input"]),innerHTML:i["append-input"]}),e={render:t,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",required:!1,readonly:!1,max:void 0,min:void 0,disabled:!1,mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.",type:void 0,format:void 0,currency:"",unit:"",unitDisplay:void 0,integerLength:void 0,decimalLength:void 0,"append-input":""}},n={render:t,args:{...e.args,"append-input":'<span slot="append-input">km</span>'}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputNumeric.args,
    'append-input': \`<span slot="append-input">km</span>\`
  }
}`,...n.parameters?.docs?.source}}};const d=["MgInputNumeric","AppendSlot"];export{n as AppendSlot,e as MgInputNumeric,d as __namedExportsOrder,o as default};
