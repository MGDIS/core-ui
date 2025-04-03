import{h as A}from"./index-BDiA27Xx.js";import{F as h}from"./index.es-Bgj_r6ds.js";const E={component:"mg-action-more",title:"Molecules/mg-action-more",parameters:{actions:{handles:["click"]}}},n=()=>{window.alert('This alert comme from the clicked item method "mouseEventHandler".')},t=M=>A("mg-action-more",{...h(M),style:{"margin-left":"1rem"}}),e={render:t,args:{items:[{label:"element 1",mouseEventHandler:n},{label:"element 2",mouseEventHandler:n,badge:{value:2,label:"badge"}},{isDivider:!0},{label:"element 3",mouseEventHandler:n,icon:{icon:"user"}},{label:"element 4",mouseEventHandler:n,href:"#"},{label:"element 5",mouseEventHandler:n,href:"/",target:"_blank"}],icon:void 0,button:void 0,displayChevron:!1}},r={render:t,args:{...e.args,icon:{icon:"user"},button:{variant:"flat",isIcon:!1,label:"mon user"}}},o={render:t,args:{...e.args,icon:{icon:"user"},button:{variant:"flat",isIcon:!1,label:"mon user"},displayChevron:!0}},a={render:t,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},displayChevron:!0}};var s,l,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
    icon: undefined,
    button: undefined,
    displayChevron: false
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var i,m,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgActionMoreIcon.args,
    icon: {
      icon: 'user'
    },
    button: {
      variant: 'flat',
      isIcon: false,
      label: 'mon user'
    }
  }
}`,...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,g,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgActionMoreIcon.args,
    icon: {
      icon: 'user'
    },
    button: {
      variant: 'flat',
      isIcon: false,
      label: 'mon user'
    },
    displayChevron: true
  }
}`,...(b=(g=o.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var p,v,f;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(f=(v=a.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const y=["MgActionMoreIcon","MgActionMoreIconCustomAndLabel","MgActionMoreIconCustomAndLabelAndChevron","MgActionMoreLabelAndChevron"];export{e as MgActionMoreIcon,r as MgActionMoreIconCustomAndLabel,o as MgActionMoreIconCustomAndLabelAndChevron,a as MgActionMoreLabelAndChevron,y as __namedExportsOrder,E as default};
