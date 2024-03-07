import { WebTypesGenerator } from '@mgdis/stencil-helpers';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { Config } from '@stencil/core';
import packageJson from './package.json';
const { name, version, contributes, 'web-types': webTypes } = packageJson;

export const config: Config = {
  namespace: 'mg-components',
  globalStyle: './node_modules/@mgdis/styles/dist/mg-temp/global.css',
  devServer: {
    openBrowser: false,
  },
  tsconfig: 'tsconfig.build.json',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: '../node_modules/@mgdis/styles/dist/mg-temp/variables.css',
          dest: 'variables.css', // export variable in a seperate file for component inside another framework
        },
        {
          src: '../node_modules/@mgdis/styles/dist/mg-temp/fonts',
          dest: 'fonts', // export fonts
        },
        {
          src: '../node_modules/@mgdis/styles/dist/mg-temp/*.css',
          dest: 'styles', // export styles
        },
        {
          src: 'locales/en',
          dest: 'locales/en',
        },
        {
          src: 'locales/fr',
          dest: 'locales/fr',
        },
      ],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
    },
    {
      type: 'docs-json',
      file: '.storybook/docs/components.json',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'iframe.html',
        },
        {
          src: '../node_modules/@mgdis/styles/dist/mg-temp/variables.css',
          dest: 'build/variables.css', // export variable for working space
        },
        {
          src: '../node_modules/@mgdis/styles/dist/mg-temp/fonts',
          dest: 'build/fonts', // export fonts for working space
        },
      ],
    },
    {
      type: 'docs-custom',
      generator: async docs => {
        const webTypesContent = await new WebTypesGenerator({
          name,
          version,
        }).generateWebTypesJson(docs);
        await mkdir(dirname(webTypes), { recursive: true });
        await writeFile(webTypes, JSON.stringify(webTypesContent, null, 2), 'utf8');
      },
    },
    {
      type: 'docs-vscode',
      file: contributes.html.customData[0],
    },
  ],
  extras: {
    enableImportInjection: true,
  },
  testing: {
    setupFilesAfterEnv: ['./jest.setup.ts'],
    coverageReporters: ['cobertura', 'lcov', 'html', 'text'],
  },
};
