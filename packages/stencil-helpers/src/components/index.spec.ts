import { describe, expect, test, afterEach, vi } from 'vitest';
import { createID, ClassList, allItemsAreString, isTagName, getWindows, isValidString, cleanString, nextTick, toString, isValideID, isValidNumber } from './';

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
    test('Should wrapp and execute a callback in a promise', async () => {
      const fn = vi.fn();
      const job = nextTick(fn);
      expect(job.then).toBeDefined();

      const res = await job;
      expect(fn).toHaveBeenCalled();
      expect(res).toBeUndefined();
    });
  });
});
