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
    return {
      'Button, A'(node) {
        if (!attribute(node, 'id')) {
          context.report({
            node,
            messageId: 'idRequired',
          });
        }
      },
    };
  },
};
