import { describe, expect, test, vi } from 'vitest';
import { filterArgs, stencilWrapper, getStoryHTML } from './';
import { VNode } from '@stencil/core';

describe('storybook', () => {
  describe('filterArgs', () => {
    test('Should get renderable args, case filtred default args', () => {
      const res = filterArgs({ name: 'batman', default: true }, { default: true });
      expect(res).toEqual({ name: 'batman' });
    });
    test('Should get renderable args, case no default args', () => {
      const res = filterArgs({ name: 'batman', default: true, slot: '' });
      expect(res).toEqual({ name: 'batman', default: true });
    });
    test.each([undefined, ''])('Should get renderable args, case no default args', val => {
      expect.assertions(1);
      try {
        filterArgs(val);
      } catch (err) {
        expect(err.message).toEqual("filterArgs - args isn't an object.");
      }
    });
  });

  describe('stencilWrapper', () => {
    test('should do nothing, case no host', () => {
      const storyFn = vi.fn();
      const res = stencilWrapper(storyFn, {});
      expect(storyFn).not.toHaveBeenCalled();
      expect(res).toEqual(undefined);
    });
    test.each([{}, { globals: { locale: 'fr' } }])('should render element from VDOM', args => {
      const storyFn = vi.fn();

      // insert storybook host div
      const storybookRoot = document.createElement('div');
      storybookRoot.setAttribute('lang', 'fr');
      storybookRoot.setAttribute('id', 'storybook-root');
      document.querySelector('body').appendChild(storybookRoot);

      const res = stencilWrapper(storyFn, args);
      expect(storyFn).toHaveBeenCalledWith(args);
      expect(res).toEqual(undefined);
    });
  });

  describe('getStoryHTML', () => {
    test.each([
      { args: {}, expected: '' },
      { args: { $tag$: undefined, $attrs$: {}, $children$: null, $text$: null }, expected: '' },
      { args: { $tag$: undefined, $attrs$: null, $children$: null, $text$: null }, expected: '' },
      { args: { $tag$: 'mg-batman', $attrs$: null, $children$: null, $text$: null }, expected: '<mg-batman></mg-batman>' },
      { args: { $tag$: 'mg-batman', $attrs$: {}, $children$: null, $text$: null }, expected: '<mg-batman></mg-batman>' },
      {
        args: {
          $tag$: 'mg-batman',
          $attrs$: { boolean: true, text: 'hello', object: {}, array: [], function: () => {}, null: null, undefined: undefined, blank: '', style: 'background{};' },
          $children$: null,
          $text$: null,
        },
        expected:
          '<mg-batman boolean="true" text="hello" object="/!\\ Object props are not rendered in the code example" array="/!\\ Object props are not rendered in the code example" function="/!\\ Object props are not rendered in the code example"></mg-batman>',
      },
      {
        args: { $tag$: 'mg-batman', $attrs$: { innerHTML: 'joker is behind you' }, $children$: null, $text$: null },
        expected: '<mg-batman>joker is behind you</mg-batman>',
      },
      {
        args: {
          $tag$: 'mg-batman',
          $attrs$: { boolean: true, text: 'hello', object: {} },
          $children$: [{ $tag$: 'baby-batman', $attrs$: {}, $children$: null, $text$: null }],
          $text$: null,
        },
        expected: '<mg-batman boolean="true" text="hello" object="/!\\ Object props are not rendered in the code example"><baby-batman></baby-batman></mg-batman>',
      },
      {
        args: {
          $tag$: null,
          $attrs$: null,
          $children$: null,
          $text$: 'joker is behind you',
        },
        expected: 'joker is behind you',
      },
      {
        args: {
          $tag$: 'mg-batman',
          $attrs$: { boolean: true, text: 'hello', object: {} },
          $children$: [{ $tag$: null, $attrs$: {}, $children$: null, $text$: 'joker is behind you' }],
          $text$: null,
        },
        expected: '<mg-batman boolean="true" text="hello" object="/!\\ Object props are not rendered in the code example">joker is behind you</mg-batman>',
      },
      {
        args: {
          $tag$: 'mg-batman',
          $attrs$: { boolean: true, text: 'hello', object: {} },
          $children$: [{ $tag$: 'baby-batman', $attrs$: {}, $children$: [{ $tag$: null, $attrs$: {}, $children$: null, $text$: 'joker is behind you' }], $text$: null }],
          $text$: null,
        },
        expected:
          '<mg-batman boolean="true" text="hello" object="/!\\ Object props are not rendered in the code example"><baby-batman>joker is behind you</baby-batman></mg-batman>',
      },
    ])('Should render story code exemple', ({ args, expected }) => {
      const res = getStoryHTML(args as unknown as VNode);
      expect(res).toEqual(expected);
    });
  });
});
