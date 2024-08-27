import { describe, expect, test } from 'vitest';
import { webTypesGenerator, vsCodeGenerator } from '.';
import { JsonDocs } from '@stencil/core/internal';
import jsonDocs from '../../json-doc.test.json';

describe('ide', () => {
  describe('webTypesGenerator', () => {
    test('Should generate web types', () => {
      const webTypes = webTypesGenerator('test', '1.0.0', jsonDocs as JsonDocs, 'http://sb.test/?path=/docs/');
      expect(webTypes).toMatchSnapshot();
    });
  });
  describe('vsCodeGenerator', () => {
    test('Should generate VScode custom data', () => {
      const customData = vsCodeGenerator('1.0.0', jsonDocs as JsonDocs, 'http://sb.test/?path=/docs/', 'http://sources.test/');
      expect(customData).toMatchSnapshot();
    });
  });
});
