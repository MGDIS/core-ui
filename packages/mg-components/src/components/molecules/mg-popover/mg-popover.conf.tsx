import { type ExtendedPlacement, placements } from '../../../utils/floating-ui.utils';
export * from '../../../utils/floating-ui.utils';

/**
 * Placement type from placements
 */
export type PopoverPlacementType = ExtendedPlacement & (typeof placements)[number];
