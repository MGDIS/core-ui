import{h as o}from"./index-BdigElPL.js";import{f as l}from"./iframe-B6BMAegC.js";import"./preload-helper-D9Z9MdNV.js";const m={component:"mg-input-toggle",title:"Molecules/Inputs/mg-input-toggle",parameters:{actions:{handles:["value-change","input-valid"]}}},i=n=>o("mg-input-toggle",{...l(n,{tooltipPosition:"input"},["item-1","item-2"]),innerHTML:`${n["item-1"]}${n["item-2"]}`}),e={render:i,args:{value:null,items:[{title:"non",value:!1},{title:"oui",value:!0}],identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,isOnOff:!1,isIcon:!1,readonly:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.","item-1":'<span slot="item-1">non</span>',"item-2":'<span slot="item-2">oui</span>'}},t={render:i,args:{...e.args,isIcon:!0,isOnOff:!0,"item-1":'<mg-icon slot="item-1" icon="cross"></mg-icon>',"item-2":'<mg-icon slot="item-2" icon="check"></mg-icon>'}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputToggle.args,
    'isIcon': true,
    'isOnOff': true,
    // Slots
    'item-1': \`<mg-icon slot="item-1" icon="cross"></mg-icon>\`,
    'item-2': \`<mg-icon slot="item-2" icon="check"></mg-icon>\`
  }
}`,...t.parameters?.docs?.source}}};const p=["MgInputToggle","MgInputToggleWithIcon"];export{e as MgInputToggle,t as MgInputToggleWithIcon,p as __namedExportsOrder,m as default};
