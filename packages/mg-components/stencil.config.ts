import { webTypesGenerator, vsCodeGenerator, vsCodeCssGenerator } from '@mgdis/stencil-helpers';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { Config } from '@stencil/core';
import { coverageReporters, coverageThreshold } from '@core-ui/jest-config/base';
import packageJson from './package.json';
const { name, version, 'web-types': webTypes, contributes } = packageJson;

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
      file: '.storybook/components.json',
    },
    {
      type: 'docs-readme',
      strict: true,
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
    {
      type: 'docs-custom',
      generator: async jsonDocs => {
        // Storybook Base Url
        const storybookBaseUrl = 'http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/';
        // Source Base Url
        const sourceBaseUrl = 'https://gitlab.mgdis.fr/core/core-ui/core-ui/-/tree/master/packages/mg-components/';
        // Web Types
        const webTypesContent = webTypesGenerator(name, version, jsonDocs, storybookBaseUrl);
        // VS Code HTML
        const vsCodeContent = vsCodeGenerator(jsonDocs, storybookBaseUrl, sourceBaseUrl);
        // VS Code CSS
        const vsCodeCssContent = vsCodeCssGenerator(jsonDocs);
        // Write files
        await mkdir(dirname(webTypes), { recursive: true });
        await mkdir(dirname(contributes.html.customData), { recursive: true });
        await writeFile(webTypes, JSON.stringify(webTypesContent, null, 2), 'utf8');
        await writeFile(contributes.html.customData, JSON.stringify(vsCodeContent, null, 2), 'utf8');
        await writeFile(contributes.css.customData, JSON.stringify(vsCodeCssContent, null, 2), 'utf8');
      },
    },
  ],
  extras: {
    enableImportInjection: true,
  },
  testing: {
    setupFilesAfterEnv: ['./jest.setup.ts'],
    coverageReporters,
    coverageThreshold,
    moduleNameMapper: {
      '^quill$': '<rootDir>/src/components/molecules/inputs/mg-input-rich-text-editor/editor/tests/__mocks__/quill.ts'
    },
  },
};
