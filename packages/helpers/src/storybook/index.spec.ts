import { describe, expect, test } from 'vitest';
import { filterArgs, getStoryHTML, stencilWrapper, StorybookPreview } from '.';

describe('storybook', () => {
  test('import', () => {
    expect(getStoryHTML).toBeDefined();
    expect(stencilWrapper).toBeDefined();
    expect(filterArgs).toBeDefined();
    expect(StorybookPreview).toBeDefined();
  });
});
