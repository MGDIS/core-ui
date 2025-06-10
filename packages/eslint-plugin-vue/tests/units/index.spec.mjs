import { describe, expect, test } from 'vitest';
import { getAttributeValue } from '../../lib/utils/attributes.utils';

describe('lib.utils', () => {
  describe('getAttributeValue', () => {
    test.each([undefined, '', 'batman', { directive: true }, { directive: true, value: {} }, { directive: true, value: { expression: {} } }])(
      'Should get "" as attribute value: %s',
      element => {
        const attribute = getAttributeValue(element);
        expect(attribute).toEqual('');
      },
    );

    test.each([{ directive: true, value: { expression: { type: 'Literal', value: 'batman' } } }, { value: { value: 'batman' } }])(
      'Should get attribute value from object: %s',
      element => {
        const attribute = getAttributeValue(element);
        expect(attribute).toEqual('batman');
      },
    );
  });
});
