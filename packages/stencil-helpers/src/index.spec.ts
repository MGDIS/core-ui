import { describe, expect, test } from 'vitest';
import { filterArgs, getStoryHTML, stencilWrapper } from '.';

describe('stencil-helpers', () => {
  describe('storybook', () => {
    test('import', () => {
      expect(getStoryHTML).toBeDefined();
      expect(stencilWrapper).toBeDefined();
      expect(filterArgs).toBeDefined();
    });
  });
});
