import { describe, expect, test } from 'vitest';
import { renderAttributes, renderProperties } from './utils';

describe('utils', () => {
  describe('renderAttributes', () => {
    test.each([
      undefined,
      null,
      {},
      { name: 'batman' },
      { name: '<div class="blu">blu</div>' },
      { name: 'batman', user: 'bruce', active: true, id: 1, object: {}, array: [], function: () => {} },
      { emptyString: '' },
    ])('Should render attributes', args => {
      const res = renderAttributes(args as Record<string, unknown>);
      expect(res).toMatchSnapshot();
    });
  });

  describe('renderProperties', () => {
    test('Should render properties, case id selector', () => {
      const res = renderProperties({ object: {} }, '#id');
      expect(res).toEqual("\n  document.getElementById('id').object={}");
    });
    test.each([undefined, null, {}, { name: 'batman' }])('Should not render attributes as properties', args => {
      const res = renderProperties(args as Record<string, unknown>, 'div');
      expect(res).toMatchSnapshot();
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
