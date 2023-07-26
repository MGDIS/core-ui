#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * This file copy all lint rc files to local folder
 */

const fs = require('fs');

const eslintrc = `const { eslintrc } = require('@mgdis/linting-angularjs');

module.exports = {
  ...eslintrc,
};
`;

const prettierc = `const { prettierrc } = require('@mgdis/linting-angularjs');
module.exports = { ...prettierrc };
`;

console.log('[linting-angularjs-prepare] adding linting files...');

fs.writeFile('.eslintrc.js', eslintrc, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("[linting-angularjs-prepare] '.eslintrc.js' added to your project.");
});

fs.writeFile('.prettierrc.js', prettierc, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("[linting-angularjs-prepare] '.prettierrc.js' added to your project.");
});
