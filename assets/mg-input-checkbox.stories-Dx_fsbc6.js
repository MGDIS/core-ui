import{h as u}from"./index-BDiA27Xx.js";import{Q as c}from"./index.es-xDe083ye.js";const d=["checkbox","multi"],f={component:"mg-input-checkbox",title:"Molecules/Inputs/mg-input-checkbox",parameters:{actions:{handles:["value-change","input-valid"]}}},p=n=>u("mg-input-checkbox",{...c(n,{tooltipPosition:"input"})}),e={render:p,args:{value:[{title:"HT",value:!0},{title:"TTC",value:!1,disabled:!0},{title:"Mixte (HT/TTC)",value:null}],type:void 0,identifier:"identifier",name:"input-name",label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,readonly:!1,displaySelectedValues:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.",editButtonMessage:"",showButtonMessage:"",selectButtonMessage:""}},t={render:p,args:{...e.args,value:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(n=>({title:`item ${n}`,value:!1})),type:d[1]}};var l,a,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var s,o,r;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputCheckbox.args,
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
      title: \`item \${item}\`,
      value: false
    })),
    type: checkboxTypes[1]
  }
}`,...(r=(o=t.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const h=["MgInputCheckbox","MgInputCheckboxMulti"];export{e as MgInputCheckbox,t as MgInputCheckboxMulti,h as __namedExportsOrder,f as default};
