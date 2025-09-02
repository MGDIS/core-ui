import{h as i}from"./index-BdigElPL.js";import{f as m}from"./iframe-B6BMAegC.js";import"./preload-helper-D9Z9MdNV.js";const b={component:"mg-input-combobox",title:"Molecules/Inputs/mg-input-combobox",parameters:{actions:{handles:["value-change","input-valid","filter-change","load-more"]}},tags:["beta"]},l=n=>new Array(n).fill(()=>"").map((d,a)=>({title:`title ${a+1}`,value:`/${a+1}`})),s=n=>i("mg-input-combobox",{...m(n)}),e={render:s,args:{value:"",items:["Batman","Robin","Joker"],itemsLabel:"DC Comics",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",required:!1,readonly:!1,disabled:!1,mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.",fetchurl:void 0,fetchoptions:void 0,fetchmappings:void 0}},t={render:s,args:{...e.args,items:l(100)}},r={filter:"{q}"},p={items:"d.results",total:"d.__count",next:"d.__next",itemTitle:"libpayscourtmaj",itemValue:"codpaysnum"},o={render:s,args:{...e.args,items:void 0,fetchurl:`https://mdmmgdis.mgcloud.fr/dataserver/mdmmgdis/data/mdmpays?$format=json&$top=20&$inlinecount=allpages&$orderby=${encodeURIComponent("libpayscourtmaj asc")}&$filter=${encodeURIComponent("langue eq 'fr' and substringof('")}${r.filter}${encodeURIComponent("',tolower(libpayscourtmaj))")}`,fetchmappings:{request:r,response:p}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputComboboxStringItems.args,
    items: getOptionsItems(100)
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const f=["MgInputComboboxStringItems","MgInputComboboxOptionsItems","MgInputComboboxAPI"];export{o as MgInputComboboxAPI,t as MgInputComboboxOptionsItems,e as MgInputComboboxStringItems,f as __namedExportsOrder,b as default};
