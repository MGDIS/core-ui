#! /usr/bin/env node
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('node:fs');
const axios = require('axios');
const showdown = require('showdown');

const converter = new showdown.Converter();

/**
 * Extract version changelog and publish it into a MS Teams chan
 */
(async function run() {
  if (!process.env.TEAMS_WEBHOOK_URL) {
    console.error('FATAL - Missing TEAMS_WEBHOOK_URL variable');
    process.exit(1);
  }
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
  const rootChangelogFile = fs.readFileSync(`${__dirname}/../../../CHANGELOG.md`, 'utf-8');
  let sectionStart = false;

  const changelog = [];

  for (const line of rootChangelogFile.split(/\r?\n/)) {
    if (!sectionStart && line.startsWith('## ')) {
      sectionStart = true;

      changelog.push(line);
      changelog.push('\n');
    } else {
      if (sectionStart && line.startsWith('## ')) {
        sectionStart = false;
        break;
      }
      if (sectionStart && line.length) {
        changelog.push(line.replace('packages/', 'https://gitlab.mgdis.fr/core/core-ui/core-ui/-/tree/master/packages/'));
        changelog.push('\n');
      }
    }
  }

  // TODO: Storybook is for now dedicated to mg-components but it is planned to make it the core-ui website.
  changelog.push(`\nView the complete changelog file here: [CHANGELOG](http://core.pages.mgdis.fr/core-documentation/docs/core-ui/CHANGELOG)`);

  const message = {
    title: 'Core UI release',
    text: converter.makeHtml(changelog.join('\n')).replace('\u2026', '...'),
  };

  await axios({
    method: 'POST',
    url: webhookUrl,
    data: message,
  });
})();
