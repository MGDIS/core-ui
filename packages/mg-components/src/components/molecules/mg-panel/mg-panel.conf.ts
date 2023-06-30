/**
 * Available expand toggle display options
 */
export const expandToggleDisplays = ['text', 'icon'] as const;

/**
 * Generated expand toggle display type from available expand toggle display options
 */
export type ExpandToggleDisplayType = (typeof expandToggleDisplays)[number];

/**
 * Available title positions
 */
export const titlePositions = ['left', 'right'] as const;

/**
 * Generated title positions type from available title positions
 */
export type TitlePositionType = (typeof titlePositions)[number];
