import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'mg-components',
  globalStyle: './node_modules/@mgdis/styles/dist/mg-components.css',
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
      ],
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
