import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u,d,f,p;e((()=>{i(),n(),a={component:`mg-input-combobox`,title:`Molecules/Inputs/mg-input-combobox`,parameters:{actions:{handles:[`value-change`,`input-valid`,`filter-change`,`load-more`]}},tags:[`beta`]},o=e=>Array(e).fill(()=>``).map((e,t)=>({title:`title ${t+1}`,value:`/${t+1}`})),s=e=>r(`mg-input-combobox`,t(e)),c={render:s,args:{value:``,items:[`Batman`,`Robin`,`Joker`],itemsLabel:`DC Comics`,identifier:`identifier`,name:`input-name`,label:`Label`,labelOnTop:!1,labelHide:!1,placeholder:`placeholder`,required:!1,readonly:!1,disabled:!1,mgWidth:void 0,tooltip:`This is a tooltip`,tooltipPosition:void 0,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`,fetchurl:void 0,fetchoptions:void 0,fetchmappings:void 0}},l={render:s,args:{...c.args,items:o(100)}},u={filter:`{q}`,filterTransform:e=>e.replace(/'/g,`''`)},d={items:`d.results`,total:`d.__count`,next:`d.__next`,itemTitle:`libpayscourtmaj`,itemValue:`codpaysnum`},f={render:s,args:{...c.args,items:void 0,fetchurl:`https://mdmmgdis.mgcloud.fr/dataserver/mdmmgdis/data/mdmpays?$format=json&$top=20&$inlinecount=allpages&$orderby=libpayscourtmaj%20asc&$filter=langue%20eq%20'fr'%20and%20substringof('${u.filter}'%2Ctolower(libpayscourtmaj))`,fetchmappings:{request:u,response:d}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    value: '',
    items: ['Batman', 'Robin', 'Joker'],
    itemsLabel: 'DC Comics',
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: 'placeholder',
    required: false,
    readonly: false,
    disabled: false,
    mgWidth: undefined,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    fetchurl: undefined,
    fetchoptions: undefined,
    fetchmappings: undefined
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputComboboxStringItems.args,
    items: getOptionsItems(100)
  }
}`,...l.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputComboboxStringItems.args,
    items: undefined,
    fetchurl: \`https://mdmmgdis.mgcloud.fr/dataserver/mdmmgdis/data/mdmpays?$format=json&$top=20&$inlinecount=allpages&$orderby=\${encodeURIComponent('libpayscourtmaj asc')}&$filter=\${encodeURIComponent("langue eq 'fr' and substringof('")}\${RequestMapping.filter}\${encodeURIComponent("',tolower(libpayscourtmaj))")}\`,
    fetchmappings: {
      request: RequestMapping,
      response: ResponseMapping
    }
  }
}`,...f.parameters?.docs?.source}}},p=[`MgInputComboboxStringItems`,`MgInputComboboxOptionsItems`,`MgInputComboboxAPI`]}))();export{f as MgInputComboboxAPI,l as MgInputComboboxOptionsItems,c as MgInputComboboxStringItems,p as __namedExportsOrder,a as default};