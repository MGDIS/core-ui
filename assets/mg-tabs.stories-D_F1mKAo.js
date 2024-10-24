import{h as e}from"./index-BDiA27Xx.js";import{t as T}from"./index.es-CXAHyUQd.js";const t={VISIBLE:"visible",HIDDEN:"hidden",DISABLED:"disabled",ACTIVE:"active"},c=["medium","large"],p={component:"mg-tabs",title:"Molecules/mg-tabs",parameters:{actions:{handles:["active-tab-change"]}}},m=d=>e("mg-tabs",{...T(d,{size:c[0]})},e("div",{slot:"tab_content-1"},"Content 1"),e("div",{slot:"tab_content-2"},"Content 2"),e("div",{slot:"tab_content-3"},"Content 3"),e("div",{slot:"tab_content-4"},"Content 4")),a={render:m,args:{items:["Tab 1","Tab 2","Tab 3","Tab 4"],label:"Short tabs description. Needed for accessibility",activeTab:2,size:c[0]}},s={render:m,args:{...a.args,activeTab:void 0,items:[{label:"Tab 1",icon:"check",badge:{value:1,label:"message"}},{label:"Tab 2",badge:{value:5,label:"messages",role:"information"},status:t.DISABLED},{label:"Tab 3",icon:"cross",badge:{value:"9+",label:"messages",role:"notification"},status:t.ACTIVE},{label:"Tab 4",icon:"trash",status:t.HIDDEN}]}};var n,o,r;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: Template,
  args: {
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
    label: 'Short tabs description. Needed for accessibility',
    activeTab: 2,
    size: sizes[0] // medium
  }
}`,...(r=(o=a.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};var b,i,l;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(l=(i=s.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const v=["MgTabs","MgTabsItems"];export{a as MgTabs,s as MgTabsItems,v as __namedExportsOrder,p as default};
