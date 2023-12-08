module.exports = {
  /**
   *  Check if node had an attribute
   *
   * @param {object} node node to check
   * @param {string} attribute attribute we are looking for
   * @returns {object} matching attribute
   */
  attribute(node, attribute) {
    return node.startTag?.attributes?.find((attr) => {
      return attr.directive ? attr.key.argument?.name === attribute : attr.key.name === attribute
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
    return classesAttribute && classesAttribute.some((classAttribute) => classAttribute === className);
  },
  /**
   * Get attribute value
   * If the attribute is a directive, the path to get the value is different
   * 
   * @param {object} attribute 
   * @returns {string} attribute value
   */
  getAttributeValue(attribute) {
    return attribute ? attribute.directive ? attribute.value.expression.value : attribute.value.value : undefined;
  }
};
