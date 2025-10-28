import{h as l}from"./index-BdigElPL.js";import{f as c}from"./iframe-6DGX90e-.js";import"./preload-helper-PPVm8Dsz.js";const u={component:"mg-action-more",title:"Molecules/mg-action-more",parameters:{actions:{handles:["click"]}}},n=()=>{window.alert('This alert comme from the clicked item method "mouseEventHandler".')},t=s=>l("mg-action-more",{...c(s),style:{"margin-left":"1rem"}}),e={render:t,args:{items:[{label:"element 1",mouseEventHandler:n},{label:"element 2",mouseEventHandler:n,badge:{value:2,label:"badge"}},{isDivider:!0},{label:"element 3",mouseEventHandler:n,icon:{icon:"user"}},{label:"element 4",mouseEventHandler:n,href:"#"},{label:"element 5",mouseEventHandler:n,href:"/",target:"_blank"}],icon:void 0,button:void 0,displayChevron:!1}},r={render:t,args:{...e.args,icon:{icon:"user"},button:{variant:"flat",isIcon:!1,label:"mon user"}}},o={render:t,args:{...e.args,icon:{icon:"user"},button:{variant:"flat",isIcon:!1,label:"mon user"},displayChevron:!0}},a={render:t,args:{...e.args,button:{variant:"flat",isIcon:!1,label:"mon user"},displayChevron:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const g=["MgActionMoreIcon","MgActionMoreIconCustomAndLabel","MgActionMoreIconCustomAndLabelAndChevron","MgActionMoreLabelAndChevron"];export{e as MgActionMoreIcon,r as MgActionMoreIconCustomAndLabel,o as MgActionMoreIconCustomAndLabelAndChevron,a as MgActionMoreLabelAndChevron,g as __namedExportsOrder,u as default};
