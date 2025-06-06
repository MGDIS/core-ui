const rule = require('../../../lib/rules/naming-convention');
const createRuleTester = require('../rule-tester');
const ruleTester = createRuleTester();

ruleTester.run('naming-convention', rule, {
  valid: [
    {
      code: `<template>
        <a id="kebab-case">Anchor text</a>
      </template>`,
    },
    /* Directive */
    // Literal
    {
      code: `<template>
        <a :id="'kebab-case'">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a class="blu" :class="{'blu--bli': blo}">Anchor text</a>
      </template>`,
    },
    // Identifier
    {
      code: `<template>
        <a :id="withProps">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="withProps.props">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="withProps.deep.props">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="withProps[props]">Anchor text</a>
      </template>`,
    },
    // CallExpression
    {
      code: `<template>
        <a :id="method(blu)">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="method(blu, bli)">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="method(blu, 'bli')">Anchor text</a>
      </template>`,
    },
    // TemplateLiteral
    {
      code: `<template>
        <a :id="id + '-blu'">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="\`with-\${props}\`">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="\`with-\${two}-\${props}\`">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
      <a :id="\`\${starting}-with-props\`">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="\`with-\${method(blu)}\`">Anchor text</a>
      </template>`,
    },
    // ConditionalExpression
    {
      code: `<template>
        <a :id="using ? 'ternary' : 'operator'">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="using ? 'ternary' : operator">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="using ? 'ternary' : \`template-literal-\${operator}\`">Anchor text</a>
      </template>`,
    },
    // ObjectExpression
    {
      code: `<template>
      <a :class="{ 'blu': value }">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :class="{ 'blu': value, 'bli': value2 }">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
      <a :class="{ 'blu': value, bli: value2 }">Anchor text</a>
      </template>`,
    },
    // ArrayExpression
    {
      code: `<template>
        <a :class="['blu', 'bli']">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :id="[blu ? 'bli' : 'bla']">Anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <a :class="['rich-text-input__input-container', { 'rich-text-input__input-container--readonly': readonly }]">Anchor text</a>
      </template>`,
    },
    {
      code: `<button class="bem-convention bem-convention--modifier">
        <span class="bem-convention__element">Button</span>
        <span class="bem-convention__other-element">text</span>
      </button>`,
    },
    {
      code: `<button class="bem-convention" :class="'bem-convention--modifier'">
        <span class="bem-convention__element">Button</span>
        <span :class="'bem-convention__other-element'">text</span>
      </button>`,
    },
  ],
  invalid: [
    {
      code: `<template>
          <a id="PascalCase">Anchor text</a>
        </template>`,
      errors: [{ message: 'ID must be in kebab-case' }],
    },
    {
      code: `<template>
          <a :id="'PascalCase'">Anchor text</a>
        </template>`,
      errors: [{ message: 'ID must be in kebab-case' }],
    },
    {
      code: `<template>
      <a :id="\`\${props}Capital\`">Anchor text</a>
      </template>`,
      errors: [{ message: 'ID must be in kebab-case' }],
    },
    {
      code: `<template>
      <a :id="\`\${props}--modifier\`">Anchor text</a>
      </template>`,
      errors: [{ message: 'ID must be in kebab-case' }],
    },
    {
      code: `<template>
          <a class="PascalCase">Anchor text</a>
        </template>`,
      errors: [{ message: 'Class must follow BEM convention' }],
    },
    {
      code: `<template>
          <a :class="'PascalCase'">Anchor text</a>
        </template>`,
      errors: [{ message: 'Class must follow BEM convention' }],
    },
    {
      code: `
        <template>
          <button class="not_bem-convention not_bem_convention">
            <span class="not__bem__convention">Button text</span>
          </button>
        </template>`,
      errors: [{ message: 'Class must follow BEM convention' }, { message: 'Class must follow BEM convention' }, { message: 'Class must follow BEM convention' }],
    },
    {
      code: `
        <template>
          <button class="not_bem-convention" :class="'not_bem_convention'">
            <span class="not__bem__convention">Button text</span>
          </button>
        </template>`,
      errors: [{ message: 'Class must follow BEM convention' }, { message: 'Class must follow BEM convention' }, { message: 'Class must follow BEM convention' }],
    },
  ],
});
