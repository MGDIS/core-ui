const rule = require('../../../lib/rules/col-in-row');
const createRuleTester = require('../rule-tester');
const ruleTester = createRuleTester();

ruleTester.run('col-in-row', rule, {
  valid: [
    {
      code: `<div class="row">
        <div class="col-md-2">Column content</div>
      </div>`,
    },
    {
      code: `<div class="row">
        <div class="col-md-2">First column content</div>
        <div class="col-md-2">Second column content</div>
      </div>`,
    },
  ],

  invalid: [
    {
      code: `<div>
        <div class="col-md-2">Column content</div>
      </div>`,
      errors: [{ message: 'col-* classes must be immediate children of rows', type: 'Div' }],
    },
    {
      code: `<div class="row">
        <div>Column content</div>
      </div>`,
      errors: [{ message: 'All row class children must have a col-* class', type: 'Div' }],
    },
    {
      code: `<div class="row">
        <div class="col-md-2">First column content</div>
        <div>Second column content</div>
      </div>`,
      errors: [{ message: 'All row class children must have a col-* class', type: 'Div' }],
    },
  ],
});
