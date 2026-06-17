import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o=e((()=>{a=[`checkbox`,`multi`]})),s,c,l,u,d;e((()=>{i(),n(),o(),s={component:`mg-input-checkbox`,title:`Molecules/Inputs/mg-input-checkbox`,parameters:{actions:{handles:[`value-change`,`input-valid`]}}},c=e=>r(`mg-input-checkbox`,t(e,{tooltipPosition:`input`})),l={render:c,args:{value:[{title:`HT`,value:!0},{title:`TTC`,value:!1,disabled:!0},{title:`Mixte (HT/TTC)`,value:null}],type:void 0,identifier:`identifier`,name:`input-name`,label:`Option`,labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,readonly:!1,displaySelectedValues:!1,disabled:!1,tooltip:`This is a tooltip`,tooltipPosition:void 0,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`,editButtonMessage:``,showButtonMessage:``,selectButtonMessage:``}},u={render:c,args:{...l.args,value:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(e=>({title:`item ${e}`,value:!1})),type:a[1]}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputCheckbox.args,
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
      title: \`item \${item}\`,
      value: false
    })),
    type: checkboxTypes[1]
  }
}`,...u.parameters?.docs?.source}}},d=[`MgInputCheckbox`,`MgInputCheckboxMulti`]}))();export{l as MgInputCheckbox,u as MgInputCheckboxMulti,d as __namedExportsOrder,s as default};