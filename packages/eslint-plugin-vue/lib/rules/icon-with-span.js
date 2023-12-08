const VueUtils = require('eslint-plugin-vue/lib/utils');
const { hasClass, attribute, getAttributeValue } = require('../utils/attributes.utils');

module.exports = {
  meta: {
    type: `problem`,
    docs: {
      description: 'Font icon must be used in span with the aria-hidden attribute',
      category: 'RGAA',
      recommended: true,
    },
    schema: [],
  },

  create(context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement"(node) {
        if (hasClass(node, 'fa')) {
          // Check if it's a span
          if (node.name !== 'span') {
            context.report({
              node,
              message: 'Icons must use the span element instead of {{ tag }}',
              data: {
                tag: node.name,
              },
            });
          }

          // Check if it's using an aria-hidden attribute
          if (getAttributeValue(attribute(node, 'aria-hidden')) !== 'true') {
            context.report({
              node,
              message: 'Icon aria-hidden attribute is missing',
            });
          }
        }
      },
    });
  },
};
