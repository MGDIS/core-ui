/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const changelogIdEnd = 'CHANGELOG';
const readmeIdEnd = 'README';

const updateItems = items => {
  items = items.map(item => {
    if (item.id !== undefined && item.id.endsWith(changelogIdEnd)) {
      item.label = 'Changelog';
    } else if (item.items !== undefined) {
      item.items = updateItems(item.items);
    }
    return item;
  });
  // Ensure readme is always first and changelog the last item
  items.sort((a, b) => {
    const aIsReadme = a.id?.endsWith(readmeIdEnd);
    const bIsReadme = b.id?.endsWith(readmeIdEnd);
    const aIsChangelog = a.id?.endsWith(changelogIdEnd);
    const bIsChangelog = b.id?.endsWith(changelogIdEnd);
    if (aIsReadme && !bIsReadme) return -1;
    if (!aIsReadme && bIsReadme) return 1;
    if (aIsChangelog && !bIsChangelog) return 1;
    if (!aIsChangelog && bIsChangelog) return -1;
    return 0;
  });
  return items;
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Core UI',
  tagline: 'Core UI packages documentation',
  favicon: 'img/favicon.ico',
  url: 'http://core.pages.mgdis.fr',
  baseUrl: '/core-ui/core-ui/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            return updateItems(await defaultSidebarItemsGenerator(args));
          },
        },
        blog: false,
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      redirectTo: '/docs',
      navbar: {
        title: 'Core UI',
        logo: {
          src: 'img/mgdis.svg',
          href: '/docs/',
        },
        items: [
          {
            href: 'http://core.pages.mgdis.fr/core-ui/core-ui/storybook/',
            label: 'MG-Components Storybook',
            position: 'right',
          },
          {
            href: 'https://gitlab.mgdis.fr/core/core-ui/core-ui/',
            label: 'GitLab',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `MGDIS © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/',
            to: '/docs/',
          },
        ],
      },
    ],
  ],
};

module.exports = config;