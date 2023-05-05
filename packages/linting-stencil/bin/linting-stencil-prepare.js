#!/usr/bin/env node
/* eslint-disable no-console, @typescript-eslint/no-var-requires */

/**
 * This file copy all lint rc files to local folder
 */
const { writeFile } = require('fs').promises;
const { name } = require('../package.json');

const scriptName = 'linting-stencil-prepare';

const files = {
  '.eslintrc.js': `const { setupEslint } = require("${name}");
    
    module.exports = {
      ...setupEslint({
        parserOptions: {
          project: "./tsconfig.json"
        },
      }),
    }
  `,
  '.prettierrc.js': `const { prettierrc } = require("${name}");
    module.exports = { ...prettierrc };
  `,
};

(async () => {
  console.log(`[${scriptName}] adding linting files...`);

  for await (const file of Object.keys(files)) {
    await writeFile(`${file}`, files[file]);
    console.log(`[${scriptName}] '${file}' added to your project.`);
  }
})();
