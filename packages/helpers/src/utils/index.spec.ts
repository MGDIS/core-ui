import { describe, expect, test } from 'vitest';
import { toKebabCase } from '.';

describe('utils', () => {
  test('import', () => {
    expect(toKebabCase).toBeDefined();
  });
});
