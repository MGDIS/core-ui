import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o=e((()=>{a={VISIBLE:`visible`,HIDDEN:`hidden`,DISABLED:`disabled`,ACTIVE:`active`}})),s,c,l,u,d;e((()=>{i(),n(),o(),s={component:`mg-tabs`,title:`Molecules/mg-tabs`,parameters:{actions:{handles:[`active-tab-change`]}}},c=e=>r(`mg-tabs`,t(e),r(`div`,{slot:`tab_content-1`},`Content 1`),r(`div`,{slot:`tab_content-2`},`Content 2`),r(`div`,{slot:`tab_content-3`},`Content 3`),r(`div`,{slot:`tab_content-4`},`Content 4`)),l={render:c,args:{identifier:void 0,label:`Short tabs description. Needed for accessibility`,items:[`Tab 1`,`Tab 2`,`Tab 3`,`Tab 4`],activeTab:2}},u={render:c,args:{...l.args,activeTab:void 0,items:[{label:`Tab 1`,icon:`check`,badge:{value:1,label:`message`}},{label:`Tab 2`,badge:{value:5,label:`messages`,role:`information`},status:a.DISABLED},{label:`Tab 3`,icon:`cross`,badge:{value:`9+`,label:`messages`,role:`notification`},status:a.ACTIVE},{label:`Tab 4`,icon:`trash`,status:a.HIDDEN}]}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    identifier: undefined,
    label: 'Short tabs description. Needed for accessibility',
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
    activeTab: 2
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d=[`MgTabs`,`MgTabsItems`]}))();export{l as MgTabs,u as MgTabsItems,d as __namedExportsOrder,s as default};