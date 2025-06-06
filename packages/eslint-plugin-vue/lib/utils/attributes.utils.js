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
    if (attribute?.directive) {
      // directive attributes (e.g. :id="withProps")
      attributeValue = module.exports.getValue(attribute.value?.expression);
      if (attribute?.key?.argument?.name == 'id') {
        // If the attribute is an ID, we remove spaces, done for the ConditionalExpression case
        attributeValue = attributeValue.split(' ').join('-');
      }
    } else {
      attributeValue = attribute?.value?.value;
    }
    return attributeValue ?? '';
  },
  /**
   * Get expression value based on type
   *
   * @param {object} expression
   * @returns {string} expression value
   */
  getValue(expression) {
    switch (expression?.type) {
      case 'Literal': // Used for values (e.g. :id="'kebab-case'")
        return expression.value;
      case 'Identifier': // Used for variables (e.g. :id="withProps")
        return expression.name.toLowerCase();
      case 'CallExpression': // Used for function calls (e.g. :id="method(blu)")
        return 'call-expression'; // No need to reconstruct
      case 'TemplateLiteral': // Used for template literals (e.g. :id="\`with-\${props}\`")
        return module.exports.reconstructTemplateLiteral(expression);
      case 'ConditionalExpression': // Used for ternary operators (e.g. :id="using ? 'ternary' : 'operator'")
        return `${module.exports.getValue(expression.consequent)} ${module.exports.getValue(expression.alternate)}`;
      case 'ObjectExpression': // Used for object expressions (e.g. :id="{ 'blu': blu }")
        return expression.properties.map(property => module.exports.getValue(property.key)).join(' ');
      case 'ArrayExpression': // Used for array expressions (e.g. :id="['rich-text-input__input-container', { 'rich-text-input__input-container--readonly': readonly }]")
        return expression.elements.map(element => module.exports.getValue(element)).join(' ');
      case 'BinaryExpression': // Used for binary expressions (e.g. :id="blu + 'bli'")
        return `${module.exports.getValue(expression.left)}${module.exports.getValue(expression.right)}`;
      case 'MemberExpression': // Used for member expressions (e.g. :id="blu.bli")
        return 'member-expression'; // No need to reconstruct
      default:
        return '';
    }
  },
  /**
   * Reconstruct a template literal from its expression
   *
   * @param {object} expression
   * @returns {string} reconstructed template literal
   */
  reconstructTemplateLiteral(expression) {
    let templateLiteral = '';
    for (let i = 0; i < expression.quasis.length; i++) {
      const quasi = expression.quasis[i];
      templateLiteral += quasi.value.cooked ?? '';
      if (i < expression.expressions.length) {
        templateLiteral += module.exports.getValue(expression.expressions[i]);
      }
    }
    return templateLiteral;
  },
};
