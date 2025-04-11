import { type Placement } from '@floating-ui/dom';

/**
 * List of all possibles sides
 */
export const sides = ['top', 'right', 'bottom', 'left'] as const;

/**
 * List of all possibles placements
 */
export const placements = [
  ...sides,
  'auto',
  'auto-start',
  'auto-end',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'right-start',
  'right-end',
  'left-start',
  'left-end',
] as const;

/**
 * Define placement type
 */
export type ExtendedPlacement = Placement | (typeof placements)[number];

// Alignments constants
export const alignments = ['start', null, 'end'] as const;

/**
 * FloatingUI Placement type guard
 * @param placement - value to check
 * @returns truthy if placement is valid
 */
export const isFloatingUIPlacement = (placement): placement is Placement => placements.filter(p => !p.includes('auto')).includes(placement);

/**
 * Round value by device pixel ratio
 * @param value - value to round
 * @returns rounded value
 */
const roundByDPR = (value: number) => {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
};

/**
 * Get translation for tooltip
 * @param x - x-axis value
 * @param y - y-axis value
 * @returns translation string
 */
export const getTransformation = (x: number, y: number): string => {
  const tooltipX = isNaN(x) ? 0 : roundByDPR(x);
  const tooltipY = isNaN(y) ? 0 : roundByDPR(y);

  // No translation needed
  if (tooltipX === 0 && tooltipY === 0) return '';

  // Only one axis needs translation
  if (tooltipX === 0) return `translateY(${tooltipY}px)`;
  if (tooltipY === 0) return `translateX(${tooltipX}px)`;

  // Both axes need translation
  return `translate(${tooltipX}px,${tooltipY}px)`;
};

// https://floating-ui.com/docs/arrow
// Unlike the floating element, which has both coordinates defined at all times, the arrow only has one defined.
// Due to this, either x or y will be undefined, depending on the side of placement.
// The above code uses `isNaN` to check for null and undefined simultaneously.
// Don't remove `isNaN`, because either value can be falsy (0), causing a bug!
export const numberToPx = (number: number): string => {
  if (number !== null && !isNaN(number)) {
    if (number === 0) return '0';
    else return `${number}px`;
  } else return '';
};
