import { describe, expect, test } from 'vitest';
import { defineLocales, localeCurrency, localeDate, localeDatePattern, localeNumber, localePercent, localeUnit } from '.';

describe('locale', () => {
  test('import', () => {
    expect(localeDatePattern).toBeDefined();
    expect(localeCurrency).toBeDefined();
    expect(localeNumber).toBeDefined();
    expect(localePercent).toBeDefined();
    expect(localeUnit).toBeDefined();
    expect(localeDate).toBeDefined();
    expect(defineLocales).toBeDefined();
  });
});
