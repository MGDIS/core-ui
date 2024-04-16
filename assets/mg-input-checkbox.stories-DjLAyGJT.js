import{h as c}from"./index-CJEt4w-d.js";import{I as d}from"./index.es-DXisEhbe.js";import{t as m}from"./mg-input.conf-D2VyV82L.js";const p=["checkbox","multi"],g={component:"mg-input-checkbox",title:"Molecules/Inputs/mg-input-checkbox",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{type:{options:[void 0,...p],control:{type:"select"}},tooltipPosition:{options:[void 0,...m],control:{type:"select"}}}},u=n=>c("mg-input-checkbox",{...d(n)}),e={render:u,args:{value:[{title:"HT",value:!0},{title:"TTC",value:!1,disabled:!0},{title:"Mixte (HT/TTC)",value:null}],identifier:"identifier",name:"input-name",type:void 0,label:"Option",labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,disabled:!1,readonly:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>.",displaySelectedValues:!1}},t={render:u,args:{...e.args,value:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map(n=>({title:`item ${n}`,value:!1})),type:p[1]}};var l,a,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};var o,s,r;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputCheckbox.args,
    value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(item => ({
      title: \`item \${item}\`,
      value: false
    })),
    type: checkboxTypes[1]
  }
}`,...(r=(s=t.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const h=["MgInputCheckbox","MgInputCheckboxMulti"];export{e as MgInputCheckbox,t as MgInputCheckboxMulti,h as __namedExportsOrder,g as default};
