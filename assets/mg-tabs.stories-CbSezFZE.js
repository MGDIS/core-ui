import{h as e}from"./index-D8HVAEo-.js";import{f as r}from"./iframe-DKP2BhGE.js";import"./preload-helper-PPVm8Dsz.js";const s={HIDDEN:"hidden",DISABLED:"disabled",ACTIVE:"active"},c={component:"mg-tabs",title:"Molecules/mg-tabs",parameters:{actions:{handles:["active-tab-change"]}}},n=o=>e("mg-tabs",{...r(o)},e("div",{slot:"tab_content-1"},"Content 1"),e("div",{slot:"tab_content-2"},"Content 2"),e("div",{slot:"tab_content-3"},"Content 3"),e("div",{slot:"tab_content-4"},"Content 4")),a={render:n,args:{identifier:void 0,label:"Short tabs description. Needed for accessibility",items:["Tab 1","Tab 2","Tab 3","Tab 4"],activeTab:2}},t={render:n,args:{...a.args,activeTab:void 0,items:[{label:"Tab 1",icon:"check",badge:{value:1,label:"message"}},{label:"Tab 2",badge:{value:5,label:"messages",role:"information"},status:s.DISABLED},{label:"Tab 3",icon:"cross",badge:{value:"9+",label:"messages",role:"notification"},status:s.ACTIVE},{label:"Tab 4",icon:"trash",status:s.HIDDEN}]}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    identifier: undefined,
    label: 'Short tabs description. Needed for accessibility',
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
    activeTab: 2
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgTabs.args,
    activeTab: undefined,
    items: [{
      label: 'Tab 1',
      icon: 'check',
      badge: {
        value: 1,
        label: 'message'
      }
    }, {
      label: 'Tab 2',
      badge: {
        value: 5,
        label: 'messages',
        role: 'information'
      },
      status: Status.DISABLED
    }, {
      label: 'Tab 3',
      icon: 'cross',
      badge: {
        value: '9+',
        label: 'messages',
        role: 'notification'
      },
      status: Status.ACTIVE
    }, {
      label: 'Tab 4',
      icon: 'trash',
      status: Status.HIDDEN
    }]
  }
}`,...t.parameters?.docs?.source}}};const d=["MgTabs","MgTabsItems"];export{a as MgTabs,t as MgTabsItems,d as __namedExportsOrder,c as default};
