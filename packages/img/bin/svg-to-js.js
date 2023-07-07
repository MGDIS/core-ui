#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This file compile all svg files to a single js file
 */
const { writeFile, readFile } = require('fs').promises;
const { join } = require('path');
const iconsList = require('../dist/icons/index.json');

const scriptName = 'svg-to-js';
const distfileName = 'index.js';

(async () => {
  console.log(`[${scriptName}] adding javascript icons files...`);
  const icons = await Promise.all(iconsList.map(async icon => ({name: icon, file: await readFile(join(__dirname, `../dist/icons/${icon}.svg`), { encoding: 'utf8' })})))
  await writeFile(join(__dirname, `../dist/icons/${distfileName}`), `export const icons = {
    ${icons.map(({name, file}) => `'${name}': '${file}'`).join(',\u000A')}
  }`);
  console.log(`[${scriptName}] '${distfileName}' added to your project.`);
})();
