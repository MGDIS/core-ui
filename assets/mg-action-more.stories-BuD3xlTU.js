import{h as A}from"./index-BDiA27Xx.js";import{s as h}from"./index.es-CzPWUGdg.js";const E={component:"mg-action-more",title:"Molecules/mg-action-more",parameters:{actions:{handles:["click"]}}},n=()=>{window.alert('This alert comme from the clicked item method "mouseEventHandler".')},t=f=>A("mg-action-more",{...h(f),style:{"margin-left":"1rem"}}),e={render:t,args:{items:[{label:"element 1",mouseEventHandler:n},{label:"element 2",mouseEventHandler:n,badge:{value:2,label:"badge"}},{isDivider:!0},{label:"element 3",mouseEventHandler:n,icon:{icon:"user"}},{label:"element 4",mouseEventHandler:n,href:"#"},{label:"element 5",mouseEventHandler:n,href:"/",target:"_blank"}],displayChevron:!1}},r={render:t,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},icon:{icon:"user"}}},a={render:t,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},icon:{icon:"user"},displayChevron:!0}},o={render:t,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},displayChevron:!0}};var s,l,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
      isDivider: true
    }, {
      label: 'element 3',
      mouseEventHandler,
      icon: {
        icon: 'user'
      }
    }, {
      label: 'element 4',
      mouseEventHandler,
      href: '#'
    }, {
      label: 'element 5',
      mouseEventHandler,
      href: '/',
      target: '_blank'
    }],
    displayChevron: false
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var i,m,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,g,b;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(b=(g=a.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var p,v,M;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(M=(v=o.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};const y=["MgActionMoreIcon","MgActionMoreIconCustomAndLabel","MgActionMoreIconCustomAndLabelAndChevron","MgActionMoreLabelAndChevron"];export{e as MgActionMoreIcon,r as MgActionMoreIconCustomAndLabel,a as MgActionMoreIconCustomAndLabelAndChevron,o as MgActionMoreLabelAndChevron,y as __namedExportsOrder,E as default};
