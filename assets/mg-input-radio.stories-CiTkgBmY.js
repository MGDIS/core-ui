import{h as a}from"./index-BdigElPL.js";import{f as l}from"./iframe-a__NqWOS.js";const r={component:"mg-input-radio",title:"Molecules/Inputs/mg-input-radio",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{value:{options:[null,"ht","ttc","mixte"],control:{type:"radio"}}}},i=n=>a("mg-input-radio",{...l(n,{tooltipPosition:"input"})}),e={render:i,args:{value:null,items:["ht","ttc","mixte"],identifier:"identifier",name:"input-name",label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,readonly:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},t={render:i,args:{...e.args,items:[{title:"HT",value:"ht"},{title:"TTC",value:"ttc",disabled:!0},{title:"Mixte (HT/TTC)",value:"mixte"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const p=["MgInputRadio","ItemsWithOptions"];export{t as ItemsWithOptions,e as MgInputRadio,p as __namedExportsOrder,r as default};
