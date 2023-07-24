#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * This file copy all lint rc files to local folder
 */

const fs = require('fs');

const eslintrc = `const { eslintrc } = require('@mgdis/linting-vue2');

module.exports = {
  ...eslintrc,
};
`;

const prettierc = `const { prettierrc } = require('@mgdis/linting-vue2');
module.exports = { ...prettierrc };
`;

console.log('[linting-vue2-prepare] adding linting files...');

fs.writeFile('.eslintrc.js', eslintrc, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("[linting-vue2-prepare] '.eslintrc.js' added to your project.");
});

fs.writeFile('.prettierrc.js', prettierc, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("[linting-vue2-prepare] '.prettierrc.js' added to your project.");
});
