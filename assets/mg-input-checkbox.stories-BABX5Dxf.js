import{h as a}from"./index-BdigElPL.js";import{f as i}from"./iframe-a__NqWOS.js";const s=["checkbox","multi"],p={component:"mg-input-checkbox",title:"Molecules/Inputs/mg-input-checkbox",parameters:{actions:{handles:["value-change","input-valid"]}}},l=n=>a("mg-input-checkbox",{...i(n,{tooltipPosition:"input"})}),e={render:l,args:{value:[{title:"HT",value:!0},{title:"TTC",value:!1,disabled:!0},{title:"Mixte (HT/TTC)",value:null}],type:void 0,identifier:"identifier",name:"input-name",label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,readonly:!1,displaySelectedValues:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.",editButtonMessage:"",showButtonMessage:"",selectButtonMessage:""}},t={render:l,args:{...e.args,value:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(n=>({title:`item ${n}`,value:!1})),type:s[1]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
    type: undefined,
    identifier: 'identifier',
    name: 'input-name',
    label: 'Option',
    labelOnTop: false,
    labelHide: false,
    inputVerticalList: false,
    required: false,
    readonly: false,
    displaySelectedValues: false,
    disabled: false,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    editButtonMessage: '',
    showButtonMessage: '',
    selectButtonMessage: ''
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputCheckbox.args,
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
      title: \`item \${item}\`,
      value: false
    })),
    type: checkboxTypes[1]
  }
}`,...t.parameters?.docs?.source}}};const u=["MgInputCheckbox","MgInputCheckboxMulti"];export{e as MgInputCheckbox,t as MgInputCheckboxMulti,u as __namedExportsOrder,p as default};
