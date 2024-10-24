import{h as m}from"./index-BDiA27Xx.js";import{t as g}from"./index.es-CXAHyUQd.js";const h={required:"This field is required.",date:{badInput:"The date format must be {pattern}",min:"The date cannot be earlier than {min}",max:"The date cannot be later than {max}",minMax:"The date must be between {min} and {max}"},numeric:{min:"The value cannot be less than {min}",max:"The value cannot be greater than {max}",minMax:"The value must be between {min} and {max}"}},f="{counter} characters left.",v={select:{placeholder:"Select a value"},checkbox:{selectedValues:"{nb} selected values",selectedValue:"{nb} selected value",editButton:"Edit",selectButton:"Select values",showButton:"Show",label:"Enter a value",result:"result",results:"results",searchResults:"Search result(s) list.",noResult:"No result.",sections:{selected:{title:"Selected",titlePlurial:"Selected",action:"Unselect all",tooltip:"Unselect all current search results"},notSelected:{title:"Not selected",titlePlurial:"Not selected",action:"Select all",tooltip:"Select all current search results"}}},date:{helpText:"Expected format: {pattern} (ex: {date})",pattern:{dd:"dd",mm:"mm",yyyy:"yyyy"}},password:{display:"Display password value",hide:"Hide password value"}},x={required:'Fields with a <strong class="mg-u-is-asterisk">*</strong> are required',requiredSingle:'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',allRequired:"All fields are required",allRequiredSingle:"The field is required"},T={closeButton:"Close message"},S={closeButton:"Close modal"},q={label:"Pagination",page:"page",pages:"pages",nextPage:"Next page",previousPage:"Previous page",selectPage:"Select the page to display."},w={editLabel:"Edit section title."},y={navLabel:"Quick access"},I={confirm:"Confirm",cancel:"Cancel",close:"Close",next:"next",previous:"previous"},L={badgeLabel:"Include notification(s)",openNewTab:"Open link in a new tab"},P={menuLabel:"Additional menu"},M={label:"Actions"},k={inProgess:"Loading in progress…"},H={errors:h,nbCharLeft:f,input:v,form:x,alert:T,modal:S,pagination:q,panel:w,skipLinks:y,general:I,menuItem:L,itemMore:P,actionMore:M,loader:k},W={component:"mg-input-select",title:"Molecules/Inputs/mg-input-select",parameters:{actions:{handles:["value-change","input-valid"]}}},a=b=>m("mg-input-select",{...g(b,{placeholder:H.input.select.placeholder})}),e={render:a,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,required:!0,readonly:!1,disabled:!1,items:["blu","bli","blo","le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort"],mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <b>bold</b>, <em>italic</em>.",placeholder:void 0,placeholderHide:!1,placeholderDisabled:!1}},l={render:a,args:{...e.args,tooltip:"",helpText:"",required:!1,items:[{title:"blu",value:"blublu"},{title:"bli",value:"blibli"},{title:"blo",value:"bloblo"},{title:"bla",value:"blabla",disabled:!0}]}},t={render:a,args:{...l.args,items:[{title:"blu",value:"blublu",group:"1st group"},{title:"bli",value:"blibli",group:"2nd group"},{title:"blo",value:"bloblo",group:"1st group"},{title:"bla",value:"blabla"}]}};var n,s,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Global
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    required: true,
    readonly: false,
    disabled: false,
    items: ['blu', 'bli', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'],
    mgWidth: undefined,
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    // Placeholder
    placeholder: undefined,
    placeholderHide: false,
    placeholderDisabled: false
  }
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var r,o,u;l.parameters={...l.parameters,docs:{...(r=l.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputSelect.args,
    // remove feature to focus on pattern
    tooltip: '',
    helpText: '',
    required: false,
    //
    items: [{
      title: 'blu',
      value: 'blublu'
    }, {
      title: 'bli',
      value: 'blibli'
    }, {
      title: 'blo',
      value: 'bloblo'
    }, {
      title: 'bla',
      value: 'blabla',
      disabled: true
    }]
  }
}`,...(u=(o=l.parameters)==null?void 0:o.docs)==null?void 0:u.source}}};var d,c,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...WithObjectItems.args,
    items: [{
      title: 'blu',
      value: 'blublu',
      group: '1st group'
    }, {
      title: 'bli',
      value: 'blibli',
      group: '2nd group'
    }, {
      title: 'blo',
      value: 'bloblo',
      group: '1st group'
    }, {
      title: 'bla',
      value: 'blabla'
    }]
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const B=["MgInputSelect","WithObjectItems","WithGroups"];export{e as MgInputSelect,t as WithGroups,l as WithObjectItems,B as __namedExportsOrder,W as default};
