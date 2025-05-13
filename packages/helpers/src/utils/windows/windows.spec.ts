import { describe, expect, test, afterEach, vi } from 'vitest';
import { getWindows } from './windows';

describe('windows', () => {
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
});
