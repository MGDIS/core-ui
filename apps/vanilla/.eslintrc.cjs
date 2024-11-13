const { eslintrc } = require('@mgdis/linting-angularjs');

// remove angularjs rules
eslintrc.extends = eslintrc.extends.filter((ext) => ext !== 'plugin:angular/johnpapa');

module.exports = { ...eslintrc };
