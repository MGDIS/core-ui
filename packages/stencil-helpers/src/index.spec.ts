import { describe, expect, test } from 'vitest';
import { dateRegExp, defineLocales, filterArgs, getLocaleMessages, getStoryHTML, localeCurrency, localeDate, localeNumber, stencilWrapper } from '.';

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
      expect(getLocaleMessages).toBeDefined();
      expect(defineLocales).toBeDefined();
    });
  });
});
