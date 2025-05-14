import { describe, expect, test } from 'vitest';
import { isTagName } from './elements';

describe('elements', () => {
  describe('isTagName', () => {
    test.each([
      { querySelector: 'h1', expected: true },
      { querySelector: 'span', expected: false },
      { querySelector: 'blu', expected: false },
    ])('Should test if all otems are string: %s', ({ querySelector, expected }) => {
      const div = document.createElement('div');
      div.innerHTML = '<h1></h1><span></span>';
      const elm = div.querySelector(querySelector);
      expect(isTagName(elm as HTMLElement, ['h1'])).toEqual(expected);
    });
  });
});
