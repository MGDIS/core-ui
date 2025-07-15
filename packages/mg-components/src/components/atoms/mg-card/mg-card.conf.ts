/**
 * List of all possibles radius
 */
export const radiusSizes = ['xsmall', 'small', 'medium'] as const;

/**
 * RadiusType type from card radius
 */
export type RadiusType = (typeof radiusSizes)[number];
