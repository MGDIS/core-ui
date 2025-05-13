import { describe, expect, test } from 'vitest';
import { getObjectValueFromKey, isObject } from './object';

describe('object', () => {
  describe('isObject', () => {
    test.each([{}, new Date()])('Should validate an object', value => {
      const res = isObject(value);
      expect(res).toEqual(true);
    });

    test.each([undefined, null, '', 'batman', []])('Should NOT validate %s', value => {
      const res = isObject(value);
      expect(res).toEqual(false);
    });
  });

  describe('getObjectValueFromKey', () => {
    test.each([
      {
        object: { batman: 'hero' },
        key: undefined,
        result: undefined,
      },
      {
        object: { batman: 'hero' },
        key: { filter: 'batman' },
        result: undefined,
      },
      {
        object: { batman: 'hero' },
        key: { filter: 'batman.test' },
        defaultValue: 0,
        result: 0,
      },
      {
        object: 'batman',
        key: 'batman',
        result: undefined,
      },
      {
        object: null,
        key: 'batman',
        result: undefined,
      },
      {
        object: undefined,
        key: 'batman',
        result: undefined,
      },
      {
        value: { heroes: { batman: 'hero' } },
        key: 'heroes.robin',
        result: undefined,
      },
      {
        object: {},
        key: 'batman',
        result: undefined,
      },
      {
        object: { batman: 'hero' },
        key: { filter: 'batman' },
        defaultValue: { batman: 'hero' },
        result: { batman: 'hero' },
      },
      {
        object: {},
        key: 'batman',
        defaultValue: {},
        result: {},
      },
      {
        object: 'batman',
        key: 'batman',
        defaultValue: 'batman',
        result: 'batman',
      },
      {
        value: { batman: undefined },
        key: 'batman',
        result: undefined,
      },
      {
        value: { batman: 'hero' },
        key: 'batman',
        result: 'hero',
      },
      {
        value: { heroes: { batman: 'hero' } },
        key: 'heroes.batman',
        result: 'hero',
      },
    ])('Should parse object %', ({ value, key, defaultValue, result }) => {
      const res = getObjectValueFromKey(value, key as string, defaultValue);
      expect(res).toEqual(result);
    });
  });
});
