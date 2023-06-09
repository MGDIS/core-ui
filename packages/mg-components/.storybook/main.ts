const { readdirSync, statSync } = require('fs');
const { join } = require('path');

/**
 * List folders from a given path
 * @param folderPath - path we will parse to get childs
 * @param folderName - folder we are looking for
 * @returns folders list ending with `folderName`
 */
const getFilePathsEndingWith = (folderPath: string, folderName: string): string[] => {
  const filePaths: string[] = [];
  const pathChild = readdirSync(folderPath);
  pathChild.forEach(file => {
    const filePath = join(folderPath, file);
    if (statSync(filePath).isDirectory() && !filePath.endsWith('node_modules') && !filePath.endsWith('storybook-static')) {
      filePaths.push(...getFilePathsEndingWith(filePath, folderName));
      if (filePath.endsWith(folderName)) {
        filePaths.push(filePath);
      }
    }
  });
  return filePaths;
};

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(tsx)'],
  addons: ['@storybook/addon-essentials', '@pxtrn/storybook-addon-docs-stencil', '@storybook/addon-a11y', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: getFilePathsEndingWith(join(__dirname, '../src/'), '/img').reduce((acc: any[], from) => {
    acc.push(
      {
        from,
        to: '/doc/img',
      },
      {
        from,
        to: '/img',
      },
    );
    return acc;
  }, []),
  refs: {
    'design-system': {
      title: 'MG Components',
      url: 'https://master--626149b307606d003ada26b4.chromatic.com',
      versions: {
        'v3.2.0': 'https://626149b307606d003ada26b4-kvttxoumtg.chromatic.com',
        'v3.3.0': 'https://626149b307606d003ada26b4-vvlmkghgfa.chromatic.com',
        'v4.0.0': 'https://626149b307606d003ada26b4-ghzolkevxw.chromatic.com',
        'v4.0.1': 'https://626149b307606d003ada26b4-quqsveahqo.chromatic.com',
        'v4.1.0': 'https://626149b307606d003ada26b4-wupvrtxgvq.chromatic.com',
        'v4.1.1': 'https://626149b307606d003ada26b4-zzczrlgoyf.chromatic.com',
        'v4.2.0': 'https://626149b307606d003ada26b4-pmuucitqlx.chromatic.com',
        'v4.2.1': 'https://626149b307606d003ada26b4-uviwigafgy.chromatic.com',
        'v5.0.0': 'https://626149b307606d003ada26b4-gxmtkxctlr.chromatic.com',
        'v5.1.0': 'https://626149b307606d003ada26b4-jdnrfohxpk.chromatic.com',
        'v5.2.0': 'https://626149b307606d003ada26b4-bjtukelpkg.chromatic.com',
        'v5.3.0': 'https://626149b307606d003ada26b4-bmsfvhtany.chromatic.com',
        'v5.4.0': 'https://626149b307606d003ada26b4-ritpfsldui.chromatic.com',
        'v5.5.0': 'https://626149b307606d003ada26b4-bidcqvzbyy.chromatic.com',
        'v5.6.0': 'https://626149b307606d003ada26b4-mfqwykjipt.chromatic.com',
        'v5.7.0': 'https://626149b307606d003ada26b4-yejrgaetka.chromatic.com',
        'v5.8.0': 'https://626149b307606d003ada26b4-pcrpbesovl.chromatic.com',
        'v5.9.0': 'https://626149b307606d003ada26b4-dedncomorf.chromatic.com',
        'v5.9.1': 'https://626149b307606d003ada26b4-jausjqzwui.chromatic.com',
        'v5.10.0': 'https://626149b307606d003ada26b4-eidtudwvjn.chromatic.com',
        'v5.10.1': 'https://626149b307606d003ada26b4-rpkktdqmad.chromatic.com',
        'v5.11.0': 'https://626149b307606d003ada26b4-ujajrvujgj.chromatic.com',
        'v5.11.1': 'https://626149b307606d003ada26b4-dchaczbhrl.chromatic.com',
        'v5.12.0': 'https://626149b307606d003ada26b4-flbkczbwjs.chromatic.com',
        'v5.12.1': 'https://626149b307606d003ada26b4-cqhhmkwykv.chromatic.com',
        '5.13.0': 'https://626149b307606d003ada26b4-irorwpapfk.chromatic.com/',
      },
    },
  },
};
