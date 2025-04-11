import { Placement } from '@floating-ui/dom';
import { isFloatingUIPlacement, getTranslation, sides } from './floating-ui.utils';

describe('floating-ui.utils', () => {
  describe('isFloatingUIPlacement', () => {
    test.each(sides)('Should return true for valid placements: %s', (sides: Placement) => {
      expect(isFloatingUIPlacement(sides)).toBe(true);
    });

    test.each(['invalid', 'auto', 'auto-start', 'center'])('Should return false for invalid placements: %s', (placement: Placement) => {
      expect(isFloatingUIPlacement(placement)).toBe(false);
    });
  });

  describe('getTranslation', () => {
    test('Should return an empty string when no translation is needed', () => {
      expect(getTranslation(0, 0)).toBe('');
    });

    test('Should return translateX when only x-axis translation is needed', () => {
      expect(getTranslation(10, 0)).toBe('translateX(10px)');
    });

    test('Should return translateY when only y-axis translation is needed', () => {
      expect(getTranslation(0, 20)).toBe('translateY(20px)');
    });

    test('Should return translate for both axes when translation is needed', () => {
      expect(getTranslation(15, 25)).toBe('translate(15px,25px)');
    });

    test('Should manage case when window.devicePixelRatio is undefined', () => {
      window.devicePixelRatio = undefined;
      expect(getTranslation(10.5, 20.5)).toBe('translate(11px,21px)');
    });

    test('Should handle NaN values gracefully', () => {
      expect(getTranslation(NaN, 10)).toBe('translateY(10px)');
      expect(getTranslation(10, NaN)).toBe('translateX(10px)');
      expect(getTranslation(NaN, NaN)).toBe('');
    });
  });
});
