import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l;e((()=>{i(),n(),a={component:`mg-input-radio`,title:`Molecules/Inputs/mg-input-radio`,parameters:{actions:{handles:[`value-change`,`input-valid`]}},argTypes:{value:{options:[null,`ht`,`ttc`,`mixte`],control:{type:`radio`}}}},o=e=>r(`mg-input-radio`,t(e,{tooltipPosition:`input`})),s={render:o,args:{value:null,items:[`ht`,`ttc`,`mixte`],identifier:`identifier`,name:`input-name`,label:`Option`,labelOnTop:!1,labelHide:!1,inputVerticalList:!1,required:!1,readonly:!1,disabled:!1,tooltip:`This is a tooltip`,tooltipPosition:void 0,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`}},c={render:o,args:{...s.args,items:[{title:`HT`,value:`ht`},{title:`TTC`,value:`ttc`,disabled:!0},{title:`Mixte (HT/TTC)`,value:`mixte`}]}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l=[`MgInputRadio`,`ItemsWithOptions`]}))();export{c as ItemsWithOptions,s as MgInputRadio,l as __namedExportsOrder,a as default};