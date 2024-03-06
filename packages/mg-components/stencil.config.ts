import { WebTypesGenerator } from 'stenciljs-web-types-generator/web-types-generator';
import { Config } from '@stencil/core';
import { name, version } from './package.json';

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
        {
          src: '../.vscode',
          dest: '../.vscode',
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
      generator: new WebTypesGenerator({
        name,
        version,
        defaultIconPath: '<path-to-icon-of-your-library>',
        outputPath: 'dist/types/web-types.json',
      }).generateWebTypesJson,
    },
    {
      type: 'docs-vscode',
      file: 'dist/types/html.html-data.json',
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
