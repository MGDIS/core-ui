const config = require("eslint-config-custom");

module.exports = {
    ...config,
    extends: [ ...config.extends, "plugin:@stencil-community/recommended", "plugin:jsx-a11y/recommended", ]
}