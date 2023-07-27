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
    {
      code: `<template>
        <a :id="'kebab-case'">Anchor text</a>
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
      errors: [
        { message: 'Class must follow BEM convention' },
        { message: 'Class must follow BEM convention' },
        { message: 'Class must follow BEM convention' },
      ],
    },
    {
      code: `
      <template>
        <button class="not_bem-convention" :class="'not_bem_convention'">
          <span class="not__bem__convention">Button text</span>
        </button>
      </template>`,
      errors: [
        { message: 'Class must follow BEM convention' },
        { message: 'Class must follow BEM convention' },
        { message: 'Class must follow BEM convention' },
      ],
    },
  ],
});
