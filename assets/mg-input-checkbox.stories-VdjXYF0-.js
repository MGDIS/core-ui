import{h as c,f as d}from"./utils-mC9zhaFX.js";const p=["checkbox","multi"],f={component:"mg-input-checkbox",title:"Molecules/Inputs/mg-input-checkbox",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{type:{options:[void 0,...p],control:{type:"select"}}}},u=l=>c("mg-input-checkbox",{...d(l)}),e={render:u,args:{value:[{title:"HT",value:!0},{title:"TTC",value:!1,disabled:!0},{title:"Mixte (HT/TTC)",value:null}],identifier:"identifier",name:"input-name",type:void 0,label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",helpText:"Help text with html <strong>bold</strong>, <em>italic</em>.",displaySelectedValues:!1}},t={render:u,args:{...e.args,value:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(l=>({title:`item ${l}`,value:!1})),type:p[1]}};var n,a,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Global
    value: [{
      title: 'HT',
      value: true
    }, {
      title: 'TTC',
      value: false,
      disabled: true
    }, {
      title: 'Mixte (HT/TTC)',
      value: null
    }],
    identifier: 'identifier',
    name: 'input-name',
    type: undefined,
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
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
    displaySelectedValues: false
  }
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var s,r,o;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputCheckbox.args,
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
      title: \`item \${item}\`,
      value: false
    })),
    type: checkboxTypes[1]
  }
}`,...(o=(r=t.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const b=["MgInputCheckbox","MgInputCheckboxMulti"];export{e as MgInputCheckbox,t as MgInputCheckboxMulti,b as __namedExportsOrder,f as default};
