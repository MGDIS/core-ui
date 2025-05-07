import { beforeEach, describe, expect, test, vi } from 'vitest';
import { setupMutationObserverMock, setUpRequestAnimationFrameMock, setupResizeObserverMock, setupSubmitEventMock } from './unit.ts';
import type { SetupMutationObserverMockParams, setupResizeObserverMockParams } from './unit.conf.ts';

describe('unit', () => {
  describe('setupMutationObserverMock', () => {
    test.each([{}, { disconnect: vi.fn(), observe: ({}) => {}, takeRecords: () => [] }])('Should render html', args => {
      const Mock = setupMutationObserverMock(args as SetupMutationObserverMockParams);
      expect(new Mock(args as MutationCallback)).toMatchSnapshot();
    });
  });
  describe('setupResizeObserverMock', () => {
    test.each([{}, { disconnect: vi.fn(), observe: ({}) => {}, unobserve: () => [] }])('Should render html', args => {
      const Mock = setupResizeObserverMock(args as setupResizeObserverMockParams);
      expect(new Mock(args as ResizeObserverCallback)).toMatchSnapshot();
    });
  });
  describe('setupSubmitEventMock', () => {
    test('Should render html', () => {
      const Mock = setupSubmitEventMock();
      expect(new Mock('test')).toMatchSnapshot();
    });
  });
  describe('setUpRequestAnimationFrameMock', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    test.each([window, global])('Should render html', element => {
      const timer = vi.fn();
      const callback = vi.fn();

      setUpRequestAnimationFrameMock(timer);

      expect(element.requestAnimationFrame).toBeDefined();

      element.requestAnimationFrame(callback);
      vi.runOnlyPendingTimers();

      expect(timer).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });
  });
});
