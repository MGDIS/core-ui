import { describe, expect, test } from 'vitest';
import { playwrightBaseConfig, renderAttributes, renderProperties } from '.';

describe('playwright', () => {
  describe('config', () => {
    test('import', () => {
      expect(playwrightBaseConfig).toBeDefined();
    });
  });
  describe('utils', () => {
    test('import', () => {
      expect(renderAttributes).toBeDefined();
      expect(renderProperties).toBeDefined();
    });
  });
});
