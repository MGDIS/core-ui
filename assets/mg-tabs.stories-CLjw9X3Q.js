import{h as e}from"./index-BDiA27Xx.js";import{t as m}from"./index.es-CWizXw2g.js";const t={HIDDEN:"hidden",DISABLED:"disabled",ACTIVE:"active"},u={component:"mg-tabs",title:"Molecules/mg-tabs",parameters:{actions:{handles:["active-tab-change"]}}},c=d=>e("mg-tabs",{...m(d,{size:"medium"})},e("div",{slot:"tab_content-1"},"Content 1"),e("div",{slot:"tab_content-2"},"Content 2"),e("div",{slot:"tab_content-3"},"Content 3"),e("div",{slot:"tab_content-4"},"Content 4")),a={render:c,args:{identifier:void 0,label:"Short tabs description. Needed for accessibility",size:void 0,items:["Tab 1","Tab 2","Tab 3","Tab 4"],activeTab:2}},s={render:c,args:{...a.args,activeTab:void 0,items:[{label:"Tab 1",icon:"check",badge:{value:1,label:"message"}},{label:"Tab 2",badge:{value:5,label:"messages",role:"information"},status:t.DISABLED},{label:"Tab 3",icon:"cross",badge:{value:"9+",label:"messages",role:"notification"},status:t.ACTIVE},{label:"Tab 4",icon:"trash",status:t.HIDDEN}]}};var n,o,r;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: Template,
  args: {
    identifier: undefined,
    label: 'Short tabs description. Needed for accessibility',
    size: undefined,
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
    activeTab: 2
  }
}`,...(r=(o=a.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};var i,b,l;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(l=(b=s.parameters)==null?void 0:b.docs)==null?void 0:l.source}}};const p=["MgTabs","MgTabsItems"];export{a as MgTabs,s as MgTabsItems,p as __namedExportsOrder,u as default};
