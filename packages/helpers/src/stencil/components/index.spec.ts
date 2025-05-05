import { describe, expect, test, afterEach, vi } from 'vitest';
import {
  createID,
  ClassList,
  allItemsAreString,
  isTagName,
  getWindows,
  isValidString,
  cleanString,
  nextTick,
  toString,
  isValideID,
  isValidNumber,
  isObject,
  getObjectValueFromKey,
  Paginate,
  Page,
  Cursor,
  type CursorType,
  formatID,
} from '.';

const initArray = length => new Array(length).fill('').map((_, key) => (key + 1).toString());

describe('components.utils', () => {
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

  describe('ClassList', () => {
    test('Should add classes to list', () => {
      const classCollection = new ClassList();
      expect(classCollection.classes).toEqual([]);
      classCollection.add('blu');
      expect(classCollection.classes).toEqual(['blu']);
      classCollection.add('bli');
      expect(classCollection.classes).toEqual(['blu', 'bli']);
      // Should not add classes if already in list
      classCollection.add('blu');
      expect(classCollection.classes).toEqual(['blu', 'bli']);
    });

    test('Should delete classes from list', () => {
      const classCollection = new ClassList(['blu', 'bli']);
      classCollection.delete('blu');
      expect(classCollection.classes).toEqual(['bli']);
      // List doesn't change if class name doesn't existe in list
      classCollection.delete('bla');
      expect(classCollection.classes).toEqual(['bli']);
    });

    test('Should check if class already in list', () => {
      const classCollection = new ClassList(['blu']);
      expect(classCollection.has('blu')).toEqual(true);
      expect(classCollection.has('bli')).toEqual(false);
    });

    test('Should return seperated space classes list', () => {
      const classCollection = new ClassList(['blu', 'bli']);
      expect(classCollection.join()).toEqual('blu bli');
    });
  });

  describe('allItemsAreString', () => {
    test.each([
      { items: ['blu', 'bli', 'blo', 'bla'], expected: true },
      { items: ['blu', 'bli', 'blo', { value: 'bla' }], expected: false },
    ])('Should test if all otems are string: %s', ({ items, expected }) => {
      expect(allItemsAreString(items as string[])).toEqual(expected);
    });
  });

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

  describe('getWindows', () => {
    const mockWindowFramesLength = vi.fn();
    const mockWindowIndexZero = vi.fn();
    Object.defineProperty(window, 'frames', {
      value: {
        get length() {
          return mockWindowFramesLength();
        },
        get 0() {
          return mockWindowIndexZero();
        },
      },
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test('Should return the window in an array', () => {
      mockWindowFramesLength.mockReturnValue(0);
      const localWindow: Window = window;
      const windows: Window[] = getWindows(localWindow);
      expect(windows).toHaveLength(1);
      expect(windows[0]).toEqual(localWindow);
    });

    test('Should return the window with a parent', () => {
      mockWindowFramesLength.mockReturnValue(0);
      const spyWindowSelf = vi.spyOn(window, 'self', 'get').mockImplementationOnce(() => ({}) as Window & typeof globalThis);
      const spyWindowParent = vi.spyOn(window, 'parent', 'get').mockImplementationOnce(() => window);

      const windows = getWindows(window);
      expect(windows).toHaveLength(2);
      expect(spyWindowSelf).toBeCalledTimes(2);
      expect(spyWindowParent).toBeCalledTimes(2);
    });

    test('Should return the window with a child', () => {
      mockWindowFramesLength.mockReturnValueOnce(1).mockReturnValueOnce(1).mockReturnValue(0);
      mockWindowIndexZero.mockReturnValueOnce(window);
      const windows = getWindows(window);
      expect(windows).toHaveLength(2);
    });

    test('Should throw an error when cannot access top parent window', () => {
      mockWindowFramesLength.mockReturnValue(0);
      const spyConsole = vi.spyOn(console, 'error');
      const spyWindowSelf = vi.spyOn(window, 'self', 'get').mockImplementationOnce(() => ({}) as Window & typeof globalThis);
      const spyWindowParent = vi.spyOn(window, 'parent', 'get').mockImplementationOnce(() => {
        throw new Error('non');
      });
      const localWindow: Window = window;
      const windows: Window[] = getWindows(localWindow);
      expect(windows).toHaveLength(1);
      expect(windows[0]).toEqual(localWindow);
      expect(spyConsole).toBeCalledTimes(1);
      expect(spyWindowSelf).toBeCalledTimes(1);
      expect(spyWindowParent).toBeCalledTimes(1);
    });
  });

  describe('isValidString', () => {
    test.each(['', ' ', null, undefined, 1, {}, []])('Should return "false" for invalid values', value => {
      expect(isValidString(value)).toEqual(false);
    });

    test.each(['batman', 'batman '])('Should return "true" for valid value', value => {
      expect(isValidString(value)).toEqual(true);
    });
  });

  describe('isValidNumber', () => {
    test.each(['', ' ', null, undefined, '1', {}, []])('Should return "false" for invalid values', value => {
      expect(isValidNumber(value)).toEqual(false);
    });

    test.each([1, 1.0])('Should return "true" for valid value', value => {
      expect(isValidNumber(value)).toEqual(true);
    });
  });

  describe('toString', () => {
    test.each([undefined, null, 1, 'string', '', [undefined], [{ value: null }], {}, ['string'], { hello: 'batman' }])('Should return stringified value, original %s', value => {
      expect(toString(value)).toEqual(typeof value === 'object' ? JSON.stringify(value) : `${value}`);
    });
  });

  describe('cleanString', () => {
    test.each([
      { string: 'batman', expected: 'batman' },
      { string: 'BATMAN', expected: 'batman' },
      { string: 'Batman', expected: 'batman' },
      { string: ' batman ', expected: ' batman ' },
      { string: ' batman', expected: ' batman' },
      { string: 'batman ', expected: 'batman ' },
      { string: 'âäàçéèêñù', expected: 'aaaceeenu' },
    ])('Should format string properly', ({ string, expected }) => {
      expect(cleanString(string)).toEqual(expected);
    });

    test('Should return orignal value when param is NOT a string', () => {
      expect(cleanString(undefined as unknown as string)).toEqual(undefined);
    });
  });

  describe('nextTick', () => {
    test('Should get a promise', async () => {
      const job = nextTick();
      expect(job.then).toBeDefined();

      const res = await job;
      expect(res).toBeUndefined();
    });
    test('Should wrapp and execute a callback in a promise', async () => {
      const fn = vi.fn();
      const job = nextTick(fn);
      expect(job.then).toBeDefined();

      const res = await job;
      expect(fn).toHaveBeenCalled();
      expect(res).toBeUndefined();
    });
  });

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

  describe('Paginate', () => {
    test('Should create Paginate instance', () => {
      const res = new Paginate([]);
      expect(res.items.length).toEqual(0);
      expect(res).toHaveProperty('getPage');
    });

    describe('getPage()', () => {
      test.each([
        {
          items: {},
          options: undefined,
        },
        {
          items: [],
          options: undefined,
        },
        {
          items: ['batman', 'robin', 'joker', 'bane', 'harley quinn', 'dante'],
          options: undefined,
        },
        {
          items: initArray(34),
          options: undefined,
        },
        {
          items: initArray(34),
          options: { top: 5 },
        },
        {
          items: initArray(34),
          options: { total: 105 },
        },
        {
          items: initArray(34),
          options: { next: '/next/page' },
        },
        {
          items: initArray(34),
          options: { next: new URL('http://url.fr/next/page') },
        },
      ])('Shoud get paginated page from instance %s', ({ items, options }) => {
        const res = new Paginate(items as unknown[], options);
        const page = res.getPage();
        expect(page).toMatchSnapshot();
      });

      test('Should filter paginated page from instance', () => {
        const res = new Paginate(['batman', 'robin', 'joker', 'bane', 'harley quinn', 'dante']);
        const page = res.getPage(0, val => val.includes('an'));
        expect(page).toMatchSnapshot();
      });

      test('Should get next() page from instance', () => {
        const res = new Paginate(initArray(20));
        // get first page
        const page = res.getPage();
        expect(page).toMatchSnapshot();
        // get next page
        const next = (page.next as unknown as () => Page<unknown>)();
        expect(next).toMatchSnapshot();
      });
    });
  });

  describe('Page', () => {
    const items = ['batman', 'robin', 'joker', 'bane', 'harley quinn', 'dante'];
    test.each([
      {
        items,
      },
      {
        items: items.map((item, index) => ({ title: item, value: index })) as unknown[],
      },
      {
        items,
        total: 100,
      },
      {
        items,
        top: 10,
      },
      {
        items,
        next: '/next/url',
      },
    ])('Should create Page instance', init => {
      const page = new Page(init);
      expect(page).toMatchSnapshot();
    });

    test('Should thrown error with invalid Page init', () => {
      expect.assertions(1);
      try {
        new Page('batman' as unknown as Record<string, string>);
      } catch (err) {
        expect(err.message).toEqual('Page - init must match IPage type.');
      }
    });

    describe('getIndexFromCursor()', () => {
      test.each([undefined, 'hello'])('Should get first index by default, cursor %s', cursor => {
        const page = new Page({ items });
        page.items.forEach(() => {
          const index = page.getIndexFromCursor(cursor as CursorType);
          expect(index).toEqual(0);
        });
      });
      describe.each(Object.values(Cursor))('cursor %s', cursor => {
        let result = 0;
        if (cursor === 'first') result = 0;
        if (cursor === 'last') result = items.length - 1;
        if (cursor === 'next') result = 1;
        if (cursor === 'previous') result = items.length - 1;
        test.each([
          {
            items: 'batman',
            result: null,
          },
          {
            items: {},
            result: null,
          },
          {
            items: [],
            result: null,
          },
          {
            items,
            result,
          },
          {
            items: items.map((item, index) => ({ title: item, value: index })) as unknown[],
            result,
          },
        ])('Sould get index from curor %s', ({ items, result }) => {
          const page = new Page({ items: items as unknown[] });
          const index = page.getIndexFromCursor(cursor);
          expect(index).toEqual(result);
        });
      });
      test('Should go to next value witdh oldValue', () => {
        const page = new Page({ items });
        for (const oldIndex in page.items) {
          const index = page.getIndexFromCursor('next', items[Number(oldIndex)]);
          const nextIndex = Number(oldIndex) + page.baseIndex;
          expect(index).toEqual(nextIndex >= page.items.length ? 0 : nextIndex);
        }
      });
      test('Should go to previous value witdh oldValue', () => {
        const page = new Page({ items });
        for (const oldIndex in page.items) {
          const index = page.getIndexFromCursor('previous', items[Number(oldIndex)]);
          const nextIndex = Number(oldIndex) - page.baseIndex;
          expect(index).toEqual(Number(oldIndex) === 0 ? page.items.length - page.baseIndex : nextIndex);
        }
      });
      test.each(['previous', 'next'])('Should get first index with unavailable item, cursor %s', cursor => {
        const page = new Page({ items });
        page.items.forEach(() => {
          const index = page.getIndexFromCursor(cursor as CursorType, 'hello');
          expect(index).toEqual(0);
        });
      });
    });
  });
});
