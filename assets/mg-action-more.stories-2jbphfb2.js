import{h as A}from"./index-CJEt4w-d.js";import{G as h}from"./index.es-BGsq6_6D.js";const y={component:"mg-action-more",title:"Molecules/mg-action-more",parameters:{actions:{handles:["click"]}},argTypes:{button:{control:{type:"object"}}}},n=()=>{window.alert('This alert comme from the clicked item method "mouseEventHandler".')},t=f=>A("mg-action-more",{...h(f),style:{"margin-left":"1rem"}}),e={render:t,args:{items:[{label:"element 1",mouseEventHandler:n},{label:"element 2",mouseEventHandler:n,badge:{value:2,label:"badge"}},{label:"element 3",mouseEventHandler:n,icon:"user"},{label:"element 4",mouseEventHandler:n,href:"#"}],displayChevron:!1}},r={render:t,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},icon:{icon:"user"}}},o={render:t,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},icon:{icon:"user"},displayChevron:!0}},a={render:t,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},displayChevron:!0}};var s,l,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(d=(i=r.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var u,g,p;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(p=(g=o.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var b,v,M;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(M=(v=a.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};const E=["MgActionMoreIcon","MgActionMoreIconCustomAndLabel","MgActionMoreIconCustomAndLabelAndChevron","MgActionMoreLabelAndChevron"];export{e as MgActionMoreIcon,r as MgActionMoreIconCustomAndLabel,o as MgActionMoreIconCustomAndLabelAndChevron,a as MgActionMoreLabelAndChevron,E as __namedExportsOrder,y as default};
