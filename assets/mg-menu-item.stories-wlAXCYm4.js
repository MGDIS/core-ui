import{h as u}from"./index-BT0rxsHs.js";import{f as c}from"./iframe-zBwNu0FS.js";import{d}from"./mg-menu.conf-D_q0UiHu.js";import"./preload-helper-PPVm8Dsz.js";const f={component:"mg-menu-item",title:"Molecules/Menus/mg-menu-item",parameters:{actions:{handles:["item-loaded","item-updated"]}}},a=n=>u("mg-menu",{label:"demo"},u("mg-menu-item",{...c(n,{status:"visible"},["","image","information","label","metadata"]),innerHTML:`${n[""]}${n.image}${n.information}${n.label}${n.metadata}`})),e={render:a,args:{identifier:"identifier",href:void 0,target:void 0,status:void 0,expanded:!1,isIcon:!1,"":"",image:"",information:"",label:'<span slot="label">My label</span>',metadata:""}},s={render:a,args:{...e.args,href:"./"}},t={render:a,args:{...s.args,target:"_blank"}},r={render:a,args:{...e.args,label:'<span slot="label">My label</span>',image:'<mg-icon icon="user" slot="image"></mg-icon>'}},m={render:a,args:{...e.args,label:'<span slot="label">My label</span>',image:'<mg-icon icon="user" slot="image"></mg-icon>',isIcon:!0}},o={render:a,args:{...e.args,label:'<span slot="label">My label</span>',information:'<mg-badge value="2" label="hello" slot="information"></mg-badge>'}},l={render:a,args:{...e.args,label:'<span slot="label">My label</span>',information:'<mg-badge value="2" label="hello" slot="information"></mg-badge>',image:'<mg-icon icon="user" slot="image"></mg-icon>'}},i={render:a,args:{...e.args,label:'<span slot="label">My label</span>',metadata:'<span slot="metadata">My metadata</span>'}},g={render:a,args:{...e.args,expanded:!0,label:'<span slot="label">My label</span>',"":`<mg-menu direction="${d.VERTICAL}" label="submenu">
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
</mg-menu>`}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    href: './'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItemAsLink.args,
    target: '_blank'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    image: \`<mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...r.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    image: \`<mg-icon icon="user" slot="image"></mg-icon>\`,
    isIcon: true
  }
}`,...m.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    information: \`<mg-badge value="2" label="hello" slot="information"></mg-badge>\`
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    information: \`<mg-badge value="2" label="hello" slot="information"></mg-badge>\`,
    image: \`<mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slot
    label: \`<span slot="label">My label</span>\`,
    metadata: \`<span slot="metadata">My metadata</span>\`
  }
}`,...i.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};const S=["MgMenuItem","MgMenuItemAsLink","MgMenuItemAsExternalLink","MgMenuItemWhitIcon","MgMenuItemIsIcon","MgMenuItemWhitBadge","MgMenuItemWhitBadgeAndIcon","MgMenuItemWhitMetadata","MgMenuItemWithSubmenu"];export{e as MgMenuItem,t as MgMenuItemAsExternalLink,s as MgMenuItemAsLink,m as MgMenuItemIsIcon,o as MgMenuItemWhitBadge,l as MgMenuItemWhitBadgeAndIcon,r as MgMenuItemWhitIcon,i as MgMenuItemWhitMetadata,g as MgMenuItemWithSubmenu,S as __namedExportsOrder,f as default};
