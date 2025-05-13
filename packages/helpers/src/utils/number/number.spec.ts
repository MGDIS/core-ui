import { describe, expect, test } from 'vitest';
import { isValidNumber } from './number';

describe('number', () => {
  describe('isValidNumber', () => {
    test.each(['', ' ', null, undefined, '1', {}, []])('Should return "false" for invalid values', value => {
      expect(isValidNumber(value)).toEqual(false);
    });

    test.each([1, 1.0])('Should return "true" for valid value', value => {
      expect(isValidNumber(value)).toEqual(true);
    });
  });
});
