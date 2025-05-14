import{h as p}from"./index-BDiA27Xx.js";import{f as c}from"./index-Ddciy6Nl.js";const d={component:"mg-input-toggle",title:"Molecules/Inputs/mg-input-toggle",parameters:{actions:{handles:["value-change","input-valid"]}}},m=n=>p("mg-input-toggle",{...c(n,{tooltipPosition:"input"},["item-1","item-2"]),innerHTML:`${n["item-1"]}${n["item-2"]}`}),e={render:m,args:{value:null,items:[{title:"non",value:!1},{title:"oui",value:!0}],identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,isOnOff:!1,isIcon:!1,readonly:!1,disabled:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.","item-1":'<span slot="item-1">non</span>',"item-2":'<span slot="item-2">oui</span>'}},t={render:m,args:{...e.args,isIcon:!0,isOnOff:!0,"item-1":'<mg-icon slot="item-1" icon="cross"></mg-icon>',"item-2":'<mg-icon slot="item-2" icon="check"></mg-icon>'}};var i,o,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(l=(o=e.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var s,a,r;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputToggle.args,
    'isIcon': true,
    'isOnOff': true,
    // Slots
    'item-1': \`<mg-icon slot="item-1" icon="cross"></mg-icon>\`,
    'item-2': \`<mg-icon slot="item-2" icon="check"></mg-icon>\`
  }
}`,...(r=(a=t.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};const f=["MgInputToggle","MgInputToggleWithIcon"];export{e as MgInputToggle,t as MgInputToggleWithIcon,f as __namedExportsOrder,d as default};
