import { describe, expect, test } from 'vitest';
import { setMgAngularLogger } from '.';

describe('angular', () => {
  test('import', () => {
    expect(setMgAngularLogger).toBeDefined();
  });
});
