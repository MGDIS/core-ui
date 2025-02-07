import { type Placement } from "@floating-ui/dom";

/**
 * List of all possibles sides
 */
export const sides = [
    'top',
    'right',
    'bottom',
    'left',
  ] as const;
  
/**
 * List of all possibles placements
 */
export const placements  = [
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

/**
 * FloatingUI Placement type guard
 * @param placement - value to check
 * @returns truthy if placement is valid
 */
export const isFloatingUIPlacement = (placement): placement is Placement => placements.filter(p => !p.includes('auto')).includes(placement);
