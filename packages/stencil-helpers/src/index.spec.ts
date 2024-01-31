import { describe, expect, test } from 'vitest';
import {
  dateRegExp,
  defineLocales,
  filterArgs,
  getStoryHTML,
  localeCurrency,
  localeDate,
  localeNumber,
  dateToString,
  getLocaleDatePattern,
  stencilWrapper,
  createID,
  ClassList,
  allItemsAreString,
  isTagName,
  focusableElements,
  getWindows,
  getParentWindows,
  isValidString,
  cleanString,
  nextTick,
  setupMutationObserverMock,
  setupResizeObserverMock,
  setupSubmitEventMock,
} from '.';

describe('stencil-helpers', () => {
  describe('storybook', () => {
    test('import', () => {
      expect(getStoryHTML).toBeDefined();
      expect(stencilWrapper).toBeDefined();
      expect(filterArgs).toBeDefined();
    });
  });
  describe('locale', () => {
    test('import', () => {
      expect(localeCurrency).toBeDefined();
      expect(localeNumber).toBeDefined();
      expect(dateRegExp).toBeDefined();
      expect(localeDate).toBeDefined();
      expect(defineLocales).toBeDefined();
      expect(dateToString).toBeDefined();
      expect(getLocaleDatePattern).toBeDefined();
    });
  });
  describe('components', () => {
    test('import', () => {
      expect(createID).toBeDefined();
      expect(ClassList).toBeDefined();
      expect(allItemsAreString).toBeDefined();
      expect(isTagName).toBeDefined();
      expect(focusableElements).toBeDefined();
      expect(getWindows).toBeDefined();
      expect(getParentWindows).toBeDefined();
      expect(isValidString).toBeDefined();
      expect(cleanString).toBeDefined();
      expect(nextTick).toBeDefined();
    });
  });
  describe('test', () => {
    test('import', () => {
      expect(setupMutationObserverMock).toBeDefined();
      expect(setupResizeObserverMock).toBeDefined();
      expect(setupSubmitEventMock).toBeDefined();
    });
  });
});
