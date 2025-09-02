import{h as e}from"./index-BdigElPL.js";import{f as r}from"./iframe-B6BMAegC.js";import"./preload-helper-D9Z9MdNV.js";const t={HIDDEN:"hidden",DISABLED:"disabled",ACTIVE:"active"},c={component:"mg-tabs",title:"Molecules/mg-tabs",parameters:{actions:{handles:["active-tab-change"]}}},n=o=>e("mg-tabs",{...r(o,{size:"medium"})},e("div",{slot:"tab_content-1"},"Content 1"),e("div",{slot:"tab_content-2"},"Content 2"),e("div",{slot:"tab_content-3"},"Content 3"),e("div",{slot:"tab_content-4"},"Content 4")),a={render:n,args:{identifier:void 0,label:"Short tabs description. Needed for accessibility",size:void 0,items:["Tab 1","Tab 2","Tab 3","Tab 4"],activeTab:2}},s={render:n,args:{...a.args,activeTab:void 0,items:[{label:"Tab 1",icon:"check",badge:{value:1,label:"message"}},{label:"Tab 2",badge:{value:5,label:"messages",role:"information"},status:t.DISABLED},{label:"Tab 3",icon:"cross",badge:{value:"9+",label:"messages",role:"notification"},status:t.ACTIVE},{label:"Tab 4",icon:"trash",status:t.HIDDEN}]}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    identifier: undefined,
    label: 'Short tabs description. Needed for accessibility',
    size: undefined,
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
    activeTab: 2
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const d=["MgTabs","MgTabsItems"];export{a as MgTabs,s as MgTabsItems,d as __namedExportsOrder,c as default};
