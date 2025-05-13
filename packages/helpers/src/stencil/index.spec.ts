import { describe, expect, test } from 'vitest';
import { webTypesGenerator, vsCodeGenerator, vsCodeCssGenerator } from '.';

describe('stencil', () => {
  describe('ide', () => {
    test('import', () => {
      expect(webTypesGenerator).toBeDefined();
      expect(vsCodeGenerator).toBeDefined();
      expect(vsCodeCssGenerator).toBeDefined();
    });
  });
});
