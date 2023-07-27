const rule = require('../../../lib/rules/icon-with-span');
const createRuleTester = require('../rule-tester');
const ruleTester = createRuleTester();

ruleTester.run('icon-with-span', rule, {
  valid: [
    {
      code: '<span class="fa fa-thumbs-up" aria-hidden="true"></span>',
    },
  ],

  invalid: [
    {
      code: '<i class="fa fa-thumbs-down" aria-hidden="true"></i>',
      errors: [{ message: 'Icons must use the span element instead of i', type: 'I' }],
    },
    {
      code: '<i class="fa fa-thumbs-down"></i>',
      errors: [
        { message: 'Icons must use the span element instead of i', type: 'I' },
        { message: 'Icon aria-hidden attribute is missing', type: 'I' },
      ],
    },
    {
      code: '<span class="fa fa-thumbs-down"></span>',
      errors: [{ message: 'Icon aria-hidden attribute is missing', type: 'Span' }],
    },
  ],
});
