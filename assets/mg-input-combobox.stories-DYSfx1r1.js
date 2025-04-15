import{h as f}from"./index-BDiA27Xx.js";import{Q as h}from"./index.es-xDe083ye.js";const v={component:"mg-input-combobox",title:"Molecules/Inputs/mg-input-combobox",parameters:{actions:{handles:["value-change","input-valid","filter-change","load-more"]}},tags:["beta"]},I=n=>new Array(n).fill(()=>"").map((x,s)=>({title:`title ${s+1}`,value:`/${s+1}`})),a=n=>f("mg-input-combobox",{...h(n)}),e={render:a,args:{value:"",items:["Batman","Robin","Joker"],itemsLabel:"DC Comics",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",required:!1,readonly:!1,disabled:!1,mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.",fetchurl:void 0,fetchoptions:void 0,fetchmappings:void 0}},t={render:a,args:{...e.args,items:I(100)}},r={filter:"{q}"},$={items:"d.results",total:"d.__count",next:"d.__next",itemTitle:"libpayscourtmaj",itemValue:"codpaysnum"},o={render:a,args:{...e.args,items:void 0,fetchurl:`https://mdmmgdis.mgcloud.fr/dataserver/mdmmgdis/data/mdmpays?$format=json&$top=20&$inlinecount=allpages&$orderby=${encodeURIComponent("libpayscourtmaj asc")}&$filter=${encodeURIComponent("langue eq 'fr' and substringof('")}${r.filter}${encodeURIComponent("',tolower(libpayscourtmaj))")}`,fetchmappings:{request:r,response:$}}};var i,m,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(l=(m=e.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,d,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputComboboxStringItems.args,
    items: getOptionsItems(100)
  }
}`,...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,g,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(b=(g=o.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};const y=["MgInputComboboxStringItems","MgInputComboboxOptionsItems","MgInputComboboxAPI"];export{o as MgInputComboboxAPI,t as MgInputComboboxOptionsItems,e as MgInputComboboxStringItems,y as __namedExportsOrder,v as default};
