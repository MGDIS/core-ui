import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l;e((()=>{i(),n(),a={component:`mg-input-toggle`,title:`Molecules/Inputs/mg-input-toggle`,parameters:{actions:{handles:[`value-change`,`input-valid`]}}},o=e=>r(`mg-input-toggle`,{...t(e,{tooltipPosition:`input`},[`item-1`,`item-2`]),innerHTML:`${e[`item-1`]}${e[`item-2`]}`}),s={render:o,args:{value:null,items:[{title:`non`,value:!1},{title:`oui`,value:!0}],identifier:`identifier`,name:`input-name`,label:`Label`,labelOnTop:!1,labelHide:!1,isOnOff:!1,isIcon:!1,readonly:!1,disabled:!1,tooltip:`This is a tooltip`,tooltipPosition:void 0,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`,"item-1":`<span slot="item-1">non</span>`,"item-2":`<span slot="item-2">oui</span>`}},c={render:o,args:{...s.args,isIcon:!0,isOnOff:!0,"item-1":`<mg-icon slot="item-1" icon="cross"></mg-icon>`,"item-2":`<mg-icon slot="item-2" icon="check"></mg-icon>`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'value': null,
    'items': [{
      title: 'non',
      value: false
    }, {
      title: 'oui',
      value: true
    }],
    'identifier': 'identifier',
    'name': 'input-name',
    'label': 'Label',
    'labelOnTop': false,
    'labelHide': false,
    'isOnOff': false,
    'isIcon': false,
    'readonly': false,
    'disabled': false,
    'tooltip': 'This is a tooltip',
    'tooltipPosition': undefined,
    'helpText': 'Help text with html <b>bold</b>, <em>italic</em>.',
    // Slots
    'item-1': \`<span slot="item-1">non</span>\`,
    'item-2': \`<span slot="item-2">oui</span>\`
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputToggle.args,
    'isIcon': true,
    'isOnOff': true,
    // Slots
    'item-1': \`<mg-icon slot="item-1" icon="cross"></mg-icon>\`,
    'item-2': \`<mg-icon slot="item-2" icon="check"></mg-icon>\`
  }
}`,...c.parameters?.docs?.source}}},l=[`MgInputToggle`,`MgInputToggleWithIcon`]}))();export{s as MgInputToggle,c as MgInputToggleWithIcon,l as __namedExportsOrder,a as default};