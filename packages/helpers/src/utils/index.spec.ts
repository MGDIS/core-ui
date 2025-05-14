import { describe, expect, test } from 'vitest';
import {
  allItemsAreString,
  ClassList,
  cleanString,
  createID,
  Cursor,
  dateRegExp,
  dateToString,
  focusableElements,
  formatID,
  getObjectValueFromKey,
  getChildWindows,
  getParentWindows,
  getWindows,
  isObject,
  isTagName,
  isValideID,
  isValidNumber,
  isValidString,
  nextTick,
  Page,
  Paginate,
  toKebabCase,
  toString,
} from './';

describe('utils', () => {
  describe('attributes', () => {
    test('import', () => {
      expect(ClassList).toBeDefined();
      expect(createID).toBeDefined();
      expect(formatID).toBeDefined();
      expect(isValideID).toBeDefined();
      expect(toKebabCase).toBeDefined();
    });
  });
  describe('components', () => {
    test('import', () => {
      expect(nextTick).toBeDefined();
      expect(Cursor).toBeDefined();
      expect(Page).toBeDefined();
      expect(Paginate).toBeDefined();
    });
  });
  describe('date', () => {
    test('import', () => {
      expect(dateRegExp).toBeDefined();
      expect(dateToString).toBeDefined();
    });
  });
  describe('elements', () => {
    test('import', () => {
      expect(focusableElements).toBeDefined();
      expect(isTagName).toBeDefined();
    });
  });
  describe('number', () => {
    test('import', () => {
      expect(isValidNumber).toBeDefined();
    });
  });
  describe('object', () => {
    test('import', () => {
      expect(isObject).toBeDefined();
      expect(getObjectValueFromKey).toBeDefined();
    });
  });
  describe('string', () => {
    test('import', () => {
      expect(allItemsAreString).toBeDefined();
      expect(isValidString).toBeDefined();
      expect(toString).toBeDefined();
      expect(cleanString).toBeDefined();
    });
  });
  describe('windows', () => {
    test('import', () => {
      expect(getWindows).toBeDefined();
      expect(getParentWindows).toBeDefined();
      expect(getChildWindows).toBeDefined();
    });
  });
});
