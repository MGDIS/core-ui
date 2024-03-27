#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * This file compile all svg files to a single js file
 */
const { writeFile, readFile, mkdir } = require('fs/promises');
const { join } = require('path');
const iconsList = require('@mgdis/img/dist/icons/index.json');

const scriptName = 'build-icons';
const distfileName = 'index.ts';
const iconsDir = 'src/assets/icons';

(async () => {
  console.log(`[${scriptName}] adding javascript icons files...`);

  // get files raw
  const icons = await Promise.all(iconsList.map(async icon => ({ name: icon, file: await readFile(join(__dirname, `../../img/dist/icons/${icon}.svg`), { encoding: 'utf8' }) })));

  // create icons dir
  await mkdir(iconsDir, { recursive: true });

  // write file
  await writeFile(join(__dirname, `../${iconsDir}/${distfileName}`), `export const icons = {${icons.map(({ name, file }) => `'${name}': '${file}'`).join(',')}};`);

  console.log(`[${scriptName}] '${distfileName}' added to your project.`);
})();
