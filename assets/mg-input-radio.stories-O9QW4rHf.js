import{h as d,f as u}from"./utils-mC9zhaFX.js";const c={component:"mg-input-radio",title:"Molecules/Inputs/mg-input-radio",argTypes:{value:{options:[null,"ht","ttc","mixte"],control:{type:"radio"}}},parameters:{actions:{handles:["value-change","input-valid"]}}},o=p=>d("mg-input-radio",{...u(p)}),e={render:o,args:{value:null,items:["ht","ttc","mixte"],identifier:"identifier",name:"input-name",label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}},t={render:o,args:{...e.args,required:!0,items:[{title:"HT",value:"ht"},{title:"TTC",value:"ttc",disabled:!0},{title:"Mixte (HT/TTC)",value:"mixte"}]}};var n,a,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Global
    value: null,
    items: ['ht', 'ttc', 'mixte'],
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Option',
    labelOnTop: false,
    labelHide: false,
    // placement
    inputVerticalList: false,
    // Input
    required: false,
    disabled: false,
    readonly: false,
    // Tooltip
    tooltip: 'This is a tooltip',
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var l,r,s;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputRadio.args,
    required: true,
    items: [{
      title: 'HT',
      value: 'ht'
    }, {
      title: 'TTC',
      value: 'ttc',
      disabled: true
    }, {
      title: 'Mixte (HT/TTC)',
      value: 'mixte'
    }]
  }
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const T=["MgInputRadio","ItemsWithOptions"];export{t as ItemsWithOptions,e as MgInputRadio,T as __namedExportsOrder,c as default};
