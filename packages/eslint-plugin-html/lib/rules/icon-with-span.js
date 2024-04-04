const { hasClass, attribute } = require('../utils/attributes.utils');

module.exports = {
  meta: {
    type: `problem`,
    docs: {
      description: 'Font icon must be used in span with the aria-hidden attribute',
      category: 'RGAA',
      recommended: true,
    },
    schema: [],
    messages: {
      notSpan: 'Icons must use the span element instead of {{ tag }}',
      missingAriaHidden: 'Icon aria-hidden attribute is missing',
    },
  },

  create(context) {
    return {
      '[attrs]'(node) {
        if (hasClass(node, 'fa')) {
          // Check if it's a span
          if (node.tagName !== 'span') {
            context.report({
              node,
              messageId: 'notSpan',
              data: {
                tag: node.tagName,
              },
            });
          }

          // Check if it's using an aria-hidden attribute
          if (attribute(node, 'aria-hidden')?.value !== 'true') {
            context.report({
              node,
              messageId: 'missingAriaHidden',
            });
          }
        }
      },
    };
  },
};
