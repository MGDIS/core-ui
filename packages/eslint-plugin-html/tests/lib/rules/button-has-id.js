const rule = require('../../../lib/rules/button-has-id');
const createRuleTester = require('../rule-tester');
const ruleTester = createRuleTester();

ruleTester.run('button-has-id', rule, {
  valid: [
    {
      code: '<button id="tnr-id">button text</button>',
    },
    {
      code: '<a id="tnr-id">anchor text</a>',
    },
  ],
  invalid: [
    {
      code: '<button>button text</button>',
      errors: [{ message: 'Buttons and Anchors must have an ID', type: 'Button' }],
    },
    {
      code: '<a>anchor text</a>',
      errors: [{ message: 'Buttons and Anchors must have an ID', type: 'A' }],
    },
  ],
});
