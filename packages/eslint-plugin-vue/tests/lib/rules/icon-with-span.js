const rule = require('../../../lib/rules/icon-with-span');
const createRuleTester = require('../rule-tester');
const ruleTester = createRuleTester();

ruleTester.run('icon-with-span', rule, {
  valid: [
    {
      code: `<template>
        <span class="fa fa-thumbs-up" aria-hidden="true"></span>
      </template>`,
    },
    {
      code: `<template>
        <span :class="'fa fa-thumbs-up'" aria-hidden="true"></span>
      </template>`,
    },
    {
      code: `<template>
        <span class="fa" :class="'fa-thumbs-up'" aria-hidden="true"></span>
      </template>`,
    },
  ],

  invalid: [
    {
      code: `<template>
        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
      </template>`,
      errors: [{ message: 'Icons must use the span element instead of i' }],
    },
    {
      code: `<template>
        <i class="fa fa-thumbs-down"></i>
      </template>`,
      errors: [{ message: 'Icons must use the span element instead of i' }, { message: 'Icon aria-hidden attribute is missing' }],
    },
    {
      code: `<template>
        <span class="fa fa-thumbs-down"></span>
      </template>`,
      errors: [{ message: 'Icon aria-hidden attribute is missing' }],
    },
  ],
});
