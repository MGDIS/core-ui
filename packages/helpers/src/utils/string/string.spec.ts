import { describe, expect, test } from 'vitest';
import { allItemsAreString, cleanString, isValidString, toDomValue, toString } from './string';

describe('string', () => {
  describe('allItemsAreString', () => {
    test.each([
      { items: ['blu', 'bli', 'blo', 'bla'], expected: true },
      { items: ['blu', 'bli', 'blo', { value: 'bla' }], expected: false },
    ])('Should test if all otems are string: %s', ({ items, expected }) => {
      expect(allItemsAreString(items as string[])).toEqual(expected);
    });
  });

  describe('isValidString', () => {
    test.each(['', ' ', null, undefined, 1, {}, []])('Should return "false" for invalid values', value => {
      expect(isValidString(value)).toEqual(false);
    });

    test.each(['batman', 'batman '])('Should return "true" for valid value', value => {
      expect(isValidString(value)).toEqual(true);
    });
  });

  describe('toString', () => {
    test.each([undefined, null, 1, 'string', '', [undefined], [{ value: null }], {}, ['string'], { hello: 'batman' }])('Should return stringified value, original %s', value => {
      expect(toString(value)).toEqual(typeof value === 'object' || (Array.isArray(value) && typeof value !== 'string') ? JSON.stringify(value) : `${value}`);
    });
  });

  describe('toDomValue', () => {
    test.each([
      { value: undefined, expected: 'undefined:' },
      { value: null, expected: 'null:' },
      { value: 1, expected: 'number:1' },
      { value: '1', expected: 'string:1' },
      { value: true, expected: 'boolean:true' },
      { value: { hello: 'batman' }, expected: `object:${JSON.stringify({ hello: 'batman' })}` },
    ])('Should return DOM-safe value for %s', ({ value, expected }) => {
      expect(toDomValue(value)).toEqual(expected);
    });
  });

  describe('cleanString', () => {
    test.each([
      { string: 'batman', expected: 'batman' },
      { string: 'BATMAN', expected: 'batman' },
      { string: 'Batman', expected: 'batman' },
      { string: ' batman ', expected: ' batman ' },
      { string: ' batman', expected: ' batman' },
      { string: 'batman ', expected: 'batman ' },
      { string: 'âäàçéèêñù', expected: 'aaaceeenu' },
    ])('Should format string properly', ({ string, expected }) => {
      expect(cleanString(string)).toEqual(expected);
    });

    test('Should return orignal value when param is NOT a string', () => {
      expect(cleanString(undefined as unknown as string)).toEqual(undefined);
    });
  });
});
