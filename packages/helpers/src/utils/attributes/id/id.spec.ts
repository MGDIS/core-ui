import { describe, test, expect } from 'vitest';
import { createID, formatID, isValideID } from './id';

describe('id', () => {
  describe('createID', () => {
    test.each([undefined, '', 'blu'])('Should generate a prefixed ID if defined : %s', prefix => {
      const id = createID(prefix);
      let regexp = /^[a-z0-9]{10}$/;
      if (prefix !== undefined && prefix !== '') {
        regexp = new RegExp(`^${prefix}-[a-z0-9]{10}$`);
      }
      expect(id).toMatch(regexp);
    });
    test('Should generate a unique ID when both are created at the same time', () => {
      const id1 = createID();
      const id2 = createID();
      expect(id1).not.toEqual(id2);
    });
  });

  describe('isValideID', () => {
    test.each([undefined, '', { id: 'hello' }, '!batman', '{batman}', '123', '1-batman'])('Should NOT validate ID : %s', id => {
      const valide = isValideID(id);
      expect(valide).toEqual(false);
    });

    test.each(['hello', 'hello-batman', 'hello-batman-in-gotham', 'hello-1'])('Should validate ID : %s', id => {
      const valide = isValideID(id);
      expect(valide).toEqual(true);
    });
  });

  describe('formatID', () => {
    test.each([
      ['UPPERCASE', 'uppercase'],
      ['camelCase', 'camel-case'],
      ['PascalCase', 'pascal-case'],
      ['text/is/href', 'text-is-href'],
      [1, '1'],
      [{ href: 'text/is/href' }, 'href-text-is-href'],
      [[{ href: 'text/is/href' }], 'href-text-is-href'],
      [null, undefined],
      [undefined, undefined],
      [true, undefined],
      [false, undefined],
    ])('Should format value as valid ID : %s', (input, expected) => {
      const id = formatID(input);
      expect(id).toEqual(expected);
    });
  });
});
