import { describe, expect, test, vi } from 'vitest';
import { setupMutationObserverMock, setupResizeObserverMock, setupSubmitEventMock } from './unit.ts';

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
});
