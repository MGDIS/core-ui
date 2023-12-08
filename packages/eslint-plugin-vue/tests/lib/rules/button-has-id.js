const rule = require('../../../lib/rules/button-has-id');
const createRuleTester = require('../rule-tester');
const ruleTester = createRuleTester();

ruleTester.run('button-has-id', rule, {
  valid: [
    {
      code: `<template>
        <button id="tnr-id">button text</button>
      </template>`,
    },
    {
      code: `<template>
        <a id="tnr-id">anchor text</a>
      </template>`,
    },
    {
      code: `<template>
        <button :id="tnrId">button text</button>
      </template>`,
    },
    {
      code: `<template>
        <a :id="tnrId">anchor text</a>
      </template>`,
    },
  ],
  invalid: [
    {
      code: `<template>
        <button>button text</button>
      </template>`,
      errors: [{ message: 'Buttons and Anchors must have an ID' }],
    },
    {
      code: `<template>
        <a>anchor text</a>
      </template>`,
      errors: [{ message: 'Buttons and Anchors must have an ID' }],
    },
  ],
});
