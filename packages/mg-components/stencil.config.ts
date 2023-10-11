import { Config } from '@stencil/core';

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
  ],
  testing: {
    timers: 'fake',
    /**
     * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
     * before it can run your tests
     */
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    transform: {
      '^.+\\.(ts|tsx|jsx|js)$': '<rootDir>/node_modules/@stencil/core/testing/jest-preprocessor.js',
    },
    // browserHeadless: false
  },
};
