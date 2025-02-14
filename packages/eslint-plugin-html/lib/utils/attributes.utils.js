module.exports = {
  /**
   *  Check if node had an attribute
   *
   * @param {object} node node to check
   * @param {string} attribute attribute we are looking for
   * @returns {object} matching attribute
   */
  attribute(node, attribute) {
    return node.attrs?.find(attr => attr.name === attribute);
  },
  /**
   * Check if node has a specific class name
   *
   * @param {object} node
   * @param {string} className
   * @returns {Boolean} has class name
   */
  hasClass(node, className) {
    const classesAttribute = module.exports.attribute(node, 'class')?.value.split(' ');
    return classesAttribute && classesAttribute.some(classAttribute => classAttribute === className);
  },
};
