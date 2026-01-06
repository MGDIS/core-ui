import { describe, expect, test, vi } from 'vitest';
import { webTypesGenerator, vsCodeGenerator, vsCodeCssGenerator } from '.';

vi.mock('@stencil/core/internal/client', () => ({
  renderVdom: vi.fn(),
}));

describe('stencil', () => {
  describe('ide', () => {
    test('import', () => {
      expect(webTypesGenerator).toBeDefined();
      expect(vsCodeGenerator).toBeDefined();
      expect(vsCodeCssGenerator).toBeDefined();
    });
  });
});
