import{h as d}from"./index-BDiA27Xx.js";import{e as m}from"./index.es-e6WyZ5Om.js";const T={component:"mg-input-radio",title:"Molecules/Inputs/mg-input-radio",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{value:{options:[null,"ht","ttc","mixte"],control:{type:"radio"}}}},o=p=>d("mg-input-radio",{...m(p)}),e={render:o,args:{value:null,items:["ht","ttc","mixte"],identifier:"identifier",name:"input-name",label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},t={render:o,args:{...e.args,required:!0,items:[{title:"HT",value:"ht"},{title:"TTC",value:"ttc",disabled:!0},{title:"Mixte (HT/TTC)",value:"mixte"}]}};var i,n,a;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.'
  }
}`,...(a=(n=e.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var l,r,s;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const f=["MgInputRadio","ItemsWithOptions"];export{t as ItemsWithOptions,e as MgInputRadio,f as __namedExportsOrder,T as default};
