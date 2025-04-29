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
  toString,
  cleanString,
  nextTick,
  setupMutationObserverMock,
  setupResizeObserverMock,
  setupSubmitEventMock,
  StorybookPreview,
  webTypesGenerator,
  vsCodeGenerator,
  isValideID,
  isValidNumber,
  isObject,
  getObjectValueFromKey,
  Paginate,
  Page,
  Cursor,
  formatID,
} from '.';

describe('stencil-helpers', () => {
  describe('components', () => {
    test('import', () => {
      expect(createID).toBeDefined();
      expect(ClassList).toBeDefined();
      expect(formatID).toBeDefined();
      expect(allItemsAreString).toBeDefined();
      expect(isTagName).toBeDefined();
      expect(focusableElements).toBeDefined();
      expect(getWindows).toBeDefined();
      expect(getParentWindows).toBeDefined();
      expect(isValidString).toBeDefined();
      expect(toString).toBeDefined();
      expect(cleanString).toBeDefined();
      expect(nextTick).toBeDefined();
      expect(toString).toBeDefined();
      expect(isValideID).toBeDefined();
      expect(isValidNumber).toBeDefined();
      expect(isObject).toBeDefined();
      expect(getObjectValueFromKey).toBeDefined();
      expect(Paginate).toBeDefined();
      expect(Page).toBeDefined();
      expect(Cursor).toBeDefined();
    });
  });

  describe('ide', () => {
    test('import', () => {
      expect(webTypesGenerator).toBeDefined();
      expect(vsCodeGenerator).toBeDefined();
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

  describe('storybook', () => {
    test('import', () => {
      expect(getStoryHTML).toBeDefined();
      expect(stencilWrapper).toBeDefined();
      expect(filterArgs).toBeDefined();
      expect(StorybookPreview).toBeDefined();
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
