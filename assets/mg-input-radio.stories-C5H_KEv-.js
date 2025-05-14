import{h as d}from"./index-BDiA27Xx.js";import{f as m}from"./index-Ddciy6Nl.js";const f={component:"mg-input-radio",title:"Molecules/Inputs/mg-input-radio",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{value:{options:[null,"ht","ttc","mixte"],control:{type:"radio"}}}},r=p=>d("mg-input-radio",{...m(p,{tooltipPosition:"input"})}),e={render:r,args:{value:null,items:["ht","ttc","mixte"],identifier:"identifier",name:"input-name",label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,readonly:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},t={render:r,args:{...e.args,items:[{title:"HT",value:"ht"},{title:"TTC",value:"ttc",disabled:!0},{title:"Mixte (HT/TTC)",value:"mixte"}]}};var i,n,a;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: Template,
  args: {
    value: null,
    items: ['ht', 'ttc', 'mixte'],
    identifier: 'identifier',
    name: 'input-name',
    label: 'Option',
    labelOnTop: false,
    labelHide: false,
    inputVerticalList: false,
    required: false,
    readonly: false,
    disabled: false,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.'
  }
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var l,s,o;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputRadio.args,
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
}`,...(o=(s=t.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};const T=["MgInputRadio","ItemsWithOptions"];export{t as ItemsWithOptions,e as MgInputRadio,T as __namedExportsOrder,f as default};
