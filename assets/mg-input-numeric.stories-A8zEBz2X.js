import{h as l}from"./index-OLtdmg-3.js";import{x as h}from"./index.es-PXOAO2Jp.js";const d=["decimal","integer","currency"],x={component:"mg-input-numeric",title:"Molecules/Inputs/mg-input-numeric",argTypes:{type:{options:d,control:{type:"select"}},mgWidth:{options:[void 0,2,4,16,"full"],control:{type:"select"}}},parameters:{actions:{handles:["value-change","input-valid"]}}},b=e=>l("mg-input-numeric",{...h(e)}),t={render:b,args:{value:"",identifier:"identifier",name:"input-name",type:d[0],label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",required:!0,disabled:!1,readonly:!1,max:void 0,min:void 0,mgWidth:void 0,tooltip:"This is a tooltip",helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}},g=e=>{const m=e.labelOnTop;delete e.labelOnTop;const c=e.labelHide;delete e.labelHide;const u=e.helpText;return delete e.helpText,l("mg-input-numeric",{...e,"label-on-top":m,"label-hide":c,"help-text":u},l("span",{slot:"append-input"},"km"))},n={render:g,args:{...t.args}};var a,o,i;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(i=(o=t.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var r,p,s;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: TemplateSlot,
  args: {
    ...MgInputNumeric.args
  }
}`,...(s=(p=n.parameters)==null?void 0:p.docs)==null?void 0:s.source}}};const y=["MgInputNumeric","AppendSlot"];export{n as AppendSlot,t as MgInputNumeric,y as __namedExportsOrder,x as default};
