const VueUtils = require('eslint-plugin-vue/lib/utils');
const { attribute } = require('../utils/attributes.utils');

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Buttons and Anchors must have an ID',
      category: 'TAR',
      recommended: true,
    },
    schema: [],
    messages: {
      idRequired: 'Buttons and Anchors must have an ID',
    },
  },

  create(context) {
    return VueUtils.defineTemplateBodyVisitor(context, {
      "VElement[name='button'], VElement[name='a']"(node) {
        if (!attribute(node, 'id')) {
          context.report({
            node,
            messageId: 'idRequired',
          });
        }
      },
    });
  },
};
