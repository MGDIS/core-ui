import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S=e((()=>{a={required:`This field is required.`},o=`{counter} characters left.`,s={showMore:`Show more`,select:{placeholder:`Select a value`},checkbox:{selectedValues:`{nb} selected values`,selectedValue:`{nb} selected value`,editButton:`Edit`,selectButton:`Select values`,showButton:`Show`,sections:{label:`Values grouped by: "Selected" or "Available"`,badge:{label:`value(s)`},search:{label:`Enter a value`,values:`{count} value(s) found`,noValue:`No values found`},selected:{title:`Selected`,action:`Unselect all`,tooltip:`Unselect all current values`,values:`{count} value(s) selected`,noValue:`No value selected`},notSelected:{title:`Available`,action:`Select all`,tooltip:`Select all current values`,values:`{count} value(s) available`,noValue:`All values are selected`}}},date:{pattern:{dd:`dd`,mm:`mm`,yyyy:`yyyy`},helpText:{expectedFormat:`Expected format: {pattern} (ex: {date})`},error:{badInput:`The date is inexistent or incorrect, the expected format is {pattern} (ex: {date})`,min:`The date must be after or equal to {min}`,max:`The date must be before or equal to {max}`,minMax:`The date must be between {min} and {max}`}},numeric:{error:{min:`The value must be greater than or equal to {min}`,max:`The value must be less than or equal to {max}`,minMax:`The value must be between {min} and {max}`}},password:{display:`Display password value`,hide:`Hide password value`},combobox:{notFound:`No value matches your input`,notAvailable:`No value available`,search:`Search…`},text:{helpText:{email:`Expected format: name@example.com`,emails:`Expected format: first@example.com, second@example.com`,url:`Expected format: https://example.com`},errors:{typeMismatch:{email:`The value is incorrect, the expected format is name@example.com`,emails:`The value is incorrect, the expected format is first@example.com, second@example.com`,url:`The value is incorrect, the expected format is https://example.com`}}},file:{helpText:{accept:`Accepted extensions: {{accept}}`,maxSize:`Maximum size: {{maxSize}}`},errors:{maxSize:`The file size exceeds the maximum allowed size of {{maxSize}}`},browse:`Browse…`,deleteButton:`Delete file`}},c={required:`Fields with a <strong class="mg-u-is-asterisk">*</strong> are required`,requiredSingle:`Field with a <strong class="mg-u-is-asterisk">*</strong> is required`,allRequired:`All fields are required`,allRequiredSingle:`The field is required`},l={closeButton:`Close message`},u={closeButton:`Close modal`},d={label:`Pagination`,page:`page`,pages:`pages`,nextLabel:`Next page`,previousLabel:`Previous page`,selectPage:`Select the page to display.`},f={editLabel:`Edit section title.`},p={navLabel:`Quick access`},m={label:`Breadcrumb`},h={confirm:`Confirm`,cancel:`Cancel`,close:`Close`,next:`Next`,previous:`Previous`,reset:`reset`},g={badgeLabel:`Include notification(s)`,openNewTab:`Open link in a new tab`},_={menuLabel:`Additional menu`},v={label:`Actions`},y={inProgress:`Loading in progress…`},b={sortableCaption:`(column headers with buttons are sortable)`},x={errors:a,nbCharLeft:o,input:s,form:c,alert:l,modal:u,pagination:d,panel:f,skipLinks:p,breadcrumb:m,general:h,menuItem:g,itemMore:_,actionMore:v,loader:y,table:b}})),C,w,T,E,D,O;e((()=>{i(),n(),S(),C={component:`mg-input-select`,title:`Molecules/Inputs/mg-input-select`,parameters:{actions:{handles:[`value-change`,`input-valid`]}}},w=e=>r(`mg-input-select`,t(e,{placeholder:x.input.select.placeholder,tooltipPosition:`input`})),T={render:w,args:{value:``,items:[`blu`,`bli`,`blo`,`le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort`],identifier:`identifier`,name:`input-name`,label:`Label`,labelOnTop:!1,labelHide:!1,placeholder:void 0,placeholderHide:!1,placeholderDisabled:!1,required:!1,readonly:!1,disabled:!1,mgWidth:void 0,tooltip:`This is a tooltip`,tooltipPosition:void 0,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`}},E={render:w,args:{...T.args,tooltip:``,helpText:``,items:[{title:`blu`,value:`blublu`},{title:`bli`,value:`blibli`},{title:`blo`,value:`bloblo`},{title:`bla`,value:`blabla`,disabled:!0}]}},D={render:w,args:{...E.args,items:[{title:`blu`,value:`blublu`,group:`1st group`},{title:`bli`,value:`blibli`,group:`2nd group`},{title:`blo`,value:`bloblo`,group:`1st group`},{title:`bla`,value:`blabla`}]}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    value: '',
    items: ['blu', 'bli', 'blo', 'le long libellé qui va faire sortir le champ mg-input-select de sa zone de confort'],
    identifier: 'identifier',
    name: 'input-name',
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    placeholder: undefined,
    placeholderHide: false,
    placeholderDisabled: false,
    required: false,
    readonly: false,
    disabled: false,
    mgWidth: undefined,
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputSelect.args,
    // remove extra
    tooltip: '',
    helpText: '',
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O=[`MgInputSelect`,`WithObjectItems`,`WithGroups`]}))();export{T as MgInputSelect,D as WithGroups,E as WithObjectItems,O as __namedExportsOrder,C as default};