import { describe, expect, test } from 'vitest';
import { dateToString } from './date';

describe('date', () => {
  describe('dateToString', () => {
    test('Should Format date to string pattern', () => {
      const stringDate = '2023-12-24';
      const formatedtext = dateToString(new Date(stringDate));
      expect(formatedtext).toEqual(stringDate);
    });
  });
});
