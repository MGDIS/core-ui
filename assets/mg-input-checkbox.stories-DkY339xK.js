import{h as u}from"./index-BDiA27Xx.js";import{V as c}from"./index.es-1o2oPW_B.js";const d=["checkbox","multi"],b={component:"mg-input-checkbox",title:"Molecules/Inputs/mg-input-checkbox",parameters:{actions:{handles:["value-change","input-valid"]}}},p=n=>u("mg-input-checkbox",{...c(n)}),e={render:p,args:{value:[{title:"HT",value:!0},{title:"TTC",value:!1,disabled:!0},{title:"Mixte (HT/TTC)",value:null}],identifier:"identifier",name:"input-name",type:void 0,label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>.",displaySelectedValues:!1}},t={render:p,args:{...e.args,value:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(n=>({title:`item ${n}`,value:!1})),type:d[1]}};var l,a,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
    displaySelectedValues: false
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
}`,...(r=(o=t.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const T=["MgInputCheckbox","MgInputCheckboxMulti"];export{e as MgInputCheckbox,t as MgInputCheckboxMulti,T as __namedExportsOrder,b as default};
