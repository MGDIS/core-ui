import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";import{n as a,t as o}from"./mg-menu.conf-ZBHHbSUr.js";var s,c,l,u,d,f,p,m,h,g,_,v;e((()=>{i(),n(),a(),s={component:`mg-menu-item`,title:`Molecules/Menus/mg-menu-item`,parameters:{actions:{handles:[`item-loaded`,`item-updated`]}}},c=e=>r(`mg-menu`,{label:`demo`},r(`mg-menu-item`,{...t(e,{status:`visible`},[``,`image`,`information`,`label`,`metadata`]),innerHTML:`${e[``]}${e.image}${e.information}${e.label}${e.metadata}`})),l={render:c,args:{identifier:`identifier`,href:void 0,target:void 0,status:void 0,expanded:!1,isIcon:!1,"":``,image:``,information:``,label:`<span slot="label">My label</span>`,metadata:``}},u={render:c,args:{...l.args,href:`./`}},d={render:c,args:{...u.args,target:`_blank`}},f={render:c,args:{...l.args,label:`<span slot="label">My label</span>`,image:`<mg-icon icon="user" slot="image"></mg-icon>`}},p={render:c,args:{...l.args,label:`<span slot="label">My label</span>`,image:`<mg-icon icon="user" slot="image"></mg-icon>`,isIcon:!0}},m={render:c,args:{...l.args,label:`<span slot="label">My label</span>`,information:`<mg-badge value="2" label="hello" slot="information"></mg-badge>`}},h={render:c,args:{...l.args,label:`<span slot="label">My label</span>`,information:`<mg-badge value="2" label="hello" slot="information"></mg-badge>`,image:`<mg-icon icon="user" slot="image"></mg-icon>`}},g={render:c,args:{...l.args,label:`<span slot="label">My label</span>`,metadata:`<span slot="metadata">My metadata</span>`}},_={render:c,args:{...l.args,expanded:!0,label:`<span slot="label">My label</span>`,"":`<mg-menu direction="${o.VERTICAL}" label="submenu">
  <mg-menu-item status="active">
    <span slot="label">Subitem 1</span>
  </mg-menu-item>
  <mg-menu-item>
    <mg-icon icon="user" slot="image"></mg-icon>
    <span slot="label">Subitem 2</span>
  </mg-menu-item>
  <mg-menu-item>
    <span slot="label">Subitem 3</span>
    <mg-icon icon="user" slot="image"></mg-icon>
    <mg-badge value="2" label="hello" variant="text-color" slot="information"></mg-badge>
  </mg-menu-item>
</mg-menu>`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'href': undefined,
    'target': undefined,
    'status': undefined,
    'expanded': false,
    'isIcon': false,
    // Slots
    '': '',
    'image': '',
    'information': '',
    'label': \`<span slot="label">My label</span>\`,
    'metadata': ''
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    href: './'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItemAsLink.args,
    target: '_blank'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    image: \`<mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    image: \`<mg-icon icon="user" slot="image"></mg-icon>\`,
    isIcon: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    information: \`<mg-badge value="2" label="hello" slot="information"></mg-badge>\`
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    information: \`<mg-badge value="2" label="hello" slot="information"></mg-badge>\`,
    image: \`<mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slot
    label: \`<span slot="label">My label</span>\`,
    metadata: \`<span slot="metadata">My metadata</span>\`
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    'expanded': true,
    // Slot
    'label': \`<span slot="label">My label</span>\`,
    '': \`<mg-menu direction="\${directions.VERTICAL}" label="submenu">
  <mg-menu-item status="active">
    <span slot="label">Subitem 1</span>
  </mg-menu-item>
  <mg-menu-item>
    <mg-icon icon="user" slot="image"></mg-icon>
    <span slot="label">Subitem 2</span>
  </mg-menu-item>
  <mg-menu-item>
    <span slot="label">Subitem 3</span>
    <mg-icon icon="user" slot="image"></mg-icon>
    <mg-badge value="2" label="hello" variant="text-color" slot="information"></mg-badge>
  </mg-menu-item>
</mg-menu>\`
  }
}`,..._.parameters?.docs?.source}}},v=[`MgMenuItem`,`MgMenuItemAsLink`,`MgMenuItemAsExternalLink`,`MgMenuItemWhitIcon`,`MgMenuItemIsIcon`,`MgMenuItemWhitBadge`,`MgMenuItemWhitBadgeAndIcon`,`MgMenuItemWhitMetadata`,`MgMenuItemWithSubmenu`]}))();export{l as MgMenuItem,d as MgMenuItemAsExternalLink,u as MgMenuItemAsLink,p as MgMenuItemIsIcon,m as MgMenuItemWhitBadge,h as MgMenuItemWhitBadgeAndIcon,f as MgMenuItemWhitIcon,g as MgMenuItemWhitMetadata,_ as MgMenuItemWithSubmenu,v as __namedExportsOrder,s as default};