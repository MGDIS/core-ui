import { describe, expect, test } from 'vitest';
import { setUpHTMLInputElementValidity, setupMutationObserverMock, setUpRequestAnimationFrameMock, setupResizeObserverMock, setupSubmitEventMock } from './';

describe('tests', () => {
  describe('unit', () => {
    test('import', () => {
      expect(setupMutationObserverMock).toBeDefined();
      expect(setupResizeObserverMock).toBeDefined();
      expect(setupSubmitEventMock).toBeDefined();
      expect(setUpRequestAnimationFrameMock).toBeDefined();
      expect(setUpHTMLInputElementValidity).toBeDefined();
    });
  });
});
