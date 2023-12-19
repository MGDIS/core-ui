import{h as A,f as h}from"./utils-mC9zhaFX.js";const C={component:"mg-action-more",title:"Molecules/mg-action-more",parameters:{actions:{handles:["click"]}},argTypes:{button:{control:{type:"object"}}}},n=()=>{window.alert('This alert comme from the clicked item method "mouseEventHandler".')},s=f=>A("mg-action-more",{...h(f),style:{"margin-left":"1rem"}}),e={render:s,args:{items:[{label:"element 1",mouseEventHandler:n},{label:"element 2",mouseEventHandler:n,badge:{value:2,label:"badge"}},{label:"element 3",mouseEventHandler:n,icon:"user"},{label:"element 4",mouseEventHandler:n,href:"#"}],displayChevron:!1}},r={render:s,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},icon:{icon:"user"}}},o={render:s,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},icon:{icon:"user"},displayChevron:!0}},a={render:s,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},displayChevron:!0}};var t,l,c;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: Template,
  args: {
    items: [{
      label: 'element 1',
      mouseEventHandler
    }, {
      label: 'element 2',
      mouseEventHandler,
      badge: {
        value: 2,
        label: 'badge'
      }
    }, {
      label: 'element 3',
      mouseEventHandler,
      icon: 'user'
    }, {
      label: 'element 4',
      mouseEventHandler,
      href: '#'
    }],
    displayChevron: false
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var m,i,d;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgActionMoreIcon.args,
    button: {
      variant: 'flat',
      isIcon: false,
      label: 'mon user'
    },
    icon: {
      icon: 'user'
    }
  }
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var u,g,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgActionMoreIcon.args,
    button: {
      variant: 'flat',
      isIcon: false,
      label: 'mon user'
    },
    icon: {
      icon: 'user'
    },
    displayChevron: true
  }
}`,...(b=(g=o.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var p,v,M;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgActionMoreIcon.args,
    button: {
      variant: 'flat',
      isIcon: false,
      label: 'mon user'
    },
    displayChevron: true
  }
}`,...(M=(v=a.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};const y=["MgActionMoreIcon","MgActionMoreIconCustomAndLabel","MgActionMoreIconCustomAndLabelAndChevron","MgActionMoreLabelAndChevron"];export{e as MgActionMoreIcon,r as MgActionMoreIconCustomAndLabel,o as MgActionMoreIconCustomAndLabelAndChevron,a as MgActionMoreLabelAndChevron,y as __namedExportsOrder,C as default};
