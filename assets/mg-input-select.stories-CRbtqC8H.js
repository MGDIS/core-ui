import{h as i}from"./index-BdigElPL.js";import{f as o}from"./iframe-avHky8ts.js";import"./preload-helper-PPVm8Dsz.js";const r={select:{placeholder:"Select a value"}},s={input:r},d={component:"mg-input-select",title:"Molecules/Inputs/mg-input-select",parameters:{actions:{handles:["value-change","input-valid"]}}},a=n=>i("mg-input-select",{...o(n,{placeholder:s.input.select.placeholder,tooltipPosition:"input"})}),e={render:a,args:{value:"",items:["blu","bli","blo","le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort"],identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:void 0,placeholderHide:!1,placeholderDisabled:!1,required:!1,readonly:!1,disabled:!1,mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},l={render:a,args:{...e.args,tooltip:"",helpText:"",items:[{title:"blu",value:"blublu"},{title:"bli",value:"blibli"},{title:"blo",value:"bloblo"},{title:"bla",value:"blabla",disabled:!0}]}},t={render:a,args:{...l.args,items:[{title:"blu",value:"blublu",group:"1st group"},{title:"bli",value:"blibli",group:"2nd group"},{title:"blo",value:"bloblo",group:"1st group"},{title:"bla",value:"blabla"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    value: '',
    items: ['blu', 'bli', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'],
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: undefined,
    placeholderHide: false,
    placeholderDisabled: false,
    required: false,
    readonly: false,
    disabled: false,
    mgWidth: undefined,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.'
  }
}`,...e.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputSelect.args,
    // remove extra
    tooltip: '',
    helpText: '',
    //
    items: [{
      title: 'blu',
      value: 'blublu'
    }, {
      title: 'bli',
      value: 'blibli'
    }, {
      title: 'blo',
      value: 'bloblo'
    }, {
      title: 'bla',
      value: 'blabla',
      disabled: true
    }]
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...WithObjectItems.args,
    items: [{
      title: 'blu',
      value: 'blublu',
      group: '1st group'
    }, {
      title: 'bli',
      value: 'blibli',
      group: '2nd group'
    }, {
      title: 'blo',
      value: 'bloblo',
      group: '1st group'
    }, {
      title: 'bla',
      value: 'blabla'
    }]
  }
}`,...t.parameters?.docs?.source}}};const c=["MgInputSelect","WithObjectItems","WithGroups"];export{e as MgInputSelect,t as WithGroups,l as WithObjectItems,c as __namedExportsOrder,d as default};
