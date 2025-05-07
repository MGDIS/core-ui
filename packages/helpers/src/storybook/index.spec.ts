import { describe, expect, test } from 'vitest';
import { filterArgs, getStorybookUrl, getStoryHTML, stencilWrapper, StorybookPreview } from '.';

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
