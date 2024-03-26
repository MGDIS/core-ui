import{h as g}from"./index-CJEt4w-d.js";import{G as h}from"./index.es-WTk4rpsq.js";import{t as f}from"./mg-input.conf-D2VyV82L.js";const v={required:"This field is required.",date:{badInput:"The date format must be {pattern}",min:"The date cannot be earlier than {min}",max:"The date cannot be later than {max}",minMax:"The date must be between {min} and {max}"},numeric:{min:"The value cannot be less than {min}",max:"The value cannot be greater than {max}",minMax:"The value must be between {min} and {max}"}},x="{counter} characters left.",T={select:{placeholder:"Select a value"},checkbox:{selectedValues:"{nb} selected values",selectedValue:"{nb} selected value",editButton:"Edit",selectButton:"Select values",showButton:"Show",label:"Enter a value",result:"result",results:"results",searchResults:"Search result(s) list.",noResult:"No result.",sections:{selected:{title:"Selected",titlePlurial:"Selected",action:"Unselect all",tooltip:"Unselect all current search results"},notSelected:{title:"Not selected",titlePlurial:"Not selected",action:"Select all",tooltip:"Select all current search results"}}},date:{helpText:"Expected format: {pattern} (ex: {date})",pattern:{dd:"dd",mm:"mm",yyyy:"yyyy"}},password:{display:"Display password value",hide:"Hide password value"}},S={required:'Fields with a <strong class="mg-u-is-asterisk">*</strong> are required',requiredSingle:'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',allRequired:"All fields are required",allRequiredSingle:"The field is required"},y={closeButton:"Close message"},q={closeButton:"Close modal"},w={label:"Pagination",page:"page",pages:"pages",nextPage:"Next page",previousPage:"Previous page",selectPage:"Select the page to display."},I={editLabel:"Edit section title."},P={navLabel:"Quick access"},L={confirm:"Confirm",cancel:"Cancel",close:"Close",next:"next",previous:"previous"},M={badgeLabel:"Include notification(s)",openNewTab:"Open link in a new tab"},k={menuLabel:"Additional menu"},H={label:"Actions"},W={inProgess:"Loading in progress…"},b={errors:v,nbCharLeft:x,input:T,form:S,message:y,modal:q,pagination:w,panel:I,skipLinks:P,general:L,menuItem:M,itemMore:k,actionMore:H,loader:W},B={component:"mg-input-select",title:"Molecules/Inputs/mg-input-select",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{placeholder:{table:{defaultValue:{summary:b.input.select.placeholder}}},mgWidth:{options:[void 0,2,4,16,"full"],control:{type:"select"}},value:{control:"object"},tooltipPosition:{options:[void 0,...f],control:{type:"select"}}}},a=m=>g("mg-input-select",{...h(m,{placeholder:b.input.select.placeholder})}),e={render:a,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,required:!0,readonly:!1,disabled:!1,items:["blu","bli","blo","le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort"],mgWidth:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>.",placeholder:void 0,placeholderHide:!1,placeholderDisabled:!1}},t={render:a,args:{...e.args,tooltip:"",helpText:"",required:!1,items:[{title:"blu",value:"blublu"},{title:"bli",value:"blibli"},{title:"blo",value:"bloblo"},{title:"bla",value:"blabla",disabled:!0}]}},l={render:a,args:{...t.args,items:[{title:"blu",value:"blublu",group:"1st group"},{title:"bli",value:"blibli",group:"2nd group"},{title:"blo",value:"bloblo",group:"1st group"},{title:"bla",value:"blabla"}]}};var n,s,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
    // Placeholder
    placeholder: undefined,
    placeholderHide: false,
    placeholderDisabled: false
  }
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var i,r,u;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(u=(r=t.parameters)==null?void 0:r.docs)==null?void 0:u.source}}};var c,d,p;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(p=(d=l.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const G=["MgInputSelect","WithObjectItems","WithGroups"];export{e as MgInputSelect,l as WithGroups,t as WithObjectItems,G as __namedExportsOrder,B as default};
