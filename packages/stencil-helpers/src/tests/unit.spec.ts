import { beforeEach, describe, expect, test, vi } from 'vitest';
import { setupMutationObserverMock, setUpRequestAnimationFrameMock, setupResizeObserverMock, setupSubmitEventMock } from '.';

describe('test - e2e', () => {
  describe('setupMutationObserverMock', () => {
    test.each([{}, { disconnect: vi.fn(), observe: ({}) => {}, takeRecords: () => [] }])('Should render html', args => {
      const Mock = setupMutationObserverMock(args);
      expect(new Mock(args)).toMatchSnapshot();
    });
  });
  describe('setupResizeObserverMock', () => {
    test.each([{}, { disconnect: vi.fn(), observe: ({}) => {}, unobserve: () => [] }])('Should render html', args => {
      const Mock = setupResizeObserverMock(args);
      expect(new Mock(args)).toMatchSnapshot();
    });
  });
  describe('setupSubmitEventMock', () => {
    test('Should render html', () => {
      const Mock = setupSubmitEventMock();
      expect(new Mock({})).toMatchSnapshot();
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
