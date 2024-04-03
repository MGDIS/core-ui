const VueUtils = require('eslint-plugin-vue/lib/utils');
const { attribute, getAttributeValue } = require('../utils/attributes.utils');

module.exports = {
  meta: {
    type: `problem`,
    docs: {
      description: 'Columns must be immediate children of rows',
      category: 'Style',
      recommended: false,
    },
    schema: [],
    messages: {
      rowRequiredCol: 'All row class children must have a col-* class',
      colChildrenRow: 'col-* classes must be immediate children of rows',
    },
  },

  create(context) {
    const classRow = 'row';
    const classColStartsWith = 'col-';
    const ignoreChildNodeType = ['VText'];

    return VueUtils.defineTemplateBodyVisitor(context, {
      VElement(node) {
        /**
         * Content should be placed within columns, and only columns may be immediate children of rows.
         * https://getbootstrap.com/docs/3.4/css/#grid
         */
        const classList = getAttributeValue(attribute(node, 'class'))?.split(' ');

        if (classList) {
          for (const className of classList) {
            // Check if col class has a parent row class
            if (
              className === classRow &&
              !node.children
                .filter(childNode => !ignoreChildNodeType.includes(childNode.type))
                .every(childNode => {
                  const childClassesAttribute = getAttributeValue(attribute(childNode, 'class'))?.split(' ') || [];
                  return childClassesAttribute.some(classAttribute => classAttribute.startsWith(classColStartsWith));
                })
            ) {
              context.report({
                node,
                messageId: 'rowRequiredCol',
              });
            }
            // Check if row class immediate children have a col class
            if (className.startsWith('col-')) {
              const parentClassesAttribute = attribute(node.parent, 'class');
              if (!parentClassesAttribute || !getAttributeValue(parentClassesAttribute).split(' ').includes(classRow)) {
                context.report({
                  node,
                  messageId: 'colChildrenRow',
                });
              }
            }
          }
        }
      },
    });
  },
};
