import { describe, expect, test } from 'vitest';
import { renderAttributes, renderProperties } from '.';

describe('utils', () => {
  describe('renderAttributes', () => {
    test.each([
      { args: undefined, expected: '' },
      { args: null, expected: '' },
      { args: {}, expected: '' },
      { args: { name: 'batman' }, expected: 'name="batman"' },
      { args: { name: 'batman', user: 'bruce', active: true, id: 1, object: {}, array: [], function: () => {} }, expected: 'name="batman" user="bruce" active="true" id="1"' },
    ])('Should render attributes', ({ args, expected }) => {
      const res = renderAttributes(args);
      expect(res).toEqual(expected);
    });
  });

  describe('renderProperties', () => {
    test('Should render properties, case id selector', () => {
      const res = renderProperties({ object: {} }, '#id');
      expect(res).toEqual("\n  document.getElementById('id').object={}");
    });
    test.each([
      { args: undefined, expected: '' },
      { args: null, expected: '' },
      { args: {}, expected: '' },
      { args: { name: 'batman' }, expected: '\n  ' },
    ])('Should not render attributes as properties', ({ args, expected }) => {
      const res = renderProperties(args, 'div');
      expect(res).toEqual(expected);
    });
    test.each([undefined, () => {}].map(fn => ({ name: 'batman', user: 'bruce', active: true, id: 1, object: {}, array: [], fn })))(
      'Should render properties, case id selector',
      args => {
        const res = renderProperties(args, 'div');
        expect(res).toMatchSnapshot();
      },
    );
  });
});
