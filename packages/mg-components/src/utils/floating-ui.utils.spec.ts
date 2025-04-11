import { Placement } from '@floating-ui/dom';
import { isFloatingUIPlacement, getTransformation, sides, numberToPx } from './floating-ui.utils';

describe('floating-ui.utils', () => {
  describe('isFloatingUIPlacement', () => {
    test.each(sides)('Should return true for valid placements: %s', (sides: Placement) => {
      expect(isFloatingUIPlacement(sides)).toBe(true);
    });

    test.each(['invalid', 'auto', 'auto-start', 'center'])('Should return false for invalid placements: %s', (placement: Placement) => {
      expect(isFloatingUIPlacement(placement)).toBe(false);
    });
  });

  describe('getTransformation', () => {
    test('Should return an empty string when no translation is needed', () => {
      expect(getTransformation(0, 0)).toBe('');
    });

    test('Should return translateX when only x-axis translation is needed', () => {
      expect(getTransformation(10, 0)).toBe('translateX(10px)');
    });

    test('Should return translateY when only y-axis translation is needed', () => {
      expect(getTransformation(0, 20)).toBe('translateY(20px)');
    });

    test('Should return translate for both axes when translation is needed', () => {
      expect(getTransformation(15, 25)).toBe('translate(15px,25px)');
    });

    test('Should manage case when window.devicePixelRatio is undefined', () => {
      window.devicePixelRatio = undefined;
      expect(getTransformation(10.5, 20.5)).toBe('translate(11px,21px)');
    });

    test.each([NaN, undefined, null, 'blu'])('Should handle NaN values gracefully', (NaNvalue: number) => {
      expect(getTransformation(NaNvalue, 10)).toBe('translateY(10px)');
      expect(getTransformation(10, NaNvalue)).toBe('translateX(10px)');
      expect(getTransformation(NaNvalue, NaNvalue)).toBe('');
    });
  });

  describe('numberToPx', () => {
    test('Should return a string with "px" for valid numbers', () => {
      expect(numberToPx(10)).toBe('10px');
      expect(numberToPx(-10)).toBe('-10px');
    });

    test('Should return 0 without "px"', () => {
      expect(numberToPx(0)).toBe('0');
    });

    test.each([NaN, undefined, null, 'blu'])('Should return an empty string for NaN value: %s', (value: number) => {
      expect(numberToPx(value)).toBe('');
    });
  });
});
