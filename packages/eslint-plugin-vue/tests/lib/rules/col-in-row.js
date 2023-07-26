const rule = require('../../../lib/rules/col-in-row');
const createRuleTester = require('../rule-tester');
const ruleTester = createRuleTester();

ruleTester.run('col-in-row', rule, {
  valid: [
    {
      code: `<template>
        <div class="row another-class">
          <!-- comment -->
          <div class="col-md-2">Column content</div>
        </div>
      </template>`,
    },
    {
      code: `<template>
        <div class="row">
          <div class="col-md-2">First column content</div>
          <div class="col-md-2">Second column content</div>
      </div>
    </template>`,
    },
    {
      code: `<template>
        <div class="parent">
          <div class="children">No concerned by row > cols</div>
      </div>
    </template>`,
    },
    {
      code: `<template>
        <div :class="'row'">
          <div :class="'col-md-2'">First column content</div>
          <div class="col-md-2">Second column content</div>
      </div>
    </template>`,
    },
  ],

  invalid: [
    {
      code: `<template>
        <div>
          <div class="col-md-2">Column content</div>
        </div>
      </template>`,
      errors: [{ message: 'col-* classes must be immediate children of rows' }],
    },
    {
      code: `<template>
        <div class="arrow">
          <div class="col-md-2">Column content</div>
        </div>
      </template>`,
      errors: [{ message: 'col-* classes must be immediate children of rows' }],
    },
    {
      code: `<template>
        <div>
          <div :class="'col-md-2'">Column content</div>
        </div>
      </template>`,
      errors: [{ message: 'col-* classes must be immediate children of rows' }],
    },
    {
      code: `<template>
        <div class="row">
          <div>Column content</div>
        </div>
      </template>`,
      errors: [{ message: 'All row class children must have a col-* class' }],
    },
    {
      code: `<template>
        <div :class="'row'">
          <div>Column content</div>
        </div>
      </template>`,
      errors: [{ message: 'All row class children must have a col-* class' }],
    },
    {
      code: `<template>
        <div class="row">
          <div class="col-md-2">First column content</div>
          <div>Second column content</div>
        </div>
      </template>`,
      errors: [{ message: 'All row class children must have a col-* class' }],
    },
  ],
});
