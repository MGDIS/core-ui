import{h as g,f as h}from"./utils-mC9zhaFX.js";const f={required:"This field is required.",date:{badInput:'The date format must be <span aria-hidden="true">mm/dd/yyyy</span><span class="mg-u-visually-hidden">m m / d d / y y y y</span> and the date must be greater than {min}',min:"The date cannot be earlier than {min}",max:"The date cannot be later than {max}",minMax:"The date must be between {min} and {max}"},numeric:{min:"The value cannot be less than {min}",max:"The value cannot be greater than {max}",minMax:"The value must be between {min} et {max}"}},v="{counter} characters left.",T={select:{placeholder:"Select a value"},checkbox:{selectedValues:"{nb} selected values",selectedValue:"{nb} selected value",editButton:"Edit",selectButton:"Select values",showButton:"Show",label:"Enter a value",result:"result",results:"results",searchResults:"Search result(s) list.",noResult:"No result.",sections:{selected:{title:"Selected",titlePlurial:"Selected",action:"Unselect all"},notSelected:{title:"Not selected",titlePlurial:"Not selected",action:"Select all"}}}},x={required:'Fields with a <strong class="mg-u-is-asterisk">*</strong> are required',requiredSingle:'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',allRequired:"All fields are required",allRequiredSingle:"The field is required"},S={closeButton:"Close message"},q={closeButton:"Close modal"},y={label:"Pagination",page:"page",pages:"pages",nextPage:"Next page",previousPage:"Previous page",selectPage:"Select the page to display."},I={editLabel:"Edit section title."},L={navLabel:"Quick access"},M={confirm:"Confirm",cancel:"Cancel",close:"Close",next:"next",previous:"previous"},k={moreLabel:"Additional menu",badgeLabel:"Include notification(s)"},w={label:"Actions"},b={errors:f,nbCharLeft:v,input:T,form:x,message:S,modal:q,pagination:y,panel:I,skipLinks:L,general:M,plusMenu:k,actionMore:w},W={component:"mg-input-select",title:"Molecules/Inputs/mg-input-select",argTypes:{placeholder:{table:{defaultValue:{summary:b.input.select.placeholder}}},mgWidth:{options:[void 0,2,4,16,"full"],control:{type:"select"}},value:{control:"object"}},parameters:{actions:{handles:["value-change","input-valid"]}}},a=m=>g("mg-input-select",{...h(m,{placeholder:b.input.select.placeholder})}),e={render:a,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,required:!0,readonly:!1,disabled:!1,items:["blu","bli","blo","le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort"],mgWidth:void 0,tooltip:"This is a tooltip",helpText:"Help text with html <strong>bold</strong>, <em>italic</em>.",placeholder:void 0,placeholderHide:!1,placeholderDisabled:!1}},l={render:a,args:{...e.args,tooltip:"",helpText:"",required:!1,items:[{title:"blu",value:"blublu"},{title:"bli",value:"blibli"},{title:"blo",value:"bloblo"},{title:"bla",value:"blabla",disabled:!0}]}},t={render:a,args:{...l.args,items:[{title:"blu",value:"blublu",group:"1st group"},{title:"bli",value:"blibli",group:"2nd group"},{title:"blo",value:"bloblo",group:"1st group"},{title:"bla",value:"blabla"}]}};var n,s,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.',
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
}`,...(u=(o=l.parameters)==null?void 0:o.docs)==null?void 0:u.source}}};var c,d,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const C=["MgInputSelect","WithObjectItems","WithGroups"];export{e as MgInputSelect,t as WithGroups,l as WithObjectItems,C as __namedExportsOrder,W as default};
