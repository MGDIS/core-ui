import { describe, expect, test } from 'vitest';
import { webTypesGenerator, vsCodeGenerator } from '.';
import { JsonDocs } from '@stencil/core/internal';

describe('ide', () => {
  const jsonDocs: JsonDocs = {
    timestamp: '2024-01-01T00:00:00',
    compiler: {
      name: '@stencil/core',
      version: '4.16.0',
      typescriptVersion: '5.4.5',
    },
    components: [
      {
        filePath: 'src/components/atoms/my-comp/my-comp.tsx',
        encapsulation: 'shadow',
        tag: 'my-comp',
        readme: '',
        docs: '',
        docsTags: [],
        usage: {},
        props: [
          {
            name: 'prop',
            type: 'string',
            mutable: false,
            attr: 'prop',
            reflectToAttr: false,
            docs: 'docs',
            docsTags: [],
            values: [
              {
                type: 'string',
              },
            ],
            optional: false,
            required: true,
          },
          {
            name: 'attr',
            type: 'string',
            mutable: false,
            reflectToAttr: false,
            docs: 'docs',
            docsTags: [],
            values: [
              {
                value: 'blu',
                type: 'string',
              },
              {
                value: 'bli',
                type: 'string',
              },
            ],
            optional: false,
            required: true,
          },
        ],
        methods: [
          {
            name: 'method',
            returns: {
              type: 'string',
              docs: '',
            },
            complexType: {
              signature: '',
              parameters: [],
              references: {},
              return: 'string',
            },
            signature: '',
            parameters: [],
            docs: 'docs',
            docsTags: [],
          },
        ],
        events: [
          {
            event: 'event',
            detail: 'boolean',
            bubbles: true,
            complexType: {
              original: '',
              resolved: 'boolean',
              references: {},
            },
            cancelable: true,
            composed: true,
            docs: 'docs',
            docsTags: [],
          },
        ],
        listeners: [
          {
            event: 'keydown',
            target: 'window',
            capture: false,
            passive: false,
          },
        ],
        styles: [],
        slots: [
          {
            name: '',
            docs: '',
          },
        ],
        parts: [],
        dependents: [],
        dependencies: [],
        dependencyGraph: {},
      },
      {
        encapsulation: 'shadow',
        tag: 'my-comp',
        overview: 'overview',
        readme: '',
        docs: '',
        docsTags: [],
        usage: {},
        props: [],
        methods: [],
        events: [],
        listeners: [],
        styles: [],
        slots: [],
        parts: [],
        dependents: [],
        dependencies: [],
        dependencyGraph: {},
      },
    ],
    typeLibrary: {},
  };

  describe('webTypesGenerator', () => {
    test('Should generate web types', () => {
      const webTypes = webTypesGenerator('test', '1.0.0', jsonDocs, 'http://sb.test/?path=/docs/');
      expect(webTypes).toMatchSnapshot();
    });
  });
  describe('vsCodeGenerator', () => {
    test('Should generate VScode custom data', () => {
      const customData = vsCodeGenerator('1.0.0', jsonDocs, 'http://sb.test/?path=/docs/', 'http://sources.test/');
      expect(customData).toMatchSnapshot();
    });
  });
});
