import type { StorybookConfig } from '@storybook/html-vite';
import { readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';

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

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 * @param value - module to resolve
 * @returns module with absolute path
 */
const getAbsolutePath = (value: string): any => dirname(require.resolve(join(value, 'package.json')));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(tsx)'],
  core: {
    disableTelemetry: true,
  },
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-links'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: getFilePathsEndingWith(join(__dirname, '../src/'), '/img').reduce((acc: any[], from) => {
    acc.push(
      {
        from,
        to: '/docs/img',
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
        'v5.13.0': 'https://626149b307606d003ada26b4-irorwpapfk.chromatic.com',
        'v5.13.1': 'https://626149b307606d003ada26b4-atpwyeuops.chromatic.com',
        'v5.14.0': 'https://626149b307606d003ada26b4-wdzpusywea.chromatic.com',
        'v5.15.0': 'https://626149b307606d003ada26b4-visofofaay.chromatic.com',
        'v5.16.0': 'https://626149b307606d003ada26b4-yvdqsmhnyr.chromatic.com',
        'v5.17.0': 'https://626149b307606d003ada26b4-iahrqajazh.chromatic.com',
        'v5.18.0': 'https://626149b307606d003ada26b4-rlxvhvwgkl.chromatic.com',
        'v5.19.0': 'https://626149b307606d003ada26b4-qeybxyxqyt.chromatic.com',
        'v5.19.1': 'https://626149b307606d003ada26b4-imczvwdggp.chromatic.com',
        'v5.19.2': 'https://626149b307606d003ada26b4-haqbulhpwe.chromatic.com',
        'v5.19.3': 'https://626149b307606d003ada26b4-lcftaxdtha.chromatic.com',
        'v5.20.0': 'https://626149b307606d003ada26b4-onrrmkqdnu.chromatic.com',
        'v5.21.0': 'https://626149b307606d003ada26b4-ulnjtobwhi.chromatic.com',
        'v5.21.1': 'https://626149b307606d003ada26b4-hpcnzgjpaq.chromatic.com',
        'v5.22.0': 'https://626149b307606d003ada26b4-btqzaeatgv.chromatic.com',
        'v5.23.0': 'https://626149b307606d003ada26b4-czvwidyniq.chromatic.com',
        'v5.23.1': 'https://626149b307606d003ada26b4-mwqnxjqzue.chromatic.com',
        'v5.23.2': 'https://626149b307606d003ada26b4-esoajozgaj.chromatic.com',
        'v5.24.0': 'https://626149b307606d003ada26b4-bqknjomuar.chromatic.com',
        'v5.25.0': 'https://626149b307606d003ada26b4-ahwcqzqaoh.chromatic.com',
        'v5.25.1': 'https://626149b307606d003ada26b4-xoivljnxkv.chromatic.com',
        'v5.25.2': 'https://626149b307606d003ada26b4-pmztecgbuf.chromatic.com',
        'v5.26.0': 'https://626149b307606d003ada26b4-kiqcdnvuvm.chromatic.com',
        'v5.27.0': 'https://626149b307606d003ada26b4-gwhcbziyca.chromatic.com',
        'v5.27.1': 'https://626149b307606d003ada26b4-jqeifeltaz.chromatic.com',
        'v5.27.2': 'https://626149b307606d003ada26b4-rgtwzbiszp.chromatic.com',
        'v5.27.3': 'https://626149b307606d003ada26b4-nxqzxvfuib.chromatic.com',
        'v5.27.4': 'https://626149b307606d003ada26b4-pponmjenit.chromatic.com',
        'v5.28.0': 'https://626149b307606d003ada26b4-grmjndcjgx.chromatic.com',
        'v5.28.1': 'https://626149b307606d003ada26b4-vgqkjpyvnp.chromatic.com',
        'v5.28.2': 'https://626149b307606d003ada26b4-abvittqvfe.chromatic.com',
        'v6.0.0': 'https://626149b307606d003ada26b4-atannsibmz.chromatic.com',
        'v6.1.0': 'https://626149b307606d003ada26b4-oclwtefwcd.chromatic.com',
        'v6.2.0': 'https://626149b307606d003ada26b4-hbbwykoxhm.chromatic.com',
        'v6.3.0': 'https://626149b307606d003ada26b4-beadoltdra.chromatic.com',
        'v6.4.0': 'https://626149b307606d003ada26b4-xdvhtzmtbq.chromatic.com',
      },
    },
  },
};
export default config;
