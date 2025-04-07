import type { Size } from '../../../types';
/**
 * Sizes
 */
// Define possible sizes
export const sizes = ['small', 'medium', 'large', 'xlarge'] as const;
// Define Table size type and ensure it is a valid size
export type TableSizeType = Size & (typeof sizes)[number];
/**
 * Columns
 */
// Define possible text alignments
export const textAlignments = ['left', 'center', 'right'] as const;
// Define possible data types
export const dataTypes = ['string', 'numeric', 'date'] as const;
// Define possible data types
export type datatypesType = (typeof dataTypes)[number];
// Define columns type
export type ColumnsType = {
  [key: number]: { align?: (typeof textAlignments)[number]; sortable?: boolean; datatype?: datatypesType };
};
