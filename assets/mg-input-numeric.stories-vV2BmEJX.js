import{h as l}from"./index-BDiA27Xx.js";import{e as u}from"./index.es-e6WyZ5Om.js";const b=["decimal","integer"],x={component:"mg-input-numeric",title:"Molecules/Inputs/mg-input-numeric",parameters:{actions:{handles:["value-change","input-valid"]}}},h=e=>l("mg-input-numeric",{...u(e)}),n={render:h,args:{value:"",identifier:"identifier",name:"input-name",type:b[0],label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",required:!0,disabled:!1,readonly:!1,max:void 0,min:void 0,mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},f=e=>{const s=e.labelOnTop;delete e.labelOnTop;const m=e.labelHide;delete e.labelHide;const c=e.helpText;return delete e.helpText,l("mg-input-numeric",{...e,"label-on-top":s,"label-hide":m,"help-text":c},l("span",{slot:"append-input"},"km"))},t={render:f,args:{...n.args}};var i,a,o;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Global
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    type: types[0],
    // decimal
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    placeholder: 'placeholder',
    required: true,
    disabled: false,
    readonly: false,
    max: undefined,
    min: undefined,
    mgWidth: undefined,
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.'
  }
}`,...(o=(a=n.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var r,p,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: TemplateSlot,
  args: {
    ...MgInputNumeric.args
  }
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const v=["MgInputNumeric","AppendSlot"];export{t as AppendSlot,n as MgInputNumeric,v as __namedExportsOrder,x as default};
