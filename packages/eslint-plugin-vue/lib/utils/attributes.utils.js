module.exports = {
  /**
   *  Check if node had an attribute
   *
   * @param {object} node node to check
   * @param {string} attribute attribute we are looking for
   * @returns {object} matching attribute
   */
  attribute(node, attribute) {
    return node.startTag?.attributes?.find(attr => {
      return attr.directive ? attr.key.argument?.name === attribute : attr.key.name === attribute;
    });
  },
  /**
   * Check if node has a specific class name
   *
   * @param {object} node
   * @param {string} className
   * @returns {Boolean} has class name
   */
  hasClass(node, className) {
    const classesAttribute = module.exports.getAttributeValue(module.exports.attribute(node, 'class'))?.split(' ');
    return classesAttribute && classesAttribute.some(classAttribute => classAttribute === className);
  },
  /**
   * Get attribute value
   * If the attribute is a directive, the path to get the value is different
   *
   * @param {object} attribute
   * @returns {string} attribute value
   */
  getAttributeValue(attribute) {
    let attributeValue;
    // :id
    if (attribute?.directive) {
      switch (attribute.value?.expression?.type) {
        case 'Literal':
          // :id="'kebab-case'"
          attributeValue = attribute.value.expression.value;
          break;
        case 'Identifier':
          // :id="withProps"
          attributeValue = attribute.value.expression.name.toLowerCase();
          break;
        case 'TemplateLiteral':
          // :id="`with-${props}`"
          attributeValue = module.exports.reconstructTemplateLiteral(attribute.value.expression);
          break;
        case 'ConditionalExpression':
          // :id="using ? 'ternary' : 'operator'"
          attributeValue = `${attribute.value.expression.test.raw}-${attribute.value.expression.consequent.value}-${attribute.value.expression.alternate.value}`.toLowerCase();
          break;
      }
    } else {
      attributeValue = attribute?.value?.value;
    }
    return attributeValue ?? '';
  },
  reconstructTemplateLiteral(node) {
    let result = '';

    for (let i = 0; i < node.quasis.length; i++) {
      const quasi = node.quasis[i];
      result += quasi.value.cooked ?? '';

      if (i < node.expressions.length) {
        const expr = node.expressions[i];

        if (expr.type === 'Identifier') {
          result += expr.name.toLowerCase();
        } else if (expr.type === 'Literal' && typeof expr.value === 'string') {
          result += expr.value;
        } else if (expr.type === 'CallExpression') {
          result += expr.callee.name + '-' + expr.arguments.map(arg => arg.name || arg.value).join('-');
        }
      }
    }

    return result;
  },
};
