const { attribute } = require('../utils/attributes.utils');

module.exports = {
  meta: {
    type: `problem`,
    docs: {
      description: 'Columns must be immediate children of rows',
      category: 'Style',
      recommended: false,
    },
    schema: [],
  },

  create(context) {
    const classRow = 'row';
    const classColStartsWith = 'col-';
    const ignoreChildNodeType = ['text', 'comment'];

    return {
      '[attrs]'(node) {
        /**
         * Content should be placed within columns, and only columns may be immediate children of rows.
         * https://getbootstrap.com/docs/3.4/css/#grid
         */
        const classList = attribute(node, 'class')?.value.split(' ');

        if (classList) {
          for (const className of classList) {
            // Check if col class has a parent row class
            if (
              className === classRow &&
              !node.childNodes
                .filter((childNode) => !ignoreChildNodeType.includes(childNode.type))
                .every((childNode) => {
                  const childClassesAttribute = attribute(childNode, 'class')?.value.split(' ') || [];
                  return childClassesAttribute.some((classAttribute) => classAttribute.startsWith(classColStartsWith));
                })
            ) {
              context.report({
                node,
                message: 'All row class children must have a col-* class',
              });
            }
            // Check if row class immediate children have a col class
            if (className.startsWith('col-')) {
              const parentClassesAttribute = attribute(node.parent, 'class');
              if (!parentClassesAttribute || !parentClassesAttribute.value.includes(classRow))
                context.report({
                  node,
                  message: 'col-* classes must be immediate children of rows',
                });
            }
          }
        }
      },
    };
  },
};