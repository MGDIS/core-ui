import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u,d,f;e((()=>{i(),n(),a={component:`mg-action-more`,title:`Molecules/mg-action-more`,parameters:{actions:{handles:[`click`]}}},o=()=>{window.alert(`This alert comme from the clicked item method "mouseEventHandler".`)},s=e=>r(`mg-action-more`,{...t(e),style:{"margin-left":`1rem`}}),c={render:s,args:{items:[{label:`element 1`,mouseEventHandler:o},{label:`element 2`,mouseEventHandler:o,badge:{value:2,label:`badge`}},{isDivider:!0},{label:`element 3`,mouseEventHandler:o,icon:{icon:`user`}},{label:`element 4`,mouseEventHandler:o,href:`#`},{label:`element 5`,mouseEventHandler:o,href:`/`,target:`_blank`}],icon:void 0,button:void 0,displayChevron:!1}},l={render:s,args:{...c.args,icon:{icon:`user`},button:{variant:`flat`,isIcon:!1,label:`mon user`}}},u={render:s,args:{...c.args,icon:{icon:`user`},button:{variant:`flat`,isIcon:!1,label:`mon user`},displayChevron:!0}},d={render:s,args:{...c.args,button:{variant:`flat`,isIcon:!1,label:`mon user`},displayChevron:!0}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f=[`MgActionMoreIcon`,`MgActionMoreIconCustomAndLabel`,`MgActionMoreIconCustomAndLabelAndChevron`,`MgActionMoreLabelAndChevron`]}))();export{c as MgActionMoreIcon,l as MgActionMoreIconCustomAndLabel,u as MgActionMoreIconCustomAndLabelAndChevron,d as MgActionMoreLabelAndChevron,f as __namedExportsOrder,a as default};