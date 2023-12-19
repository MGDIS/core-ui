import{h as a,f as m}from"./utils-mC9zhaFX.js";var n=(e=>(e.VISIBLE="visible",e.HIDDEN="hidden",e.DISABLED="disabled",e.ACTIVE="active",e))(n||{});const r=["regular","large"],u={component:"mg-tabs",title:"Molecules/mg-tabs",argTypes:{size:{options:r,control:{type:"select"}}},parameters:{actions:{handles:["active-tab-change"]}}},g=e=>a("mg-tabs",{...m(e,{size:r[0]})},a("div",{slot:"tab_content-1"},"Content 1"),a("div",{slot:"tab_content-2"},"Content 2"),a("div",{slot:"tab_content-3"},"Content 3"),a("div",{slot:"tab_content-4"},"Content 4")),s={render:g,args:{items:["Tab 1","Tab 2","Tab 3","Tab 4"],label:"Short tabs description. Needed for accessibility",activeTab:2,size:r[0]}},t={render:g,args:{...s.args,activeTab:void 0,items:[{label:"Tab 1",icon:"check",badge:{value:1,label:"message"}},{label:"Tab 2",badge:{value:5,label:"messages",role:"information"},status:n.DISABLED},{label:"Tab 3",icon:"cross",badge:{value:"9+",label:"messages",role:"notification"},status:n.ACTIVE},{label:"Tab 4",icon:"trash",status:n.HIDDEN}]}};var o,l,b;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: Template,
  args: {
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'],
    label: 'Short tabs description. Needed for accessibility',
    activeTab: 2,
    size: sizes[0] // regular
  }
}`,...(b=(l=s.parameters)==null?void 0:l.docs)==null?void 0:b.source}}};var i,c,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const p=["MgTabs","MgTabsItems"];export{s as MgTabs,t as MgTabsItems,p as __namedExportsOrder,u as default};
