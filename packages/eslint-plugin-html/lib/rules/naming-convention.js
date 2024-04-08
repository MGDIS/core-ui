const { attribute } = require('../utils/attributes.utils');

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
    return {
      '[attrs]'(node) {
        /**
         * Check .class
         * Must follow BEM convention
         * https://gist.github.com/Potherca/f2a65491e63338659c3a0d2b07eee382
         */
        const classesAttribute = attribute(node, 'class');
        if (classesAttribute) {
          for (const classAttribute of classesAttribute.value.split(' ')) {
            if (!/^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$/.test(classAttribute)) {
              context.report({
                node,
                messageId: 'notBEMClass',
              });
            }
          }
        }
        /**
         * Check #id
         * Must be in kebab-case
         * https://stylelint.io/user-guide/rules/regex/
         */
        const idAttribute = attribute(node, 'id');
        if (idAttribute && !/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(idAttribute.value)) {
          context.report({
            node,
            messageId: 'notKebabCaseId',
          });
        }
      },
    };
  },
};
