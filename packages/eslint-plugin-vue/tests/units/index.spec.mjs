import { describe, expect, test } from 'vitest';
import { getAttributeValue } from '../../lib/utils/attributes.utils';

describe('lib.utils', () => {
  describe('getAttributeValue', () => {
    test.each([undefined, '', 'batman', { directive: 'directive' }, { directive: 'directive', value: {} }, { directive: 'directive', value: { expression: {} } }])(
      'Should get "" as attribute value : %s',
      element => {
        const attribute = getAttributeValue(element);
        expect(attribute).toEqual('');
      },
    );

    test.each([{ directive: 'directive', value: { expression: { value: 'batman' } } }, { value: { value: 'batman' } }])('Should get attribute value from obbject : %s', element => {
      const attribute = getAttributeValue(element);
      expect(attribute).toEqual('batman');
    });
  });
});
