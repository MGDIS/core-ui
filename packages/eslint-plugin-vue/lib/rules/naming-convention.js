const VueUtils = require('eslint-plugin-vue/lib/utils');
const { getAttributeValue } = require('../utils/attributes.utils');

module.exports = {
  meta: {
    type: `problem`,
    docs: {
      description: 'IDs and classes must use the kebab-case naming convention',
      category: 'Style',
      recommended: true,
    },
    schema: [],
    messages: {
      notBEMClass: 'Class must follow BEM convention',
      notKebabCaseId: 'ID must be in kebab-case',
    },
  },

  create(context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      /**
       * Check .class
       * Must follow BEM convention
       * https://gist.github.com/Potherca/f2a65491e63338659c3a0d2b07eee382
       */
      'VAttribute[key.argument.name="class"], VAttribute[key.name="class"]'(node) {
        for (const classAttribute of getAttributeValue(node)?.split(' ') || []) {
          if (!/^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$/.test(classAttribute)) {
            context.report({
              node,
              messageId: 'notBEMClass',
            });
          }
        }
      },
      /**
       * Check #id
       * Must be in kebab-case
       * https://stylelint.io/user-guide/rules/regex/
       */
      'VAttribute[key.argument.name="id"], VAttribute[key.name="id"]'(node) {
        if (!/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(getAttributeValue(node))) {
          context.report({
            node,
            messageId: 'notKebabCaseId',
          });
        }
      },
    });
  },
};
