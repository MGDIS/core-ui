import{h as l}from"./index-CJEt4w-d.js";import{G as h}from"./index.es-A6CDKOur.js";import{t as b}from"./mg-input.conf-D2VyV82L.js";const d=["decimal","integer","currency"],v={component:"mg-input-numeric",title:"Molecules/Inputs/mg-input-numeric",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{type:{options:d,control:{type:"select"}},mgWidth:{options:[void 0,2,4,16,"full"],control:{type:"select"}},tooltipPosition:{options:[void 0,...b],control:{type:"select"}}}},f=e=>l("mg-input-numeric",{...h(e)}),t={render:f,args:{value:"",identifier:"identifier",name:"input-name",type:d[0],label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",required:!0,disabled:!1,readonly:!1,max:void 0,min:void 0,mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}},g=e=>{const m=e.labelOnTop;delete e.labelOnTop;const c=e.labelHide;delete e.labelHide;const u=e.helpText;return delete e.helpText,l("mg-input-numeric",{...e,"label-on-top":m,"label-hide":c,"help-text":u},l("span",{slot:"append-input"},"km"))},n={render:g,args:{...t.args}};var o,i,a;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(a=(i=t.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var r,p,s;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: TemplateSlot,
  args: {
    ...MgInputNumeric.args
  }
}`,...(s=(p=n.parameters)==null?void 0:p.docs)==null?void 0:s.source}}};const H=["MgInputNumeric","AppendSlot"];export{n as AppendSlot,t as MgInputNumeric,H as __namedExportsOrder,v as default};
