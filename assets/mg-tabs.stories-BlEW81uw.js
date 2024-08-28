import{h as a}from"./index-BDiA27Xx.js";import{V as g}from"./index.es-1o2oPW_B.js";var t=(e=>(e.VISIBLE="visible",e.HIDDEN="hidden",e.DISABLED="disabled",e.ACTIVE="active",e))(t||{});const d=["regular","large"],p={component:"mg-tabs",title:"Molecules/mg-tabs",parameters:{actions:{handles:["active-tab-change"]}}},m=e=>a("mg-tabs",{...g(e,{size:d[0]})},a("div",{slot:"tab_content-1"},"Content 1"),a("div",{slot:"tab_content-2"},"Content 2"),a("div",{slot:"tab_content-3"},"Content 3"),a("div",{slot:"tab_content-4"},"Content 4")),s={render:m,args:{items:["Tab 1","Tab 2","Tab 3","Tab 4"],label:"Short tabs description. Needed for accessibility",activeTab:2,size:d[0]}},n={render:m,args:{...s.args,activeTab:void 0,items:[{label:"Tab 1",icon:"check",badge:{value:1,label:"message"}},{label:"Tab 2",badge:{value:5,label:"messages",role:"information"},status:t.DISABLED},{label:"Tab 3",icon:"cross",badge:{value:"9+",label:"messages",role:"notification"},status:t.ACTIVE},{label:"Tab 4",icon:"trash",status:t.HIDDEN}]}};var r,o,l;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: Template,
  args: {
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
    label: 'Short tabs description. Needed for accessibility',
    activeTab: 2,
    size: sizes[0] // regular
  }
}`,...(l=(o=s.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var b,i,c;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(c=(i=n.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const v=["MgTabs","MgTabsItems"];export{s as MgTabs,n as MgTabsItems,v as __namedExportsOrder,p as default};
