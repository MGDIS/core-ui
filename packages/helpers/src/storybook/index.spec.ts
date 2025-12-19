import { describe, expect, test, vi } from 'vitest';
import { filterArgs, getStorybookUrl, getStoryHTML, stencilWrapper, StorybookPreview } from '.';

vi.mock('@stencil/core/internal/client', () => ({
  renderVdom: vi.fn(),
}));

describe('storybook', () => {
  describe('stencil', () => {
    test('import', () => {
      expect(filterArgs).toBeDefined();
      expect(stencilWrapper).toBeDefined();
      expect(getStoryHTML).toBeDefined();
      expect(getStorybookUrl).toBeDefined();
      expect(stencilWrapper).toBeDefined();
      expect(StorybookPreview).toBeDefined();
    });
  });
});
