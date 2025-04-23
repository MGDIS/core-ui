import{h as m}from"./index-BDiA27Xx.js";import{t as g}from"./index.es-CWizXw2g.js";const h={select:{placeholder:"Select a value"}},f={input:h},x={component:"mg-input-select",title:"Molecules/Inputs/mg-input-select",parameters:{actions:{handles:["value-change","input-valid"]}}},a=c=>m("mg-input-select",{...g(c,{placeholder:f.input.select.placeholder,tooltipPosition:"input"})}),e={render:a,args:{value:"",items:["blu","bli","blo","le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort"],identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:void 0,placeholderHide:!1,placeholderDisabled:!1,required:!1,readonly:!1,disabled:!1,mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},l={render:a,args:{...e.args,tooltip:"",helpText:"",items:[{title:"blu",value:"blublu"},{title:"bli",value:"blibli"},{title:"blo",value:"bloblo"},{title:"bla",value:"blabla",disabled:!0}]}},t={render:a,args:{...l.args,items:[{title:"blu",value:"blublu",group:"1st group"},{title:"bli",value:"blibli",group:"2nd group"},{title:"blo",value:"bloblo",group:"1st group"},{title:"bla",value:"blabla"}]}};var n,i,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(o=(i=e.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var r,s,u;l.parameters={...l.parameters,docs:{...(r=l.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(u=(s=l.parameters)==null?void 0:s.docs)==null?void 0:u.source}}};var p,b,d;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(d=(b=t.parameters)==null?void 0:b.docs)==null?void 0:d.source}}};const I=["MgInputSelect","WithObjectItems","WithGroups"];export{e as MgInputSelect,t as WithGroups,l as WithObjectItems,I as __namedExportsOrder,x as default};
