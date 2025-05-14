import { describe, expect, test, vi } from 'vitest';
import { filterArgs, stencilWrapper, getStoryHTML, StorybookPreview } from '.';
import jsonDocs from '../../json-doc.test.json';

describe('storybook', () => {
  describe('filterArgs', () => {
    test('Should get renderable args, case filtred default args', () => {
      const res = filterArgs({ name: 'batman', default: true }, { default: true });
      expect(res).toEqual({ name: 'batman' });
    });

    test('Should get renderable args, case no default args', () => {
      const res = filterArgs({ name: 'batman', default: true, slot: '' }, undefined, ['slot']);
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
      document.querySelector('body')?.appendChild(storybookRoot);

      const res = stencilWrapper(storyFn, args);
      expect(storyFn).toHaveBeenCalledWith(args);
      expect(res).toEqual(undefined);
    });
  });

  describe('getStoryHTML', () => {
    test.each([
      {},
      { $tag$: undefined, $attrs$: {}, $children$: null, $text$: null },
      { $tag$: undefined, $attrs$: null, $children$: null, $text$: null },
      { $tag$: 'mg-batman', $attrs$: null, $children$: null, $text$: null },
      { $tag$: 'mg-batman', $attrs$: {}, $children$: null, $text$: null },
      {
        $tag$: 'mg-batman',
        $attrs$: { boolean: true, text: 'hello', object: {}, array: [], function: () => {}, null: null, undefined: undefined, blank: '', style: 'top:0' },
        $children$: null,
        $text$: null,
      },
      { $tag$: 'mg-batman', $attrs$: { innerHTML: 'joker is behind you' }, $children$: null, $text$: null },
      {
        $tag$: 'mg-batman',
        $attrs$: { boolean: true, text: 'hello', object: {} },
        $children$: [{ $tag$: 'baby-batman', $attrs$: {}, $children$: null, $text$: null }],
        $text$: null,
      },
      {
        $tag$: null,
        $attrs$: null,
        $children$: null,
        $text$: 'joker is behind you',
      },
      {
        $tag$: 'mg-batman',
        $attrs$: { boolean: true, text: 'hello', object: {} },
        $children$: [{ $tag$: null, $attrs$: {}, $children$: null, $text$: 'joker is behind you' }],
        $text$: null,
      },
      {
        $tag$: 'mg-batman',
        $attrs$: { boolean: true, text: 'hello', object: {} },
        $children$: [{ $tag$: 'baby-batman', $attrs$: {}, $children$: [{ $tag$: null, $attrs$: {}, $children$: null, $text$: 'joker is behind you' }], $text$: null }],
        $text$: null,
      },
      {
        $tag$: 'blu-blu',
        $attrs$: { 'boolean': true, 'false': false, 'text': 'hello', 'blu': 'blu bli bla blo', 'number': 42, 'html-content': 'Help text with html <b>bold</b>, <em>italic</em>.' },
        $children$: null,
        $text$: null,
      },
    ])('Should render story code exemple', args => {
      const res = getStoryHTML(args as unknown as Parameters<typeof getStoryHTML>[0]);
      expect(res).toMatchSnapshot();
    });
  });

  describe('StorybookPreview', () => {
    describe('extractArgTypes', () => {
      test('Should extract arg types', () => {
        const { extractArgTypes } = new StorybookPreview(jsonDocs as ConstructorParameters<typeof StorybookPreview>[0]);
        let res = extractArgTypes('my-comp');
        expect(res).toMatchSnapshot();
        res = extractArgTypes('my-second-comp');
        expect(res).toMatchSnapshot();
      });
    });

    describe('extractComponentDescription', () => {
      test('Should extract component description', () => {
        const { extractComponentDescription } = new StorybookPreview(jsonDocs as ConstructorParameters<typeof StorybookPreview>[0]);
        const res = extractComponentDescription('my-comp');
        expect(res).toMatchSnapshot();
      });
    });
  });
});
