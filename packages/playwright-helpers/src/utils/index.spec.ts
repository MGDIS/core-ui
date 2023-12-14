import { describe, expect, test } from 'vitest';
import { renderAttributes, renderProperties } from '.';

describe.each([
  {},
  {
    status: 'visible',
    count: 10,
    icon: { icon: 'blu' },
  },
  {
    status: 'visible',
    count: 10,
    icon: { icon: 'blu' },
    nullValue: null,
    undefinedValue: undefined,
  },
  undefined,
  {
    onclick: {
      blu: () => {},
    },
  },
])('args %s', args => {
  test('renderAttributes', () => {
    const result = renderAttributes(args);
    expect(result).toMatchSnapshot();
  });

  describe('renderProperties', () => {
    test.each(['.your-select', '#your-select'])('renderProperties', selector => {
      const result = renderProperties(args, selector);
      expect(result).toMatchSnapshot();
    });
  });
});
