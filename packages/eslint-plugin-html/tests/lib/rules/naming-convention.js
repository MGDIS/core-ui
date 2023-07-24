const rule = require('../../../lib/rules/naming-convention');
const createRuleTester = require('../rule-tester');
const ruleTester = createRuleTester();

ruleTester.run('naming-convention', rule, {
  valid: [
    {
      code: '<a id="kebab-case">Anchor text</a>',
    },
    {
      code: `<button class="bem-convention bem-convention--modifier">
        <span class="bem-convention__element">Button</span>
        <span class="bem-convention__other-element">text</span>
      </button>`,
    },
  ],

  invalid: [
    {
      code: '<a id="PascalCase">Anchor text</a>',
      errors: [{ message: 'ID must be in kebab-case', type: 'A' }],
    },
    {
      code: '<a class="PascalCase">Anchor text</a>',
      errors: [{ message: 'Class must follow BEM convention', type: 'A' }],
    },
    {
      code: `<button class="not_bem-convention not_bem_convention">
        <span class="not__bem__convention">Button text</span>
      </button>`,
      errors: [
        { message: 'Class must follow BEM convention', type: 'Button' },
        { message: 'Class must follow BEM convention', type: 'Button' },
        { message: 'Class must follow BEM convention', type: 'Span' },
      ],
    },
  ],
});
