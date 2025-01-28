import { Placement } from "../../../types";
import { placements } from '../../../utils/floating-ui.utils'
export * from '../../../utils/floating-ui.utils'

/**
 * Placement type from placements
 */
export type PopoverPlacementType = Placement & (typeof placements)[number];