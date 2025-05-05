import { describe, expect, test } from 'vitest';
import { playwrightBaseConfig, renderAttributes, renderProperties } from '.';

describe('playwright-helpers', () => {
  test('import', () => {
    expect(playwrightBaseConfig).toBeDefined();
    expect(renderAttributes).toBeDefined();
    expect(renderProperties).toBeDefined();
  });
});
